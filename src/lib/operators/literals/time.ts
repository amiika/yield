import type { Operator } from '../../types';

export const time: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.floor(Date.now() / 1000)); },
        description: 'Pushes the current Unix time (seconds since epoch).',
        example: 'time',
        effect: '-> I'
    },
    testCases: [
        { code: 'time', assert: (s) => s.length === 1 && Number.isInteger(s[0]), expectedType: 'integer' }
    ]
};