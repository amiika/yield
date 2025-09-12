import type { Operator } from '../../types';
import { isMarchingObject, deepClone } from '../../utils';

const validTextures = new Set(['dots', 'stripes', 'checkers']);

const toGLSLFloat = (val: any): string => {
    if (typeof val !== 'number') return '1.0';
    const s = val.toString();
    if (Number.isInteger(val) && !s.includes('e') && !s.includes('.')) {
        return s + '.0';
    }
    return s;
};

export const texture: Operator = {
    definition: {
        exec: function*(s) {
            const scale = s.pop();
            const name = s.pop() as string;
            const sdf = s.pop();

            if (!isMarchingObject(sdf)) {
                throw new Error('texture operator expects an SDF object.');
            }
            if (typeof name !== 'string' || !validTextures.has(name)) {
                throw new Error(`Invalid texture name: "${name}". Valid textures are: ${Array.from(validTextures).join(', ')}.`);
            }
            if (typeof scale !== 'number') {
                throw new Error('texture operator expects a scale number.');
            }

            const newSdf = deepClone(sdf);
            const expression = `texture_${name}(p, ${toGLSLFloat(scale)})`;
            newSdf.material = { type: 'color', expression };
            s.push(newSdf);
        },
        description: 'Applies a procedural texture to an SDF object. Textures are generated in GLSL based on surface position `p`. Available textures: "dots", "stripes", "checkers".',
        effect: '[sdf name scale] -> [sdf]'
    },
    examples: [{
        code: `1.0 sphere "dots" 10 texture march render`,
        assert: s => s[0]?.type === 'shader' && s[0].code.includes('texture_dots'),
        expectedDescription: 'A shader object with a sphere textured with dots.'
    }]
};
