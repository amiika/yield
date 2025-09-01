import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const stop: Operator = {
    definition: {
        exec: function*(s, options) {
            let stoppedIds: string[] = [];
            
            if (s.length === 0) {
                stoppedIds = audioEngine.stopAll();
            } else {
                const target = s.pop(); // Pop
                if (typeof target === 'symbol') {
                    const name = Symbol.keyFor(target);
                    if (!name) throw new Error('stop: Invalid symbol for patch name.');
                    stoppedIds = audioEngine.stop(name);
                } else {
                    s.push(target); // Push back if invalid
                    throw new Error('stop expects a patch name (symbol) on the stack, or an empty stack to stop all sounds.');
                }
                s.push(target); // Push back
            }

            if (options.onVoiceDestroyed) {
                stoppedIds.forEach(id => options.onVoiceDestroyed(id));
            }
        },
        description: 'Stops a playing audio patch by its name (symbol), then pushes the name back onto the stack. If the stack is empty, it stops all audio (like `hush`).',
        effect: '[A]? -> [A]?'
    },
    // FIX: Renamed 'testCases' to 'examples' to match the Operator type.
    examples: [
        { 
            code: ':my-synth stop', 
            assert: s => s.length === 1 && typeof s[0] === 'symbol' && Symbol.keyFor(s[0]) === 'my-synth',
            expectedDescription: '[:my-synth]'
        },
        { code: 'stop', expected: [] }
    ]
};