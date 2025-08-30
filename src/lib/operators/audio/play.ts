import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const play: Operator = {
    definition: {
        exec: function*(s, options) {
            if (s.length < 1) return; // Nothing to play
            const target = s.pop(); // Pop
            let playTarget: string | any[];
            
            if (Array.isArray(target)) {
                playTarget = target;
            } else if (typeof target === 'symbol') {
                const name = Symbol.keyFor(target);
                if (!name) throw new Error('play: Invalid symbol for patch name.');
                playTarget = name;
            } else {
                 s.push(target); // Push it back if invalid
                 throw new Error('play expects an audio graph (list) or a patch name (symbol).');
            }
            
            const id = audioEngine.play(playTarget, options.sourceId);
            if (options.onVoiceCreated) {
                options.onVoiceCreated(id);
            }
            s.push(target); // Push back
        },
        description: 'Plays an audio graph from the stack, then pushes it back onto the stack. If given a graph (list), it plays it anonymously. If given a name (symbol), it plays the corresponding named patch.',
        example: ':my-synth play',
        effect: '[A] -> [A]'
    },
    testCases: [
        { 
            code: [
                '[60 note saw] :test-patch patch',
                'play'
            ],
            assert: s => s.length === 1 && typeof s[0] === 'symbol' && Symbol.keyFor(s[0]) === 'test-patch',
            expectedDescription: '[:test-patch]'
        },
        {
            code: '[440 sine] play',
            expected: [[440, "sine"]]
        },
    ]
};