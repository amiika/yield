import type { Operator } from '../../types';

export const toBool: Operator = {
    definition: {
        exec: function*(s) { s.push(!!s.pop()); },
        description: 'Converts the top value on the stack to its boolean equivalent (using standard JavaScript truthiness).',
        effect: '[A] -> [B]'
    },
    examples: [
        { code: '1 toBool', expected: [true] },
        { code: '0 toBool', expected: [false] },
        { code: '"" toBool', expected: [false] },
        { code: '"hello" toBool', expected: [true] },
        { code: '[] toBool', expected: [true] }, // Empty lists are truthy in JS
        { code: '{} toBool', expected: [true] },
    ]
};