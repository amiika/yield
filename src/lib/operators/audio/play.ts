import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';
import { deepEqual, simpleFormatter } from '../../utils';

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
        effect: '[A] -> [A]'
    },
    // FIX: Renamed 'testCases' to 'examples' to match the Operator type.
    examples: [
        { 
            code: [
                '[60 note saw] :test-patch patch',
                ':test-patch play'
            ],
            assert: s => deepEqual(s.map(simpleFormatter), [':test-patch', ':test-patch']),
            expectedDescription: '[:test-patch :test-patch]'
        },
        {
            code: '[440 sine] play',
            expected: [[440, "sine"]]
        },
    ]
};