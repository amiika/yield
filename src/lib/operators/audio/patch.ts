import type { Operator } from '../../types';
import { audioEngine } from '../../audio/AudioEngine';

export const patch: Operator = {
    definition: {
        exec: function*(s) {
            if (s.length < 2) throw new Error('patch expects 2 arguments on the stack.');
            const nameSymbol = s.pop();
            const quotation = s.pop() as any[];
            if (typeof nameSymbol !== 'symbol' || !Array.isArray(quotation)) {
                // Restore stack before throwing
                s.push(quotation, nameSymbol);
                throw new Error('patch operator expects a quotation and a name (symbol).');
            }
            const name = Symbol.keyFor(nameSymbol);
            if (!name) throw new Error('patch: Invalid symbol for patch name.');
            audioEngine.definePatch(name, quotation);
            
            // Push the name back as the result
            s.push(nameSymbol);
        },
        description: 'Defines a named audio patch from a quotation. The patch can then be played, stopped, and controlled by its name. Pushes the patch name back onto the stack as a result.',
        example: '[ 60 note saw ] :bass patch',
        effect: '[[Graph]] [Sym_name] -> [Sym_name]'
    },
    testCases: [
        { 
            code: '[440 sine] :my-sine patch', 
            assert: s => s.length === 1 && typeof s[0] === 'symbol' && Symbol.keyFor(s[0]) === 'my-sine',
            expectedDescription: '[:my-sine]'
        },
        { 
            code: '[ 60 note saw ] :bass patch', 
            assert: s => s.length === 1 && typeof s[0] === 'symbol' && Symbol.keyFor(s[0]) === 'bass',
            expectedDescription: '[:bass]'
        },
    ]
};