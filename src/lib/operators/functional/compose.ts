
import type { Operator } from '../../types';

export const compose: Operator = {
    definition: {
        exec: function*(s) {
            const p2 = s.pop();
            const p1 = s.pop();
            if (!Array.isArray(p1) || !Array.isArray(p2)) {
                throw new Error('compose expects two quotations on the stack.');
            }
            s.push([...p1, ...p2]);
        },
        description: 'Composes two quotations into a single new quotation. This provides an explicit alternative to Yield\'s implicit composition.',
        effect: '[[P1] [P2]] -> [[P1 P2]]'
    },
    examples: [
        { code: '(1 +) (2 *) compose', expected: [[1, '+', 2, '*']] },
        { code: '10 (1 +) (2 *) compose i', expected: [22] },
    ]
};
