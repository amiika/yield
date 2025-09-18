
import type { Operator } from '../../types';

export const always: Operator = {
    definition: {
        exec: function*(s) {
            const val = s.pop();
            s.push(['pop', val]);
        },
        description: 'Creates a constant function. Takes a value `V` and produces a quotation `(pop V)` that, when executed, will ignore any input on the stack and push `V`.',
        effect: '[V] -> [[pop V]]'
    },
    examples: [
        { code: '42 always', expected: [['pop', 42]] },
        { code: '(1 2 3) 0 always map', expected: [[0, 0, 0]] },
    ]
};
