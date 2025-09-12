import type { Operator } from '../../types';

export const take: Operator = {
    definition: {
        exec: function*(s) {
            const n = s.pop();
            const a = s.pop();
            const res = a.slice(0, n);
            // Check for array vs string for reverse
            if (Array.isArray(res)) {
                s.push(res.reverse());
            } else if (typeof res === 'string') {
                s.push(res.split('').reverse().join(''));
            } else {
                s.push(res);
            }
        },
        description: 'Takes the first N elements from an aggregate and pushes the result in reverse order.',
        effect: '[A N] -> [B]'
    },
    examples: [
        { code: '(1 2 3 4 5) 2 take', expected: [[2, 1]] },
        { code: '"hello" 2 take', expected: ["eh"] },
    ]
};
