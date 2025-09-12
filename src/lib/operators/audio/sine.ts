
import type { Operator } from '../../types';

export const sine: Operator = {
    definition: {
        exec: function*(s) {
            const freqOrModulator = s.pop();
            if (Array.isArray(freqOrModulator)) {
                if (freqOrModulator.length === 0) {
                    s.push(['mul', ['sine', 0], 0]);
                    return;
                }

                const firstEl = freqOrModulator[0];
                // An audio graph is an array starting with a string. A list of frequencies starts with a number.
                if (typeof firstEl === 'string') {
                    // It's an audio graph (modulator) for frequency
                    s.push(['sine', freqOrModulator]);
                } else {
                    // It's a list of frequencies for a chord
                    const graphs = freqOrModulator.map(freq => ['sine', freq]);
                    const mixedGraph = graphs.slice(1).reduce((acc, current) => ['mix', acc, current], graphs[0]);
                    s.push(mixedGraph);
                }
            } else {
                // It's a static frequency (number)
                s.push(['sine', freqOrModulator]);
            }
        },
        description: 'Creates a sine wave oscillator node. The frequency can be a number, a list of numbers (for a chord), or an audio graph for frequency modulation (FM).',
        effect: '[F_freq | [F1 F2...] | L_modulator_graph] -> [L_graph]'
    },
    examples: [
        { code: "440 sine", expected: [['sine', 440]] },
        {
            code: '(330 440 445) sine',
            assert: (s) => {
                const graph = s[0];
                return s.length === 1 && 
                       Array.isArray(graph) && 
                       graph[0] === 'mix' &&
                       graph[1][0] === 'mix' &&
                       graph[1][1][0] === 'sine' && graph[1][1][1] === 330 &&
                       graph[1][2][0] === 'sine' && graph[1][2][1] === 440 &&
                       graph[2][0] === 'sine' && graph[2][1] === 445;
            },
            expectedDescription: 'A mixed audio graph for a chord.'
        },
        {
            code: '# Manual FM patch: Carrier Freq = 440, Modulator Freq = 220, Modulation Index = 100\n220 sine 100 mul 440 mix sine',
            assert: (s) => {
                const graph = s[0];
                // expecting ['sine', ['mix', ['mul', ['sine', 220], 100], 440]]
                return s.length === 1 &&
                       Array.isArray(graph) &&
                       graph[0] === 'sine' &&
                       graph[1][0] === 'mix' &&
                       graph[1][1][0] === 'mul' &&
                       graph[1][1][1][0] === 'sine' &&
                       graph[1][1][1][1] === 220 &&
                       graph[1][1][2] === 100 &&
                       graph[1][2] === 440;
            },
            expectedDescription: 'An FM audio graph.'
        }
    ]
};
