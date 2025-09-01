import type { Operator } from '../../types';

export const clock: Operator = {
    definition: {
        exec: function*(s) { s.push(performance.now()); },
        description: 'Pushes the number of milliseconds since the page loaded.',
        effect: '-> F'
    },
    examples: [
        { code: 'clock', assert: (s) => s.length === 1 && typeof s[0] === 'number', expectedType: 'number' }
    ]
};