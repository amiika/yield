import type { Operator } from '../../types';

export const acos: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.acos(s.pop())); },
        description: 'Arccosine.',
        example: '0.5 acos',
        effect: '[F] -> [G]'
    },
    testCases: [
        { code: '0.5 acos', expected: [1.0471975511965979] },
        { code: '1 acos', expected: [0] },
    ]
};