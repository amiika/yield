import type { Operator } from '../../types';

export const toNumber: Operator = {
    definition: {
        exec: function*(s) { 
            const value = s.pop();
            const num = parseFloat(value);
            s.push(isNaN(num) ? 0 : num);
        },
        description: 'Parses a string into a number. Returns 0 if the string cannot be parsed.',
        example: '"123.45" toNumber',
        effect: '[S] -> [N]'
    },
    testCases: [
        { code: '"123.45" toNumber', expected: [123.45] },
        { code: '"-10" toNumber', expected: [-10] },
        { code: '"hello" toNumber', expected: [0] },
        { code: 'true toNumber', expected: [0] }, // Coerces to "true" which is not a number
        { code: '123 toNumber', expected: [123] },
    ]
};