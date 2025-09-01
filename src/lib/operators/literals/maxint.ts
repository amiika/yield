import type { Operator } from '../../types';

export const maxint: Operator = {
    definition: {
        exec: function*(s) { s.push(Number.MAX_SAFE_INTEGER); },
        description: 'Pushes the largest safe integer available in the JavaScript environment.',
        effect: '-> I'
    },
    examples: [
        { code: 'maxint', expected: [Number.MAX_SAFE_INTEGER] }
    ]
};