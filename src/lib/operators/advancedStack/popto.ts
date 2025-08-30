import type { Operator } from '../../types';

export const popto: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const name = s.pop();
            let dictKey: string;
            let nameStrForExample: string;
            if (typeof name === 'symbol') {
                const key = Symbol.keyFor(name);
                if (!key) throw new Error(`popto: assignment to a non-global symbol is not supported.`);
                dictKey = `:${key}`;
                nameStrForExample = `:${key}`;
            } else if (typeof name === 'string' || typeof name === 'number') {
                dictKey = String(name);
                nameStrForExample = String(name);
            } else {
                throw new Error(`Assignment target must be a name, symbol, or integer, but got: ${JSON.stringify(name)}`);
            }
            const value = s.pop();

            dictionary[dictKey] = {
                body: Array.isArray(value) ? value : [value],
                description: "User-defined function/variable.",
                example: `... ${nameStrForExample} popto`
            };
        },
        description: 'Pops a value and a name, then assigns the value to the name. Alias: `=`. `... V N popto`',
        example: '[1 2 3 4] mylist =\n"hello" mygreeting popto',
        effect: '[... V N] -> [...]'
    },
    testCases: [
        { 
            code: [
                '1 2 3 4 "mylollipop" popto',
                'mylollipop'
            ],
            expected: [1, 2, 3, 4] 
        },
        {
            code: [
                '[10 20] :mylist popto',
                ':mylist'
            ],
            expected: [[10, 20]]
        },
        {
            code: [
                'true 1 popto',
                '1'
            ],
            expected: [true]
        },
        {
            code: [
                '42 myvar =',
                'myvar'
            ],
            expected: [42]
        }
    ]
};
