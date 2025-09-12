
import type { Operator } from '../../types';

export const tri: Operator = {
    definition: {
        exec: function*(s) {
            const freqOrModulator = s.pop();
            if (Array.isArray(freqOrModulator)) {
                if (freqOrModulator.length === 0) {
                    s.push(['mul', ['triangle', 0], 0]);
                    return;
                }

                const firstEl = freqOrModulator[0];
                // An audio graph is an array starting with a string. A list of frequencies starts with a number.
                if (typeof firstEl === 'string') {
                    // It's an audio graph (modulator) for frequency
                    s.push(['triangle', freqOrModulator]);
                } else {
                    // It's a list of frequencies for a chord
                    const graphs = freqOrModulator.map(freq => ['triangle', freq]);
                    const mixedGraph = graphs.slice(1).reduce((acc, current) => ['mix', acc, current], graphs[0]);
                    s.push(mixedGraph);
                }
            } else {
                // It's a static frequency (number)
                s.push(['triangle', freqOrModulator]);
            }
        },
        description: 'Creates a triangle wave oscillator node. The frequency can be a number, a list of numbers (for a chord), or an audio graph for frequency modulation (FM).',
        effect: '[F_freq | [F1 F2...] | L_modulator_graph] -> [L_graph]'
    },
    examples: [
        { code: "440 tri", expected: [['triangle', 440]] },
        {
            code: '(330 440) tri',
            assert: (s) => {
                const graph = s[0];
                return s.length === 1 && 
                       Array.isArray(graph) && 
                       graph[0] === 'mix' &&
                       graph[1][0] === 'triangle' && graph[1][1] === 330 &&
                       graph[2][0] === 'triangle' && graph[2][1] === 440;
            },
            expectedDescription: 'A mixed audio graph for a chord.'
        }
    ]
};
