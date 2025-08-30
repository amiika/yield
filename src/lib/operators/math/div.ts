import type { Operator } from '../../types';

export const div: Operator = {
    definition: {
        exec: function*(s) { 
           const b = s.pop(), a = s.pop();
            // Division by zero results in Infinity for quotient and NaN for remainder.
            // Stack underflow results in NaN for both.
            s.push(Math.floor(a / b), a % b); 
        },
        description: 'Integer division. Pushes quotient and remainder.',
        example: '21 10 div',
        effect: '[I J] -> [K L]'
    },
    testCases: [
        { code: '21 10 div', expected: [2, 1] },
        { code: '-21 10 div', expected: [-3, -1] },
        // Test stack underflow
        { code: '10 div', assert: (s) => s.length === 2 && isNaN(s[0]) && isNaN(s[1]), expectedDescription: '[NaN, NaN]' },
        // Test division by zero
        { code: '10 0 div', assert: (s) => s.length === 2 && s[0] === Infinity && isNaN(s[1]), expectedDescription: '[Infinity, NaN]' }
    ]
};