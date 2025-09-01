import type { Operator } from '../../types';

export const popstack: Operator = {
    definition: {
        exec: function*(s) {
            const currentStack = [...s];
            s.length = 0;
            s.push(currentStack);
        },
        description: "Consumes the entire stack and replaces it with a list containing all the stack's previous elements in their original order.",
        effect: '[A B C ...] -> [[A B C ...]]'
    },
    // FIX: Renamed `testCases` to `examples` to match the Operator type.
    examples: [
        { code: '1 2 3 popstack', expected: [[1, 2, 3]] },
        { code: 'popstack', expected: [[]] },
        { code: '1 "a" [2] popstack', expected: [[1, "a", [2]]] },
    ]
};