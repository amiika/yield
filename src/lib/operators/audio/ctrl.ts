import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const ctrl: Operator = {
    definition: {
        exec: function*(s) {
            if (s.length < 3) throw new Error('ctrl expects 3 arguments on the stack.');
            const value = s.pop();
            const paramSymbol = s.pop();
            const patchNameSymbol = s.pop();
            
            if (typeof patchNameSymbol !== 'symbol' || typeof paramSymbol !== 'symbol' || typeof value !== 'number') {
                // Push back in reverse order to restore state before throwing
                s.push(patchNameSymbol, paramSymbol, value);
                throw new Error('ctrl expects: symbol (patch name), symbol (param name), number (value)');
            }
            
            const patchName = Symbol.keyFor(patchNameSymbol);
            if (!patchName) throw new Error('ctrl: Invalid symbol for patch name.');
            
            const paramName = Symbol.keyFor(paramSymbol);
            if (!paramName) throw new Error(`ctrl: Invalid symbol for parameter name.`);

            audioEngine.ctrl(patchName, paramName, value);

            // Push arguments back in original order
            s.push(patchNameSymbol, paramSymbol, value);
        },
        description: 'Controls a parameter of a running audio patch. Consumes the patch name, parameter name, and value, then pushes them back onto the stack.',
        effect: '[A B C] -> [A B C]'
    },
    examples: [
        { 
            code: ':my-synth :freq 440 ctrl', 
            assert: s => s.length === 3 && 
                         typeof s[0] === 'symbol' && Symbol.keyFor(s[0]) === 'my-synth' &&
                         typeof s[1] === 'symbol' && Symbol.keyFor(s[1]) === 'freq' &&
                         s[2] === 440,
            expectedDescription: '[:my-synth :freq 440]'
        }
    ]
};