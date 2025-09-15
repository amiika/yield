
import type { Operator } from '../../types';
import { transpileAudioQuotation } from '../../audio/transpiler';

export const transpileAudio: Operator = {
    definition: {
        exec: function*(s) {
            const quotation = s.pop();
            if (!Array.isArray(quotation)) {
                throw new Error('transpile-audio expects an audio quotation.');
            }
            const graph = transpileAudioQuotation(quotation);
            s.push(graph);
        },
        description: 'A debugging tool that consumes an audio quotation and pushes its transpiled graph structure to the stack instead of playing it. This allows you to inspect the final structure that is sent to the audio engine.',
        effect: '[audio_quotation] -> [audio_graph]'
    },
    examples: [
        {
            code: `440 sine 0.5 mul transpile-audio`,
            expected: [['mul', ['sine', 440], 0.5]]
        },
        {
            code: 'bd transpile-audio',
            assert: s => Array.isArray(s[0]) && s[0][0] === 'mul',
            expectedDescription: 'The final audio graph for the `bd` drum patch.'
        }
    ]
};
