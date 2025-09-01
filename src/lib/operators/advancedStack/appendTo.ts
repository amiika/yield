import type { Operator } from '../../types';

export const appendTo: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const name = s.pop();
            let dictKey: string;
            let nameForError: string;

            if (typeof name === 'symbol') {
                const key = Symbol.keyFor(name);
                if (!key) throw new Error(`appendTo: assignment to a non-global symbol is not supported.`);
                dictKey = `:${key}`;
                nameForError = `:${key}`;
            } else if (typeof name === 'string' || typeof name === 'number') {
                dictKey = String(name);
                nameForError = String(name);
            } else {
                throw new Error(`appendTo: target must be a name, symbol, or integer, but got: ${JSON.stringify(name)}`);
            }

            const value = s.pop();
            const definition = dictionary[dictKey];

            if (!definition) {
                // If it doesn't exist, create it as a list with the value.
                dictionary[dictKey] = { body: [value], description: "User-defined variable.", effect: '... -> ...' };
            } else if ('body' in definition) {
                if (!Array.isArray(definition.body)) {
                    throw new Error(`Cannot append to non-list definition: '${nameForError}'. Use 'popto' or '=' to overwrite.`);
                }
                // Mutate the existing body list
                definition.body.push(value);
            } else {
                // It's a built-in, can't append.
                throw new Error(`Cannot append to built-in function: '${nameForError}'.`);
            }
        },
        description: 'Pops a value and a name, then appends the value to the list variable associated with the name. Creates the variable if it does not exist. Alias: `<-`.',
        effect: '[... V N] -> [...]'
    },
    examples: [
        {
            code: [
                '[] mylist =',
                '10 mylist appendTo',
                '20 mylist <-',
                'mylist'
            ],
            expected: [[10, 20]]
        },
        {
            code: [
                '10 newlog <-', // Should create newlog with body [10]
                '20 newlog <-',
                'newlog'
            ],
            expected: [[10, 20]]
        },
        {
            code: [
                '42 :mynum <-', // Should create :mynum with body [42]
                ':mynum'
            ],
            expected: [42]
        }
    ]
};