import type { Operator } from '../../types';

export const rand: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)); },
        description: 'Pushes a large random integer.',
        example: 'rand',
        effect: '-> I'
    },
    testCases: [
        { code: 'rand', assert: (s) => s.length === 1 && Number.isInteger(s[0]), expectedType: 'integer' }
    ]
};