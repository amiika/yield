
import type { Operator } from '../../types';
import { SCALES } from './defaults';

// Helper to convert a number (0-4095) to a list of pitch classes.
const numberToPitchClasses = (number: number): number[] => {
    if (number < 0 || number > 4095) {
        console.warn("Input number must be between 0 and 4095. Using major (2741) instead.");
        number = 2741;
    }
    const arr = (number >>> 0).toString(2).padStart(12, '0').split('');
    return arr.reduce((acc, bit, i) => bit === '1' ? [...acc, 11 - i] : acc, [] as number[]).reverse();
};

// Helper to convert a list of pitch classes to a list of intervals.
const pitchClassesToIntervals = (pcs: number[]): number[] => {
    if (pcs.length === 0) return [];
    const sortedPcs = [...new Set(pcs)].sort((a,b) => a - b);
    const intervals: number[] = [];
    for (let i = 0; i < sortedPcs.length - 1; i++) {
        intervals.push(sortedPcs[i+1] - sortedPcs[i]);
    }
    intervals.push(12 - sortedPcs[sortedPcs.length - 1] + sortedPcs[0]);
    return intervals;
};


export const scale: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            let input = s.length > 0 ? s.pop() : undefined;

            if (input === undefined) {
                const defaultScaleDef = dictionary[':scale'];
                if (defaultScaleDef && 'body' in defaultScaleDef) {
                    input = defaultScaleDef.body;
                } else {
                    input = 'major'; // Fallback default
                }
            }
            
            let scaleNameStr: string | undefined;

            if (typeof input === 'string') {
                scaleNameStr = input.toUpperCase();
            } else if (typeof input === 'symbol') {
                const key = Symbol.keyFor(input);
                if (key) {
                    scaleNameStr = key.toUpperCase();
                }
            }

            if (typeof input === 'number' && Number.isInteger(input)) {
                const pcs = numberToPitchClasses(input);
                const intervals = pitchClassesToIntervals(pcs);
                s.push(intervals);
            } else if (scaleNameStr) {
                if (SCALES[scaleNameStr]) {
                    s.push(SCALES[scaleNameStr]);
                } else {
                    s.push(input); // Push back if not found
                    throw new Error(`Scale '${input.toString()}' not found.`);
                }
            } else if (Array.isArray(input)) {
                // Assume it's already a list of intervals
                s.push(input);
            } else {
                s.push(input); // Push back if not a valid type
                throw new Error('scale operator expects an integer, a scale name (string or symbol), or a list of intervals.');
            }
        },
        description: `Creates a musical scale (as a list of intervals). It can take an integer (0-4095) representing the scale's pitch classes, a standard scale name (e.g., "major", :minor), or a custom list of intervals. If called with no arguments, it will use the value of the session's ':scale' variable, or default to 'major'.`,
        effect: `[N_integer | S_name | :symbol | L_intervals]? -> [L_intervals]`
    },
    examples: [
        { code: '2741 scale', expected: [[2, 2, 1, 2, 2, 2, 1]] }, // 2741 is the major scale
        { code: ':minor scale', expected: [[2, 1, 2, 2, 1, 2, 2]] },
        { code: '(3 2 2 3 2) scale', expected: [[3, 2, 2, 3, 2]] }, // Minor pentatonic intervals
        { code: ':major scale', expected: [SCALES['MAJOR']]},
        { code: '"major" scale', expected: [SCALES['MAJOR']]},
        { code: ':maj scale', expected: [SCALES['MAJOR']]},
        {
            replCode: [
                ':minor :scale =',
                'scale'
            ],
            expected: [SCALES['MINOR']]
        }
    ]
};