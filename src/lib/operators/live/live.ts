
import type { Operator, LiveLoopDef } from '../../types';
import { deepClone } from '../../utils';

export const live: Operator = {
    definition: {
        exec: function*(s) {
            const beatValue = s.pop();
            const quotation = s.pop();
            
            if (!Array.isArray(quotation)) {
                s.push(quotation, beatValue); // push back
                throw new Error('live expects a quotation.');
            }
            if (typeof beatValue !== 'number' || beatValue <= 0) {
                s.push(quotation, beatValue); // push back
                throw new Error('live expects a positive number for beat duration.');
            }

            const liveLoopDef: LiveLoopDef = { type: 'live-loop-def', quotation: deepClone(quotation), beatValue, sourceCode: [quotation, beatValue, 'live'] };
            s.push(liveLoopDef);
        },
        description: "Creates a live loop definition. When the assigned name is called (or if left on the stack), the loop starts. The loop executes the quotation directly on the main REPL stack every N beats, allowing it to consume values from and push values to the live coding environment.",
        effect: '[L_quotation N_beats] -> [live-loop-def]'
    },
    examples: [
        {
            replCode: [
                '120 tempo',
                '() mylist =',
                '(1 mylist <-) 0.25 live myloop =',
            ],
            assert: (s, dict) => dict['myloop']?.body?.type === 'live-loop-def',
            expectedDescription: 'A live-loop-def in the dictionary.'
        },
        {
            replCode: [
                '120 tempo',
                // This nameless loop should run and push its result (42) to the main stack on each tick.
                '(42) 0.25 live'
            ],
            async: {
                duration: 1050, // 1 beat = 500ms. 0.25 beat = 125ms. 1050ms > 8 ticks (approx 1 second).
                assert: (s, dict) => {
                    // The live-loop-def is consumed after the initial run, so the stack starts empty.
                    // The loop should have run at least 8 times, pushing 42 each time.
                    return s.length >= 8 && s.every(item => item === 42);
                },
                assertDescription: "A nameless live loop should push its results back to the main stack over time."
            }
        }
    ]
};
