
import type { Operator, StackValue } from '../../types';

export const popto: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const name = s.pop();
            let dictKey: string;
            
            if (typeof name === 'symbol') {
                const key = Symbol.keyFor(name);
                if (!key) throw new Error(`popto: assignment to a non-global symbol is not supported.`);
                dictKey = `:${key}`;
            } else if (typeof name === 'string' || typeof name === 'number') {
                dictKey = String(name);
            } else {
                throw new Error(`Assignment target must be a name, symbol, or integer, but got: ${JSON.stringify(name)}`);
            }
            
            const value = s.pop();

            // The '=' operator is now for data only. It performs a simple assignment.
            // All special logic for generators has been moved to the '=>' (quote) operator.
            dictionary[dictKey] = {
                body: value,
                description: "User-defined function/variable.",
                example: "",
            };
        },
        description: 'Pops a value and a name, then assigns the value to the name in the dictionary. This is used to define data variables. Alias: `=`. `... V N popto`',
        effect: '[... V N] -> [...]'
    },
    examples: [
        { 
            // A variable holding a list should push the list, not spread it.
            replCode: ['(1 2 3 4) mylist =', 'mylist'],
            assert: (s) => s.length === 1 && Array.isArray(s[0]) && s[0].length === 4,
            expected: [[1, 2, 3, 4]] 
        },
        {
            // `my_three` body will be the number 3.
            replCode: ['1 2 + my_three =', 'my_three'],
            expected: [3]
        },
        {
            code: [
                '42 :mynum =',
                ':mynum'
            ],
            expected: [42]
        },
        {
            code: [
                '100 1 =',
                '1'
            ],
            expected: [100]
        },
        {
            // A word defined with '=' should push its body quotation, not execute it.
            replCode: ['(1 2 +) my_func =', 'my_func'],
            expected: [[1, 2, '+']]
        }
    ]
};