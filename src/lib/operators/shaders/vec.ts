import type { Operator } from '../../types';

export const vec: Operator = {
    definition: {
        exec: function*(s) {
            if (s.length < 1) {
                throw new Error(`Stack underflow. 'vec' requires a size argument on the stack.`);
            }
            const n = s.pop();
            if (typeof n === 'number' && Number.isInteger(n) && n >= 0) {
                const available = s.length;
                if (available < n) {
                    s.push(n); // Push back so it's not lost
                    throw new Error(`Stack underflow for 'vec'. Needed ${n} items, but only ${available} available.`);
                }
                const items = s.splice(s.length - n, n);
                s.push(items);
            } else {
                if (Array.isArray(n)) {
                    s.push(n); // "just take it as is"
                } else {
                    s.push([n]); // "if something else wrap to array"
                }
            }
        },
        description: 'Creates a vector (list) of size N from the top N elements of the stack. If the argument is not a number, it wraps non-list items in a list, and leaves lists as-is.',
        effect: '[e1..eN N] -> [[e1..eN]] | [A] -> [L]'
    },
    examples: [
        {
            code: '1 2 3 3 vec',
            expected: [[1, 2, 3]]
        },
        {
            code: '"a" "b" 2 vec',
            expected: [['a', 'b']]
        },
        {
            code: '10 20 0 vec',
            expected: [10, 20, []]
        },
        {
            code: '1 2 3 4 3 vec',
            expected: [1, [2, 3, 4]]
        },
        {
            code: '"hello" vec',
            expected: [['hello']]
        },
        {
            code: '(1 2) vec',
            expected: [[1, 2]]
        },
        {
            code: '1 2 3 vec',
            expectedError: "Stack underflow for 'vec'. Needed 3 items, but only 2 available."
        },
        {
            code: 'vec',
            expectedError: "Stack underflow. 'vec' requires a size argument on the stack."
        }
    ]
};