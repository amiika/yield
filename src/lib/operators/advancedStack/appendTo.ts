


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
                // If it doesn't exist, create it with the primitive value.
                dictionary[dictKey] = { body: value, description: "User-defined variable.", example: "" };
            } else if ('body' in definition) {
                if (!Array.isArray(definition.body)) {
                    // Auto-promote the scalar value to a list
                    definition.body = [definition.body, value];
                } else {
                    // It's already a list, mutate it.
                    definition.body.push(value);
                }
            } else {
                // It's a built-in, can't append.
                throw new Error(`Cannot append to built-in function: '${nameForError}'.`);
            }
        },
        description: 'Pops a value and a name, then appends the value to the list variable associated with the name. If the variable exists but is not a list, it is automatically converted to a list. Creates the variable if it does not exist. Alias: `<-`.',
        effect: '[... V N] -> [...]'
    },
    examples: [
        {
            code: [
                '() mylist =',
                '10 mylist appendTo',
                '20 mylist <-',
                'mylist'
            ],
            expected: [[10, 20]]
        },
        {
            code: [
                '10 newlog <-', // Should create newlog with body 10
                '20 newlog <-', // Should convert newlog to [10, 20]
                'newlog'
            ],
            expected: [[10, 20]]
        },
        {
            code: [
                '42 :mynum <-',
                ':mynum'
            ],
            expected: [42]
        },
        {
            code: [
                '1 foo =',   // foo is the number 1
                '2 foo <-',  // Should convert foo to [1, 2]
                'foo'
            ],
            expected: [[1, 2]]
        }
    ]
};