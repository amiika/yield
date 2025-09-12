
import type { Operator } from '../../types';

export const saw: Operator = {
    definition: {
        exec: function*(s) {
            const freqOrModulator = s.pop();
            if (Array.isArray(freqOrModulator)) {
                if (freqOrModulator.length === 0) {
                    s.push(['mul', ['saw', 0], 0]);
                    return;
                }

                const firstEl = freqOrModulator[0];
                // An audio graph is an array starting with a string. A list of frequencies starts with a number.
                if (typeof firstEl === 'string') {
                    // It's an audio graph (modulator) for frequency
                    s.push(['saw', freqOrModulator]);
                } else {
                    // It's a list of frequencies for a chord
                    const graphs = freqOrModulator.map(freq => ['saw', freq]);
                    const mixedGraph = graphs.slice(1).reduce((acc, current) => ['mix', acc, current], graphs[0]);
                    s.push(mixedGraph);
                }
            } else {
                // It's a static frequency (number)
                s.push(['saw', freqOrModulator]);
            }
        },
        description: 'Creates a sawtooth wave oscillator node. The frequency can be a number, a list of numbers (for a chord), or an audio graph for frequency modulation (FM).',
        effect: '[F_freq | [F1 F2...] | L_modulator_graph] -> [L_graph]'
    },
    examples: [
        { code: '440 saw', expected: [['saw', 440]] },
        { 
            code: '(330 440) saw', 
            assert: (s) => s.length === 1 && s[0][0] === 'mix' && s[0][1][0] === 'saw' && s[0][1][1] === 330 && s[0][2][0] === 'saw' && s[0][2][1] === 440,
            expectedDescription: 'A mixed audio graph for a chord.'
        }
    ]
};
