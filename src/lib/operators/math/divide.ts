import type { Operator } from '../../types';

export const divide: Operator = {
    definition: {
        exec: function*(s) { 
            // Handle stack underflow explicitly
            if (s.length < 2) {
                if (s.length === 1) {
                    s.pop(); // Pop the single element
                } else { // s.length === 0
                    s.push(null); // Treat as division by zero
                }
                return;
            }
            
            const b = s.pop();
            const a = s.pop();

            if (b === 0) {
                s.push(null);
            } else {
                s.push(a / b); 
            }
        },
        description: 'Divides the second element by the top element. Returns null if dividing by zero. Pops a single element on stack underflow.',
        effect: '[A B] -> [C]'
    },
    examples: [
        { code: '20 4 /', expected: [5] },
        { code: '21 4 /', expected: [5.25] },
        { code: '10 0 /', expected: [null] },
        { code: '5 /', expected: [] },
        { code: '/', expected: [null] },
        { code: '0 5 /', expected: [0] },
        { code: '+ / = 0 5 /', expected: [5] },
    ]
};