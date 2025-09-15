
import type { StackValue } from '../types';
import { yieldFormatter } from '../utils';

// --- Transpiler ---
// Converts a flat RPN audio quotation into the nested graph structure the AudioEngine expects.
export const opArity = {
    sine: 1, saw: 1, pulse: 2, tri: 1, noise: 0, impulse: 1, note: 1,
    lpf: 3, hpf: 3, ad: 3, adsr: 5, delay: 3, distort: 2, pan: 2,
    mix: 2, mul: 2,
    fm_simple: 5, fm_synth: 5,
    seq: 2,
    oneshot: 0,
    gate_env: 3,
    gate: 1,
    arp: 4,
};

export const specialOps = new Set(['bytebeat', 'floatbeat']);

export const transpileAudioQuotation = (quotation: StackValue[]): any[] => {
    const stack: any[] = [];
    const program = quotation;

    for (const token of program) {
        if (Array.isArray(token)) {
            // Check if the array is a sub-program (ends with an op) or a literal data array
            const lastEl = token[token.length - 1];
            if (typeof lastEl === 'string' && (opArity[lastEl] !== undefined || specialOps.has(lastEl))) {
                stack.push(transpileAudioQuotation(token)); // It's a sub-program
            } else {
                stack.push(token); // It's a literal data array (e.g., op_defs for fm_synth)
            }
        } else if (typeof token === 'string' && (opArity[token] !== undefined || specialOps.has(token))) {
            const op = token;
            
            if (op === 'bytebeat' || op === 'floatbeat') {
                const frequency = stack.pop();
                const jsCode = stack.pop();
                stack.push([op, jsCode, frequency]);
                continue;
            }
            
            const arity = opArity[op];
            if (stack.length < arity) {
                throw new Error(`Audio transpiler stack underflow for operator '${op}'.`);
            }
            const args = stack.splice(stack.length - arity, arity);
            
            const oscillators = new Set(['sine', 'saw', 'tri', 'pulse']);
            // FIX: The condition for polyphony should be "is it an array AND not a graph node itself?"
            // A graph node is an array starting with an operator string.
            // A list of frequencies is just an array of numbers.
            const isPolyphonic = oscillators.has(op) && 
                                 Array.isArray(args[0]) && 
                                 (args[0].length === 0 || typeof args[0][0] !== 'string' || !opArity.hasOwnProperty(args[0][0]));

            if (isPolyphonic) {
                // Handle polyphony for oscillators
                const frequencies = args[0];
                const otherArgs = args.slice(1); // e.g., duty cycle for pulse

                if (frequencies.length === 0) {
                    stack.push(0.0); // No frequencies means silence
                } else {
                    const voices = frequencies.map(freq => [op, freq, ...otherArgs]);
                    let finalGraph = voices[0];
                    for (let i = 1; i < voices.length; i++) {
                        finalGraph = ['mix', finalGraph, voices[i]];
                    }
                    stack.push(finalGraph);
                }
            } else {
                stack.push([op, ...args]);
            }
        } else {
            stack.push(token);
        }
    }
    
    if (stack.length !== 1) {
        if (stack.length > 1) {
            // If multiple sound sources are left on the stack, mix them together.
            let finalGraph = stack.pop();
            while (stack.length > 0) {
                finalGraph = ['mix', stack.pop(), finalGraph];
            }
            return finalGraph;
        }
        throw new Error(`Audio quotation must resolve to a single audio graph. Found ${stack.length} items: ${yieldFormatter(stack)}`);
    }

    return stack[0];
};

// Auto-clocks sequencers in a *nested* graph structure.
export const autoClockSequencersInGraph = (graphNode: any, durationBeats: number, bpm: number): void => {
    if (!Array.isArray(graphNode)) return;

    if (graphNode[0] === 'seq' && graphNode[1] === null) {
        const values = graphNode[2]; // The list of values is now the 3rd element
        const numNotes = values.length;
        if (numNotes > 0 && durationBeats > 0) {
            const effectiveDurationBeats = durationBeats * 0.999;
            const ticksPerBeat = numNotes / effectiveDurationBeats;
            const ticksPerSecond = ticksPerBeat * (bpm / 60.0);
            graphNode[1] = ['impulse', ticksPerSecond];
        } else {
            graphNode[1] = ['impulse', 0];
        }
        return;
    }

    // Recurse into arguments, which start from index 1
    for (let i = 1; i < graphNode.length; i++) {
        autoClockSequencersInGraph(graphNode[i], durationBeats, bpm);
    }
};
