import type { Operator } from '../../types';

export const charPredicate: Operator = {
    definition: {
        exec: function*(s) { const v = s.pop(); s.push(typeof v === 'string' && v.length === 1); },
        description: 'Tests if the top element is a character (string of length 1).',
        effect: '[A] -> [bool]'
    },
    examples: [
        { code: '"a" char?', expected: [true] },
        { code: '"ab" char?', expected: [false] },
        { code: '97 chr char?', expected: [true] },
        
    ]
};