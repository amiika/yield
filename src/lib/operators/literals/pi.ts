
import type { Operator } from '../../types';

export const pi: Operator = {
    definition: {
        exec: function*(s) { s.push(Math.PI); },
        description: 'Pushes the mathematical constant PI (π ≈ 3.14159).',
        effect: '-> [F]'
    },
    examples: [
        { code: 'pi', expected: [Math.PI] }
    ]
};
