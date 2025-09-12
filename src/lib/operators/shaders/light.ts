


import type { Operator, SceneObject, LightObject } from '../../types';

const isSceneObject = (v: any): v is SceneObject => v && typeof v === 'object' && v.type === 'scene';

export const light: Operator = {
    definition: {
        exec: function*(s) {
            const attenuation = s.pop();
            const color = s.pop();
            const pos = s.pop();
            const lightObj: LightObject = { type: 'light', pos, color, attenuation };

            if (s.length > 0 && isSceneObject(s[s.length - 1])) {
                // If a scene is on the stack, add this light to it directly.
                const scene = s.pop() as SceneObject;
                scene.lights.push(lightObj);
                s.push(scene);
            } else {
                // Otherwise, just push the light object to the stack.
                s.push(lightObj);
            }
        },
        description: 'Creates a light object and adds it to a scene if one is present on the stack. If no scene is present, it just creates the light object. Syntax: `[scene?] pos color attenuation light -> [scene|light]`',
        effect: '[scene? vec3 (vec3|color) F] -> [scene|light]'
    },
    examples: [
        { 
            code: '1 1 1 vec3 "white" 0.1 light', 
            assert: s => s[0]?.type === 'light',
            expectedDescription: 'A light object on the stack.'
        },
        {
            code: `
1 sphere march
  # Red light from the right
  2 1 0 vec3 :red 0.1 light
  # Blue light from the left
  -2 1 0 vec3 :blue 0.1 light
render`,
            assert: s => s[0].type === 'shader' && s[0].code.includes('lightPos_0') && s[0].code.includes('lightPos_1'),
            expectedDescription: 'A shader with two colored lights added directly to the scene.'
        },
        {
            code: `
# Define a reusable light
(2 1 4 vec3 "yellow" 0.1 light) mylight =>

# Use it on two different scenes
1 sphere march mylight
0.5 box march mylight
`,
            assert: s => s.length === 2 && isSceneObject(s[0]) && isSceneObject(s[1]) && s[0].lights.length === 1 && s[1].lights.length === 1,
            expectedDescription: 'Two scene objects, each with one light.'
        },
        {
            code: `
1 sphere march
  # Light position orbits the sphere
  ( t sin 3 *   2.0   t cos 3 *   vec3 ) glsl
  # Light color cycles through the rainbow
  1.0 1.2 1.4 wavecolor
  # Attenuation
  0.05
  light
render`,
            assert: s => s[0].type === 'shader' && s[0].code.includes('lightPos_0 = vec3((sin(u_time) * 3.0), 2.0, (cos(u_time) * 3.0))') && s[0].code.includes('abs(sin(u_time * 1.0))'),
            expectedDescription: 'A shader with an animated light orbiting a sphere.'
        }
    ]
};