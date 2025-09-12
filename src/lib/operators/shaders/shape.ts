
import type { Operator } from '../../types';
import { createMarchingObject } from '../../utils';

export const shape: Operator = {
    definition: {
        exec: function*(s) {
            const radius = s.pop();
            const n_val = s.pop();

            if ((typeof n_val !== 'number' || !Number.isInteger(n_val) || n_val < 1) && n_val?.type !== 'glsl_expression') {
                throw new Error(`shape expects an integer number of points >= 1 or a glsl_expression.`);
            }

            if (typeof radius !== 'number' && radius?.type !== 'glsl_expression') {
                throw new Error(`shape expects a radius (number or glsl_expression).`);
            }

            if (typeof n_val === 'number') {
                const n = Math.round(n_val);
                let opName: string;
                let properties: any = { radius };

                switch (n) {
                    case 1:
                        opName = 'circle2d';
                        break;
                    case 2:
                        let a, b;
                        let thickness;
                        if (typeof radius === 'number') {
                            a = [0, -radius / 2.0];
                            b = [0, radius / 2.0];
                            thickness = radius * 0.1;
                        } else { // glsl_expression
                            a = { type: 'glsl_expression', code: `vec2(0.0, -(${radius.code})/2.0)`};
                            b = { type: 'glsl_expression', code: `vec2(0.0, (${radius.code})/2.0)`};
                            thickness = { type: 'glsl_expression', code: `(${radius.code}) * 0.1`};
                        }
                        const segment = createMarchingObject('segment2d', 'geometry', [], { a, b });
                        s.push(createMarchingObject('round', 'alteration', [segment], { amount: thickness }));
                        return;
                    case 3:
                        opName = 'equilateralTriangle2d';
                        break;
                    case 4:
                        opName = 'box2d';
                        if (typeof radius === 'number') {
                            properties = { size: [radius, radius] };
                        } else {
                            properties = { size: { type: 'glsl_expression', code: `vec2(${radius.code})`}};
                        }
                        break;
                    case 5:
                        opName = 'pentagon2d';
                        break;
                    case 6:
                        opName = 'hexagon2d';
                        break;
                    case 8:
                        opName = 'octogon2d';
                        break;
                    default:
                        opName = 'ngon2d';
                        properties = { radius: radius, n: n };
                        break;
                }
                s.push(createMarchingObject(opName, 'geometry', [], properties));
            } else { // n_val is a glsl_expression
                const properties = { radius: radius, n: n_val };
                s.push(createMarchingObject('ngon2d', 'geometry', [], properties));
            }
        },
        description: `Creates a regular 2D shape geometry (extruded). Based on the number of points 'n': 1 is a circle, 2 is a line, 3 is a triangle, 4 is a square, etc.`,
        effect: `[n radius] -> [sdf]`
    },
    examples: [
        { code: `1 0.5 shape "red" material march render`, assert: (s) => s[0]?.type === 'shader' },
        { code: `2 0.5 shape "green" material march render`, assert: (s) => s[0]?.type === 'shader' },
        { code: `3 0.5 shape "blue" material march render`, assert: (s) => s[0]?.type === 'shader' },
        { code: `4 0.5 shape "yellow" material march render`, assert: (s) => s[0]?.type === 'shader' },
        { code: `5 0.5 shape "cyan" material march render`, assert: (s) => s[0]?.type === 'shader' },
        { code: `6 0.5 shape "magenta" material march render`, assert: (s) => s[0]?.type === 'shader' },
        { code: `7 0.5 shape "white" material march render`, assert: (s) => s[0]?.type === 'shader' },
        {
            code: `(t 0.2 * sin 3 * 6 + floor) glsl # Animate number of sides from 3 to 9
0.5 shape
(p x p y + 5 *) glsl 1.0 1.0 hsv material
(t) glsl 0 0 1 vec3 rotatesdf
march render`,
            assert: (s) => s[0]?.type === 'shader',
            expectedDescription: 'A shader object rendering an animated, rotating, morphing polygon.'
        }
    ]
};
