import type { Operator } from '../../types';

export const dip: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            const p = s.pop();
            const v = s.pop();
            yield* evaluate(p, s, options);
            s.push(v);
        },
        description: 'Saves the top element, executes a program, then restores the element.',
        effect: '[A [P]] -> [A]'
    },
    examples: [
        { code: '10 (20 30 +) dip', expected: [50, 10] },
        { code: '1 (2 3 +) dip (4 5 +) dip', expected: [5, 9, 1] },
    ]
};