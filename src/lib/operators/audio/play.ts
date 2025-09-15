
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
        effect: "[... audio_quotation duration_beats] -> []",
        exec: function*(s, options, evaluate, dictionary) {
            if (s.length < 1) return;
            const durationBeats = s.pop();
            if (typeof durationBeats !== 'number' || durationBeats < 0) {
                if(durationBeats !== undefined) s.push(durationBeats);
                throw new Error('play operator expects a non-negative number for duration in beats.');
            }
            if (s.length === 0) return;

            const programToResolve = [...s];
            const tempStack: StackValue[] = [];
            s.length = 0;

            yield* evaluate(programToResolve, tempStack, options);

            if (tempStack.length === 0) return;

            // If multiple sound quotations are left, combine them before transpiling.
            let finalQuotationOrGraph: StackValue;
            if (tempStack.length > 1) {
                let finalItem = tempStack.pop();
                while (tempStack.length > 0) {
                    finalItem = [tempStack.pop(), finalItem, 'mix'];
                }
                finalQuotationOrGraph = finalItem;
            } else {
                finalQuotationOrGraph = tempStack[0];
            }

            if (!Array.isArray(finalQuotationOrGraph)) {
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
                duration: 600, // wait for sound to finish
                assert: s => s.length === 0,
                assertDescription: "The sustained synth note should play and the stack should be empty."
            }
        },
    ]
};

export const start: Operator = {
    definition: {
        description: "Starts a continuous audio graph. The sound will play indefinitely until stopped with 'stop' or 'hush'. If a symbol precedes the graph on the stack, it's used as a name for the sound, allowing it to be controlled later. All arguments (graph, name) are consumed from the stack.",
        effect: "[... name_symbol? audio_quotation] -> []",
        exec: function*(s, options, evaluate, dictionary) {
            if (s.length === 0) return;

            const programToResolve = [...s];
            const tempStack: StackValue[] = [];
            s.length = 0;

            yield* evaluate(programToResolve, tempStack, options);

            if (tempStack.length === 0) return;
            
            let patchNameSymbol: symbol | undefined = undefined;
            if (typeof tempStack[0] === 'symbol') {
                patchNameSymbol = tempStack.shift() as symbol;
            }

            // If multiple sound quotations are left, combine them before transpiling.
            let finalQuotationOrGraph: StackValue;
            if (tempStack.length > 1) {
                let finalItem = tempStack.pop();
                while (tempStack.length > 0) {
                    finalItem = [tempStack.pop(), finalItem, 'mix'];
                }
                finalQuotationOrGraph = finalItem;
            } else {
                finalQuotationOrGraph = tempStack[0];
            }

            if (!Array.isArray(finalQuotationOrGraph)) {
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
            code: `(220 400 :sine :sine fm) :bell = 60 note :bell start`,
            assert: (s) => s.length === 0,
            expectedDescription: "Stack should be empty after starting."
        },
        {
            code: `
440 sine 0.5 mul :synth =
:mysynth :synth start`,
            expected: []
        },
        {
            replCode: `
60 0.8 :piano synth :my-piano start
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
