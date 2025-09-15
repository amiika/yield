
import { prelude } from './prelude';
import { deepClone } from '../utils';

// FIX: Define missing PatchTemplate interface and analyzeAndBuildTemplate function.
interface PatchTemplate {
    graph: any[];
    params: { [key: string]: any };
}

const analyzeAndBuildTemplate = (graphNode: any, template: PatchTemplate, counters: { [key: string]: number }) => {
    if (!Array.isArray(graphNode)) return;

    for (let i = 0; i < graphNode.length; i++) {
        const item = graphNode[i];
        if (typeof item === 'symbol') {
            const paramName = Symbol.keyFor(item);
            if (paramName) {
                // If a parameter with this name hasn't been seen, add it to the template's params.
                if (!template.params.hasOwnProperty(paramName)) {
                    template.params[paramName] = 0; // default value is not super important
                }
                // Replace the symbol with a parameter object for the worklet.
                graphNode[i] = { param: paramName };
            }
        } else if (Array.isArray(item)) {
            analyzeAndBuildTemplate(item, template, counters);
        }
    }
};


class AudioEngine {
    private static instance: AudioEngine;
    private context: AudioContext | null = null;
    private workletNode: AudioWorkletNode | null = null;
    private clockNode: AudioWorkletNode | null = null;
    private isInitialized = false;
    private initPromise: Promise<void> | null = null;
    private readyPromise: Promise<void>;
    private resolveReady!: () => void;
    private voiceIdCounter = 0;
    private isMuted = false;
    private readyListeners: (() => void)[] = [];
    private startTime = 0;
    
    private scheduledCallbacks = new Map<string, { time: number, callback: (tickTime: number) => Promise<void> }>();
    
    // Tracks active sounds, mapping a source identifier (patch name or cell ID) to an internal voice ID
    private sourceVoices = new Map<string, string>();

    private constructor() {
        this.readyPromise = new Promise(resolve => {
            this.resolveReady = resolve;
        });
    }

    public static getInstance(): AudioEngine {
        if (!AudioEngine.instance) {
            AudioEngine.instance = new AudioEngine();
        }
        return AudioEngine.instance;
    }

    public onReady(callback: () => void) {
        if (this.isInitialized) {
            callback();
        } else {
            this.readyListeners.push(callback);
        }
    }

    public offReady(callback: () => void) {
        this.readyListeners = this.readyListeners.filter(cb => cb !== callback);
    }

    public isReady(): boolean {
        return this.isInitialized;
    }

    public setMuted(muted: boolean) {
        this.isMuted = muted;
        if (muted) {
            this.stopAll();
        }
    }

    public init(): Promise<void> {
        if (this.isInitialized) {
            return Promise.resolve();
        }
        if (this.initPromise) {
            return this.readyPromise;
        }
    
        this.initPromise = (async () => {
            if (typeof window === 'undefined') {
                this.isInitialized = true;
                this.resolveReady();
                return; 
            }
    
            try {
                if (!this.context) {
                    this.context = new AudioContext();
                }
                
                if (this.context.state === 'suspended') {
                    await this.context.resume();
                }
    
                const blob = new Blob([prelude], { type: 'application/javascript' });
                const url = URL.createObjectURL(blob);
                try {
                    await this.context.audioWorklet.addModule(url);
                } catch(e) {
                    // This error is not fatal if it's because the processor is already there
                    // (e.g., from a previous run in a hot-reloading dev environment).
                    if (!e.message.includes('is already registered')) {
                        throw e; // Re-throw other errors
                    }
                } finally {
                    URL.revokeObjectURL(url);
                }
    
                if (!this.workletNode) {
                    this.workletNode = new AudioWorkletNode(this.context, 'dsp-processor', {
                        outputChannelCount: [2]
                    });
                    this.workletNode.connect(this.context.destination);
                }
                
                if (!this.clockNode) {
                    this.clockNode = new AudioWorkletNode(this.context, 'clock');
                    this.clockNode.port.onmessage = (e) => this.handleTick(e.data);
                    this.clockNode.port.postMessage('start');
                }
    
            } catch (e) {
                console.error("Error initializing AudioEngine:", e);
                this.initPromise = null; // Clear promise on failure to allow retry
                throw e;
            }
        })();
    
        return this.readyPromise;
    }

