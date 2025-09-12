
import type { Operator } from '../../types';
import { isMarchingObject, deepClone } from '../../utils';

export const material: Operator = {
    definition: {
        exec: function*(s) {
            const mat = s.pop();
            const obj = s.pop();
            if (!isMarchingObject(obj)) throw new Error('material expects an SDF object.');
            
            // Check for valid material types
            if (mat?.type !== 'color' && mat?.type !== 'image_material' && mat?.type !== 'glsl_expression' && typeof mat !== 'string' && typeof mat !== 'symbol' && !Array.isArray(mat)) {
                // Push back if invalid
                s.push(obj, mat);
                throw new Error('Invalid material type. Expecting a color name, symbol, vec3, color object, or image object.');
            }
            
            const newObj = deepClone(obj);
            newObj.material = mat;
            s.push(newObj);
        },
        description: 'Applies a material to an SDF object. Material can be a preset string ("red", "green", etc.), a preset symbol (:red, :green, etc.), a static `vec3`, a dynamic `color` object, or an `image` object for procedural texturing.',
        effect: '[sdf material] -> [sdf]'
    },
    examples: [
        {
            code: '1 sphere "red" material march render',
            assert: s => s[0].type === 'shader',
            expectedDescription: 'A shader object rendering a red sphere.'
        },
        {
            code: `1 sphere :blue material march render`,
            assert: s => s[0].type === 'shader',
            expectedDescription: 'A shader object rendering a blue sphere.'
        },
        {
            code: `1 sphere 0.2 1.0 0.5 rgb material march render`,
            assert: s => s[0].type === 'shader',
            expectedDescription: 'A shader object rendering a sphere with a custom RGB color.'
        },
        {
            code: `1 sphere 0.6 0.8 1.0 hsv material march render`,
            assert: s => s[0].type === 'shader',
            expectedDescription: 'A shader object rendering a sphere with a custom HSV color.'
        },
        {
            code: `1 sphere 1.0 1.2 1.4 wavecolor material march render`,
            assert: s => s[0].type === 'shader',
            expectedDescription: 'A shader object rendering a sphere with an animated, pulsing color.'
        },
        {
            code: `1 sphere (p xy t +) glsl cnoise material march render`,
            assert: s => s[0].type === 'shader',
            expectedDescription: 'A shader object rendering a sphere with an animated noise material.'
        }
    ]
};