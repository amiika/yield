
import type { Operator } from '../../types';

export const range: Operator = {
    definition: {
        exec: function*(s) {
            const end = s.pop();
            const start = s.pop();

            if (start === undefined || end === undefined) {
                if (start !== undefined) s.push(start);
                if (end !== undefined) s.push(end);
                throw new Error('Stack underflow for range operator.');
            }

            const result: (number | string)[] = [];

            // Numeric range
            if (typeof start === 'number' && typeof end === 'number') {
                if (start <= end) {
                    for (let i = start; i <= end; i++) {
                        result.push(i);
                    }
                } else {
                    for (let i = start; i >= end; i--) {
                        result.push(i);
                    }
                }
            } 
            // Character range
            else if (typeof start === 'string' && typeof end === 'string' && start.length === 1 && end.length === 1) {
                const startCode = start.charCodeAt(0);
                const endCode = end.charCodeAt(0);
                
                if (startCode <= endCode) {
                    for (let i = startCode; i <= endCode; i++) {
                        result.push(String.fromCharCode(i));
                    }
                } else {
                    for (let i = startCode; i >= endCode; i--) {
                        result.push(String.fromCharCode(i));
                    }
                }
            } else {
                // Invalid types, push back and throw
                s.push(start, end);
                throw new Error('range expects two numbers or two single-character strings.');
            }
            
            s.push(result);
        },
        description: 'Creates a list containing a range of elements. If the arguments are numbers, it creates a numerical range. If they are single-character strings, it creates a character range. The range is inclusive and works in both increasing and decreasing directions.',
        effect: '[start end] -> [list]'
    },
    examples: [
        // Numeric ranges
        { code: '1 5 range', expected: [[1, 2, 3, 4, 5]] },
        { code: '-2 2 range', expected: [[-2, -1, 0, 1, 2]] },
        { code: '5 1 range', expected: [[5, 4, 3, 2, 1]] },
        { code: '-1 -5 range', expected: [[-1, -2, -3, -4, -5]] },
        { code: '3 3 range', expected: [[3]] },

        // Character ranges
        { code: '"a" "e" range', expected: [['a', 'b', 'c', 'd', 'e']] },
        { code: '"e" "a" range', expected: [['e', 'd', 'c', 'b', 'a']] },
        { code: '"z" "z" range', expected: [['z']] },

        // Shorthand tests
        { code: '-5 -1 ..', expected: [[-5, -4, -3, -2, -1]] },
        { code: '"a" "e" ..', expected: [['a', 'b', 'c', 'd', 'e']] },

        // Edge cases and errors
        { code: '1 "a" range', expectedError: 'range expects two numbers or two single-character strings.' },
        { code: '"a" 1 range', expectedError: 'range expects two numbers or two single-character strings.' },
        { code: '"ab" "c" range', expectedError: 'range expects two numbers or two single-character strings.' },
        { code: '1 range', expectedError: 'Stack underflow for range operator.' },
    ]
};