    private handleTick(tickTime: number) {
        if (!this.isInitialized) {
            this.startTime = tickTime;
            this.isInitialized = true;
            this.resolveReady();
            // Defer listener execution to ensure the event loop is clear
            setTimeout(() => {
                this.readyListeners.forEach(cb => cb());
                this.readyListeners = [];
            }, 0);
        }

        if (this.scheduledCallbacks.size === 0) return;

        // Iterate over a copy of the keys, as the map might be modified during iteration by callbacks
        const ids = [...this.scheduledCallbacks.keys()];
        for (const id of ids) {
            const event = this.scheduledCallbacks.get(id);
            if (event && event.time <= tickTime) {
                this.scheduledCallbacks.delete(id);
                // The callback is async. By calling it directly without await and without
                // setTimeout, we schedule it as a microtask. This ensures it runs before any
                // macrotask (like a test's setTimeout), fixing race conditions in tests.
                event.callback(tickTime).catch(err => {
                    console.error(`Error in scheduled callback '${id}':`, err);
                });
            }
        }
    }
    
    public getContextTime(): number {
        return this.context?.currentTime ?? 0;
    }

    public getStartTime(): number {
        return this.startTime;
    }

    public getElapsedTime(): number {
        return this.isInitialized ? (this.getContextTime() - this.startTime) : 0;
    }
    
    public schedule(id: string, time: number, callback: (tickTime: number) => Promise<void>) {
        if (!this.isInitialized) {
            this.init().catch(e => console.error("Could not auto-initialize AudioEngine for scheduling.", e));
        }
        this.scheduledCallbacks.set(id, { time, callback });
    }

    public cancel(id: string) {
        this.scheduledCallbacks.delete(id);
    }
    
    public play(graph: any[], sourceId?: string, duration?: number): string {
        if (this.isMuted) return '';
        if (!this.isInitialized || !this.workletNode) return '';
    
        const graphToPlay = deepClone(graph);
        const template: PatchTemplate = { graph: graphToPlay, params: {} };
        const paramCounters = {};
        analyzeAndBuildTemplate(template.graph, template, paramCounters);
        const params = template.params;
    
        if (sourceId && this.sourceVoices.has(sourceId)) {
            const id = this.sourceVoices.get(sourceId)!;
            this.workletNode.port.postMessage({ command: 'update', id, graph: graphToPlay, params });
            return id;
        }
    
        const id = `voice_${this.voiceIdCounter++}`;
    
        if (sourceId) {
            this.sourceVoices.set(sourceId, id);
        }
        
        const message: any = { command: 'play', id, graph: graphToPlay, params };
        if (duration !== undefined) {
            message.duration = duration;
        }
    
        this.workletNode.port.postMessage(message);
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

    public setMouse(x: number, y: number): void {
        if (!this.isInitialized || !this.workletNode) return;
        this.workletNode.port.postMessage({ command: 'mouse', x, y });
    }

    public setMouseDown(x: number, y: number, down: boolean): void {
        if (!this.isInitialized || !this.workletNode) return;
        this.workletNode.port.postMessage({ command: 'mousedown', x, y, down });
    }

    public setTempo(bpm: number): void {
        if (!this.isInitialized || !this.workletNode) return;
        this.workletNode.port.postMessage({ command: 'setTempo', bpm });
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
        this.scheduledCallbacks.clear();
        if (this.workletNode) {
            this.workletNode.port.postMessage({ command: 'stopAll' });
            const allIds = Array.from(this.sourceVoices.values());
            this.sourceVoices.clear();
            return allIds;
        }
        return [];
    }

    public fadeOutAll(): string[] {
        if (this.workletNode) {
            this.workletNode.port.postMessage({ command: 'fadeOutAll' });
            const allIds = Array.from(this.sourceVoices.values());
            this.sourceVoices.clear();
            return allIds;
        }
        return [];
    }
}

export const audioEngine = AudioEngine.getInstance();