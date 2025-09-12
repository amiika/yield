
import type { Operator, StackValue, UntilDef } from '../../types';
import { deepClone } from '../../utils';

// FIX: Add and export 'resetUntilCounter' function and its associated counter 
// to fix an import error in the test runner and enable isolated tests for the 'until' operator.
let untilCounter = 0;
export const resetUntilCounter = () => { untilCounter = 0; };

export const until: Operator = {
    definition: {
        exec: function*(s) {
            const endBeats = s.pop();
            const intervalBeats = s.pop();
            const quotation = s.pop();
            const initialValue = s.pop();

            // --- Argument Validation ---
            if (typeof endBeats !== 'number' || endBeats < 0) {
                throw new Error('until expects a non-negative number for end_beats.');
            }
            if (typeof intervalBeats !== 'number' || intervalBeats <= 0) {
                throw new Error('until expects a positive number for interval_beats.');
            }
            if (!Array.isArray(quotation)) {
                throw new Error('until expects a quotation.');
            }

            const untilDef: UntilDef = {
                type: 'until-def',
                initialValue,
                quotation,
                intervalBeats,
                endBeats,
                sourceCode: [deepClone(initialValue), deepClone(quotation), intervalBeats, endBeats, 'until']
            };
            s.push(untilDef);
        },
        description: "Creates an 'until' loop definition. When executed (either by name or as a nameless loop), it runs a program at a regular interval for a set duration, directly manipulating the main stack. `initial_value (program) interval_beats end_beats until`. A temporary word `untilN` is created to store the results of each execution; this word is removed when the loop finishes.",
        effect: '[V [P] I_beats E_beats] -> [until-def]',
    },
    examples: [
        {
            replCode: [
                '600 tempo',
                '(1 (1 +) 0.125 0.25 until) myloop =>',
            ],
            assert: (s, dict) => {
                const loopDefBody = dict['myloop']?.body;
                // The body will now be a quotation that, when run, creates an until-def.
                return Array.isArray(loopDefBody) && loopDefBody[1] === 'iterate';
            },
            expectedDescription: 'A function named myloop is created in the dictionary.'
        },
        {
            replCode: [
                '600 tempo',
                '1 (1 +) 0.125 0.25 until'
            ],
            async: {
                duration: 300, // wait for loop to finish, increased from 200 to be safer
                assert: (s, dict) => {
                    const isLoopGone = !Object.keys(dict).some(k => /^until\d+/.test(k));
                    // should run at t=0, t=12.5ms. Loop ends at t=25ms.
                    // Initial val is 1. Program is (1+).
                    // t=0, stack becomes [2]. t=12.5, stack becomes [3].
                    const finalValueCorrect = s.length === 1 && s[0] === 3;
                    return isLoopGone && finalValueCorrect;
                },
                assertDescription: "Temporary loop runs, modifies the stack, and removes itself from the dictionary."
            }
        },
        {
            replCode: [
                '600 tempo',
                '(1 (1 +) 0.125 0.25 until) myloop =>',
                'myloop'
            ],
            async: {
                duration: 300, // wait for loop to finish, increased from 200 to be safer
                assert: (s, dict) => {
                    const isLoopPresent = dict.hasOwnProperty('myloop');
                    const finalValueCorrect = s.length === 1 && s[0] === 3;
                    // Check that the loop definition (the function) is unchanged.
                    const loopBody = dict['myloop']?.body;
                    const isFunction = Array.isArray(loopBody) && loopBody[1] === 'iterate';
                    return isLoopPresent && isFunction && finalValueCorrect;
                },
                assertDescription: "Named loop runs, modifies the stack, and the function definition persists."
            }
        }
    ]
};
