import type { Operator, SceneObject, MarchingObject, ImageMaterialObject, TurtleObject } from '../../types';
import { generateMarchingShader, generate2dSDFShader, generateImageShaderFromQuotation, generateTurtleShader } from './glsl-generator';
import { isMarchingObject } from '../../utils';

const isSceneObject = (v: any): v is SceneObject => v && typeof v === 'object' && v.type === 'scene';
const isImageMaterialObject = (v: any): v is ImageMaterialObject => v && typeof v === 'object' && v.type === 'image_material';

export const render: Operator = {
    definition: {
        exec: function*(s) {
            const quality = s.length > 0 && typeof s[s.length-1] === 'number' ? s.pop() as number : 10;
            const subject = s.pop();
            
            if (isSceneObject(subject)) {
                // 3D Rendering Path
                const shaderCode = generateMarchingShader(subject, quality);
                s.push({ type: 'shader', code: shaderCode });
            } else if (isMarchingObject(subject)) {
                // 2D SDF Rendering Path (cross-section for 3D objects)
                const shaderCode = generate2dSDFShader(subject);
                s.push({ type: 'shader', code: shaderCode });
            } else if (isImageMaterialObject(subject)) {
                // 2D Image Shader Rendering Path
                const shaderCode = generateImageShaderFromQuotation(subject.quotation);
                s.push({ type: 'shader', code: shaderCode });
            } else if (subject?.type === 'shader') {
                // This handles the case where `image` already produced a shader from a turtle quotation
                s.push(subject);
            }
            else {
                throw new Error('render expects a scene, sdf, image, or turtle-generated shader object.');
            }
        },
        description: 'Renders a 3D scene, an SDF object, a 2D turtle drawing, or a 2D image shader into a final visual. For 3D scenes, it raymarches and optionally takes a quality number (1-100) from the stack.',
        effect: '[scene|sdf|image|turtle_shader I_quality?] -> [shader]'
    },
    examples: [
        {code: '1 sphere march render', assert: s => s[0].type === 'shader' && s[0].code.includes('sdSphere')},
        {
            code: `1 sphere march 5 render`,
            assert: s => s[0]?.type === 'shader' && s[0].code.includes('i < 50'),
        },
        {
            code: '0.5 circle2d render', 
            assert: s => s[0].type === 'shader' && s[0].code.includes('sdCircle2d') && !s[0].code.includes('getNormal'),
            expectedDescription: 'A 2D shader object rendering a circle.'
        },
        {
            code: `((0 0) p -10 move) image render`,
            assert: s => s[0]?.type === 'shader',
            expectedDescription: 'A shader object rendering a line drawn by the turtle.'
        }
    ]
};