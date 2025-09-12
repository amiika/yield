import type { Operator } from '../../types';

export const vec3: Operator = {
    definition: {
        exec: function*(s) { 
            const z = s.pop(); 
            const y = s.pop(); 
            const x = s.pop();
            s.push([x, y, z]);
        },
        description: 'Creates a 3D vector [x, y, z].',
        effect: '[x y z] -> [vec3]'
    },
    examples: [{ code: '1 2 3 vec3', expected: [[1, 2, 3]] }]
};