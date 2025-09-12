


import type { Operator, StackValue } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';
import { deepClone } from '../../utils';

// --- Helper Functions ---
const isAudioGraph = (v: any): boolean => Array.isArray(v) && typeof v[0] === 'string';
const isQuotation = (v: any): boolean => Array.isArray(v) && !isAudioGraph(v);
const isListOfNotes = (v: any): boolean => Array.isArray(v) && v.every(item => typeof item === 'number' || (Array.isArray(item) && item[0] === 'note'));

export const play: Operator = {
    definition: {
        description: "Plays an audio graph. It can resolve and apply patch quotations to audio graphs or lists of notes to create complex sounds like chords or sequences before playing. If a patch name (symbol) is used, the sound can be controlled later.",
        effect: "[... graph|notes patch?] -> [graph]",
        exec: function*(s, options, evaluate) {
            
            // --- Resolution Loop ---
            // This loop repeatedly processes the stack, applying patches and evaluating
            // quotations until a final, playable audio graph is on top of the stack.
            while (true) {
                if (s.length === 0) break;
                
                let wasStackModified = false;
                const top = s[s.length - 1];
                const arg = s.length > 1 ? s[s.length - 2] : undefined;

                // 1. Resolve Symbols & Quotations: If the top of the stack is a symbol or a
                //    quotation that isn't a list of notes, evaluate it in case it produces
                //    a patch or a graph.
                if (typeof top === 'symbol' || (isQuotation(top) && !isListOfNotes(top))) {
                    yield* evaluate(['i'], s, options);
                    wasStackModified = true;
                }
                // 2. Apply Patches: If the top is now a quotation (a patch) and there's an
                //    argument for it below, apply the patch.
                else if (isQuotation(top) && arg !== undefined) {
                    const patch = s.pop() as StackValue[];
                    const noteSource = s.pop();
                    
                    // a. Patch a list of notes (chords/sequences)
                    if (isListOfNotes(noteSource)) {
                        const results = [];
                        for(const note of noteSource) {
                            const tempStack = [1, note]; // Provide default gate + note
                            yield* evaluate(patch, tempStack, options);
                            results.push(...tempStack);
                        }
                        if (results.length > 0) {
                            const mixedGraph = results.slice(1).reduce((acc, current) => ['mix', acc, current], results[0]);
                            s.push(mixedGraph);
                        } else {
                            s.push([]); // Push empty graph if nothing resulted
                        }
                    } 
                    // b. Patch a single item (note, frequency, or graph)
                    else {
                        // A gate is only provided for musical notes, not for raw frequencies or graphs.
                        const isNoteGraph = Array.isArray(noteSource) && noteSource[0] === 'note';
                        const tempStack = isNoteGraph ? [1, noteSource] : [noteSource];
                        yield* evaluate(patch, tempStack, options);
                        s.push(...tempStack);
                    }
                    wasStackModified = true;
                }
                
                // If the stack was not modified in this iteration, we're done resolving.
                if (!wasStackModified) {
                    break;
                }
            }

            // --- Playback Phase ---
            if (s.length > 0 && isAudioGraph(s[s.length - 1])) {
                const graphToPlay = s[s.length - 1] as StackValue[];

                // Find a symbol name on the stack to use as the sound source identifier.
                // This allows `stop` and `ctrl` to find the voice later.
                const patchNameSymbol = s.find(item => typeof item === 'symbol');
                const sourceId = patchNameSymbol ? Symbol.keyFor(patchNameSymbol) : options.sourceId;
                
                const voiceId = audioEngine.play(deepClone(graphToPlay), sourceId);
                
                if (voiceId && options.onVoiceCreated) {
                    options.onVoiceCreated(voiceId);
                }
            }
        },
    },
    examples: [
        {
            code: "440 sine play",
            assert: (s) => s.length === 1 && isAudioGraph(s[0]) && s[0][0] === 'sine',
            expectedDescription: 'A sine wave audio graph'
        },
        {
            code: `
((220 400 :sine :sine fm)) :bell =
60 note :bell play
`,
            assert: (s) => s.length === 1 && isAudioGraph(s[0]) && s[0][0] === 'fm_simple',
            expectedDescription: "An FM audio graph produced by a patch."
        },
        {
            code: `440 (220 400 :sine :sine fm) play`,
            assert: (s) => {
                const isAudioGraph = (v) => Array.isArray(v) && typeof v[0] === 'string';
                if (s.length !== 1 || !isAudioGraph(s[0])) {
                    return false;
                }
                const graph = s[0];
                // Check for ["fm_simple", 440, 220, 400, "sine", "sine"]
                return graph.length === 6 &&
                       graph[0] === 'fm_simple' &&
                       graph[1] === 440 &&
                       graph[2] === 220 &&
                       graph[3] === 400 &&
                       graph[4] === 'sine' &&
                       graph[5] === 'sine';
            },
            expectedDescription: "An fm_simple audio graph for a single note."
        }
    ]
};