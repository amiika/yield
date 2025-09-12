
import type { Operator } from '../../types';
import { transpileJS } from '../../utils';

export const floatbeat: Operator = {
    definition: {
        exec: function*(s) {
            const frequency = s.pop() as number;
            const quotation = s.pop() as any[];
            
            if (!Array.isArray(quotation)) {
                s.push(quotation, frequency); // push back
                throw new Error('floatbeat expects a quotation (list) containing a valid RPN expression.');
            }
            if (typeof frequency !== 'number') {
                s.push(quotation, frequency); // push back
                throw new Error('floatbeat expects a frequency number.');
            }
            
            try {
                const code = transpileJS(quotation);
                s.push(['floatbeat', code, frequency]);
            } catch(e) {
                // Add context to the transpiler error
                throw new Error(`Error transpiling floatbeat quotation: ${e.message}`);
            }
        },
        description: `Floatbeat node. Consumes a quotation with an RPN expression and a frequency. The expression is transpiled to JS and evaluated for every audio sample. The integer variable 't' (time) is available inside the quotation. The float result is used directly as an audio sample and should be in the -1 to 1 range.`,
        effect: '[L_quotation F_frequency] -> [L_graph]'
    },
    examples: [
        { 
            code: `(t 44100 / 440 * 2 * 3.14159 * sin) 44100 floatbeat play`, 
            assert: s => Array.isArray(s[0]) && s[0][0] === 'floatbeat',
            expectedDescription: 'A floatbeat audio graph'
        },
    ]
};
