


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

// --- Operators ---

export const play: Operator = {
    definition: {
        description: "Plays an audio graph for a specific duration (in beats), then stops it automatically with a short fade-out to prevent clicks. If the graph contains a `seq` node without an explicit clock (from `impulse`), `play` will automatically generate a clock to fit the entire sequence within the given duration. This is for one-shot sounds. It resolves patches and quotations to create a final sound. Does not consume a name from the stack.",
        effect: "[... audio_quotation duration_beats] -> [...]",
        exec: function*(s, options, evaluate, dictionary) {
            if (s.length < 2) {
                throw new Error('play operator requires an audio quotation and a duration (in beats).');
            }
            const durationBeats = s.pop();
            let valueToResolve = s.pop();

            if (typeof durationBeats !== 'number' || durationBeats < 0) {
                s.push(valueToResolve, durationBeats); // push back
                throw new Error('play operator expects a non-negative number for duration in beats.');
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
                     throw new Error(`Function word did not produce a single audio quotation for play.`);
                }
            } else {
                finalQuotationOrGraph = valueToResolve;
            }
            // --- End Resolution ---
            
            if (!Array.isArray(finalQuotationOrGraph)) {
                 s.push(finalQuotationOrGraph, durationBeats); // push back
                 throw new Error(`play failed to resolve to a playable audio quotation. Result: ${yieldFormatter(finalQuotationOrGraph)}`);
            }
            
            const tempoDef = dictionary[':tempo'];
            const bpm = (tempoDef && 'body' in tempoDef && typeof tempoDef.body === 'number' ? tempoDef.body : 120) as number;
            
            let graphToPlay;
            if (isAudioGraph(finalQuotationOrGraph)) {
                graphToPlay = deepClone(finalQuotationOrGraph);
            } else {
                graphToPlay = transpileAudioQuotation(finalQuotationOrGraph);
            }
            
            const secondsPerBeat = 60.0 / bpm;
            const durationSeconds = durationBeats * secondsPerBeat;

            // If it's a synth with a default gate, replace it with a timed gate.
            // The transpiled graph for fm_synth is ['fm_synth', gate, note, velocity, opDefs, algoId]
            if (
                Array.isArray(graphToPlay) &&
                graphToPlay[0] === 'fm_synth' &&
                Array.isArray(graphToPlay[1]) &&
                graphToPlay[1][0] === 'oneshot'
            ) {
                graphToPlay[1] = ['gate', durationSeconds];
            }
            
            autoClockSequencersInGraph(graphToPlay, durationBeats, bpm);

            audioEngine.play(graphToPlay, undefined, durationSeconds);
        },
    },
    examples: [
        {
            code: "bd 0.5 play",
            expected: []
        },
        {
            code: "440 sine 0.5 mul 0.25 play",
            expected: [],
        },
        {
            replCode: "60 0.8 :piano synth 0.5 play",
            async: {
                duration: 400, // wait for sound to finish
                assert: s => s.length === 0,
                assertDescription: "The sustained synth note should play and the stack should be empty."
            }
        },
    ]
};