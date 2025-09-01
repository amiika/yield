import { prelude } from './prelude';
import { deepClone } from '../utils';

// Maps operator names to the names of their parameters by index.
const paramNameMaps: { [key: string]: string[] } = {
    sine: ['freq'],
    saw: ['freq'],
    pulse: ['freq', 'duty'],
    lpf: ['cutoff', 'resonance'],
    hpf: ['cutoff', 'resonance'],
    ad: ['gate', 'attack', 'decay'],
    adsr: ['gate', 'attack', 'decay', 'sustain', 'release'],
    delay: ['time', 'feedback'],
    distort: ['amount'],
    pan: ['pos'],
    mul: ['gain'],
    note: ['note'],
    seq: ['clock'],
    impulse: ['freq'],
};

interface PatchTemplate {
    graph: any[];
    params: { [key: string]: number };
}

function analyzeAndBuildTemplate(graph: any, template: PatchTemplate, paramCounters: { [key: string]: number }) {
    if (!Array.isArray(graph)) return;

    const op = graph[0] as string;
    const args = graph.slice(1);
    const opHasNoParams = ['seq'].includes(op);
    const paramNames = paramNameMaps[op] || [];

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (typeof arg === 'number' && !opHasNoParams && paramNames[i]) {
            const baseParamName = paramNames[i];
            const count = paramCounters[baseParamName] = (paramCounters[baseParamName] || 0) + 1;
            
            // First instance of a param gets a clean name (e.g., "cutoff").
            // Subsequent instances get indexed (e.g., "cutoff_1", "cutoff_2").
            const paramName = count === 1 ? baseParamName : `${baseParamName}_${count - 1}`;

            template.params[paramName] = arg;
            graph[i + 1] = { param: paramName }; // Mutate graph to use param reference
        } else if (Array.isArray(arg)) {
            analyzeAndBuildTemplate(arg, template, paramCounters);
        }
    }
}


class AudioEngine {
    private static instance: AudioEngine;
    private context: AudioContext | null = null;
    private workletNode: AudioWorkletNode | null = null;
    private isInitialized = false;
    private voiceIdCounter = 0;
    private isMuted = false;
    
    // Manages named patch definitions
    private patchTemplates = new Map<string, PatchTemplate>();
    // Tracks active sounds, mapping a source identifier (patch name or cell ID) to an internal voice ID
    private sourceVoices = new Map<string, string>();


    public tempo = 80;

    private constructor() {}

    public static getInstance(): AudioEngine {
        if (!AudioEngine.instance) {
            AudioEngine.instance = new AudioEngine();
        }
        return AudioEngine.instance;
    }

    public setMuted(muted: boolean) {
        this.isMuted = muted;
        if (muted) {
            this.stopAll();
        }
    }

    public async init() {
        if (this.isInitialized) return;
        if (typeof window === 'undefined') return;

        try {
            this.context = new AudioContext();
            if (this.context.state === 'suspended') {
                await this.context.resume();
            }

            const blob = new Blob([prelude], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            await this.context.audioWorklet.addModule(url);

            this.workletNode = new AudioWorkletNode(this.context, 'dsp-processor', {
                outputChannelCount: [2]
            });
            this.workletNode.connect(this.context.destination);
            this.isInitialized = true;
        } catch (e) {
            console.error("Error initializing AudioEngine:", e);
            this.isInitialized = false;
        }
    }

    public definePatch(name: string, graphQuotation: any[]) {
        if (this.isMuted) return;
        if (!this.isInitialized) return;

        const graph = deepClone(graphQuotation);
        const template: PatchTemplate = { graph, params: {} };
        const paramCounters = {};
        analyzeAndBuildTemplate(template.graph, template, paramCounters);
        this.patchTemplates.set(name, template);
    }
    
    public play(target: string | any[], sourceId?: string): string {
        if (this.isMuted) return '';
        if (!this.isInitialized || !this.workletNode) return '';
    
        let graphToPlay: any[];
        let params: { [key: string]: number };
        let isNamedPlay = false;
        let patchName: string | null = null;
    
        if (typeof target === 'string') { // Play by name
            const template = this.patchTemplates.get(target);
            if (!template) {
                console.warn(`Patch "${target}" not found.`);
                return '';
            }
            patchName = target;
            isNamedPlay = true;
            graphToPlay = deepClone(template.graph);
            params = { ...template.params };
        } else { // Anonymous play
            graphToPlay = deepClone(target);
            const template: PatchTemplate = { graph: graphToPlay, params: {} };
            const paramCounters = {};
            analyzeAndBuildTemplate(template.graph, template, paramCounters);
            params = template.params;
        }
    
        const effectiveSourceId = isNamedPlay ? patchName : sourceId;
    
        // If a voice for this source already exists, update it instead of creating a new one.
        if (effectiveSourceId && this.sourceVoices.has(effectiveSourceId)) {
            const id = this.sourceVoices.get(effectiveSourceId)!;
            this.workletNode.port.postMessage({ command: 'update', id, graph: graphToPlay, params });
            return id;
        }
    
        // Otherwise, create a new voice.
        const id = `voice_${this.voiceIdCounter++}`;
    
        if (effectiveSourceId) {
            this.sourceVoices.set(effectiveSourceId, id);
        }
    
        this.workletNode.port.postMessage({ command: 'play', id, graph: graphToPlay, params });
        return id;
    }
    
    public ctrl(patchName: string, param: string, value: number): void {
        if (this.isMuted) return;
        if (!this.isInitialized || !this.workletNode) return;
        const id = this.sourceVoices.get(patchName);
        if (id) {
            this.workletNode.port.postMessage({ command: 'ctrl', id, param, value });
        } else {
            console.warn(`No active voice found for patch named "${patchName}".`);
        }
    }

    public stop(patchName: string): string[] {
        if (this.isMuted) return [];
        if (!this.isInitialized || !this.workletNode) return [];
        const id = this.sourceVoices.get(patchName);
        if (id) {
            this.workletNode.port.postMessage({ command: 'stop', id });
            this.sourceVoices.delete(patchName);
            return [id];
        }
        return [];
    }

    public stopAll(): string[] {
        if (this.workletNode) {
            this.workletNode.port.postMessage({ command: 'stopAll' });
            const allIds = Array.from(this.sourceVoices.values());
            this.sourceVoices.clear();
            return allIds;
        }
        return [];
    }

    public setTempo(newTempo: number) {
        if (typeof newTempo === 'number' && newTempo > 0) {
            this.tempo = newTempo;
        }
    }
}

export const audioEngine = AudioEngine.getInstance();