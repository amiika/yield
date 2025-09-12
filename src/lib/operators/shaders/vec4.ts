import type { Operator } from '../../types';

export const vec4: Operator = {
    definition: {
        exec: function*(s) { 
            const w = s.pop(); 
            const z = s.pop(); 
            const y = s.pop(); 
            const x = s.pop();
            s.push([x, y, z, w]);
        },
        description: 'Creates a 4D vector [x, y, z, w].',
        effect: '[x y z w] -> [vec4]'
    },
    examples: [{ code: '1 2 3 4 vec4', expected: [[1, 2, 3, 4]] }]
};