

import type { Operator, EvaluateFn } from '../../types';
import { deepClone } from '../../utils';

export const dupdip: Operator = {
    definition: {
        exec: function*(s, options, evaluate) {
            if (s.length < 1) throw new Error('Stack underflow for operator: dupdip');
            const p = s.pop(); // Pop the quotation

            if (!Array.isArray(p)) {
                s.push(p); // Restore value and throw
                throw new Error('dupdip expects a quotation on top of the stack.');
            }

            if (s.length < 1) {
                s.push(p); // Restore quotation and throw
                throw new Error('Stack underflow for operator: dupdip');
            }
            
            const x = s[s.length - 1]; // Peek at the value underneath

            // Create a temporary stack with a copy of x to execute p on.
            const tempStack = [deepClone(x)];
            yield* evaluate(p, tempStack, options);

            // Push the results from the temp stack onto the main stack.
            // This places the result of P(X) on top of X.
            s.push(...tempStack);
        },
        description: 'Executes a quotation on a copy of the second stack item, leaving the original item and the result on the stack.',
        effect: '[X [P]] -> [X P(X)]'
    },
    examples: [
        {
            code: '23 (succ) dupdip *',
            expected: [552]
        },
        {
            code: '10 (dup *) dupdip swap -',
            expected: [90]
        },
        {
            code: '5 (++) dupdip',
            expected: [5, 6]
        },
        {
            code: '5 dupdip',
            expectedError: 'dupdip expects a quotation on top of the stack.'
        },
        {
            code: 'dupdip',
            expectedError: 'Stack underflow for operator: dupdip'
        }
    ]
};