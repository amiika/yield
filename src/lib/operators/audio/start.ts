


import type { Operator, StackValue } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';
import { autoClockSequencersInGraph, transpileAudioQuotation, opArity, specialOps } from '../../audio/transpiler';
import { yieldFormatter, deepClone } from '../../utils';

const isAudioGraph = (v: any): boolean => {
    if (!Array.isArray(v) || typeof v[0] !== 'string') {
        return false;
    }
    const op = v[0];
    return opArity.hasOwnProperty(op) || specialOps.has(op);
};

export const start: Operator = {
    definition: {
        description: "Starts a continuous audio graph. The sound will play indefinitely until stopped with 'stop' or 'hush'. If a symbol precedes the graph on the stack, it's used as a name for the sound, allowing it to be controlled later. All arguments (graph, name) are consumed from the stack.",
        effect: "[... name_symbol? audio_quotation] -> [...]",
        exec: function*(s, options, evaluate, dictionary) {
            if (s.length < 1) {
                throw new Error('start operator requires an audio quotation.');
            }

            let valueToResolve = s.pop();
            let patchNameSymbol: symbol | undefined = undefined;

            if (s.length > 0 && typeof s[s.length - 1] === 'symbol') {
                patchNameSymbol = s.pop() as symbol;
            }
            
            let finalQuotationOrGraph;

            // --- Robust Resolution Logic ---
            let keyToLookup: string | undefined;
            if (typeof valueToResolve === 'symbol') {
                const key = Symbol.keyFor(valueToResolve);
                if (key) keyToLookup = `:${key}`;
            } else if (typeof valueToResolve === 'string') {
                keyToLookup = valueToResolve;
            }

            if (keyToLookup) {
                const def = dictionary[keyToLookup];
                if (def && 'body' in def) {
                    // If we're resolving a named patch like `:mypatch`, and there was no
                    // explicit name for the voice like `:myvoice`, then use the patch
                    // name as the voice name.
                    if (!patchNameSymbol && typeof valueToResolve === 'symbol') {
                        patchNameSymbol = valueToResolve as symbol;
                    }
                    valueToResolve = def.body;
                }
            }

            if (Array.isArray(valueToResolve) && valueToResolve.length > 0 && valueToResolve[valueToResolve.length - 1] === 'iterate') {
                // It's a function word. Execute it to get the audio quotation.
                const tempStack = [];
                yield* evaluate(valueToResolve, tempStack, options);
                if (tempStack.length === 1 && Array.isArray(tempStack[0])) {
                    finalQuotationOrGraph = tempStack[0];
                } else {
                     throw new Error(`Function word did not produce a single audio quotation for start.`);
                }
            } else {
                finalQuotationOrGraph = valueToResolve;
            }
             // --- End Resolution ---

            if (!Array.isArray(finalQuotationOrGraph)) {
                if(patchNameSymbol !== undefined) s.push(patchNameSymbol);
                s.push(finalQuotationOrGraph);
                throw new Error(`start failed to resolve to a playable audio quotation. Result: ${yieldFormatter(finalQuotationOrGraph)}`);
            }
            
            let graphToPlay;
            if (isAudioGraph(finalQuotationOrGraph)) {
                graphToPlay = deepClone(finalQuotationOrGraph);
            } else {
                graphToPlay = transpileAudioQuotation(finalQuotationOrGraph);
            }

            // If it's a synth with a default gate, replace it with a continuous 'on' signal.
            if (
                Array.isArray(graphToPlay) &&
                graphToPlay[0] === 'fm_synth' &&
                Array.isArray(graphToPlay[1]) &&
                graphToPlay[1][0] === 'oneshot'
            ) {
                graphToPlay[1] = 1.0;
            }
            
            const sourceId = patchNameSymbol ? Symbol.keyFor(patchNameSymbol) : options.sourceId;
            const voiceId = audioEngine.play(graphToPlay, sourceId);
            
            if (voiceId && options.onVoiceCreated) {
                options.onVoiceCreated(voiceId);
            }
        },
    },
    examples: [
        {
            code: "440 sine 0.5 mul start",
            expected: []
        },
        {
            code: `
440 sine 0.5 mul :synth =
:mysynth :synth start`,
            expected: []
        },
        {
            replCode: `
:my-piano 60 0.8 :piano synth start
# Wait a bit, then stop it
( :my-piano stop ) 0.5 wait
`,
            async: {
                duration: 600,
                assert: (s, dict) => {
                    return s.length === 0;
                },
                assertDescription: "The sustained synth note should start and then be stopped."
            }
        },
    ]
};