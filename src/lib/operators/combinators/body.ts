import type { Operator } from '../../types';

export const body: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const name = s.pop();
            let dictKey: string;
            let nameForError: string;
            
            if (typeof name === 'symbol') {
                const key = Symbol.keyFor(name);
                if (!key) throw new Error(`body: cannot get body of a non-global symbol.`);
                dictKey = `:${key}`;
                nameForError = `:${key}`;
            } else if (typeof name === 'string' || typeof name === 'number') {
                dictKey = String(name);
                nameForError = String(name);
            } else {
                throw new Error(`body: expects a name, symbol, or integer, but got: ${JSON.stringify(name)}`);
            }
            
            const def = dictionary[dictKey];
            if (def && 'body' in def) {
                s.push(def.body);
            } else {
                throw new Error(`body: '${nameForError}' is not a user-defined symbol or has no body.`);
            }
        },
        description: 'Pushes the body (quotation) of a user-defined function onto the stack. Expects the name of the function as a bare word.',
        effect: '[W] -> [[B]]'
    },
    examples: [
        { code: '(1 +) inc = inc body', expected: [[1, '+']] },
        { code: '(1 2 3) mylist = mylist body', expected: [[1, 2, 3]] },
        { code: '(42) 1 = 1 body', expected: [[42]] },
        { code: '("hi") :msg = :msg body', expected: [['hi']] },
    ]
};