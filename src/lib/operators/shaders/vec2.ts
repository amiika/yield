import type { Operator } from '../../types';

export const vec2: Operator = {
    definition: {
        exec: function*(s) { 
            const y = s.pop(); 
            const x = s.pop();
            s.push([x, y]);
        },
        description: 'Creates a 2D vector [x, y].',
        effect: '[x y] -> [vec2]'
    },
    examples: [{ code: '1 2 vec2', expected: [[1, 2]] }]
};