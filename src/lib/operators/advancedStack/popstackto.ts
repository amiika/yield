import type { Operator } from '../../types';

export const popstackto: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const name = s.pop();
            let dictKey: string;
            let nameStrForExample: string;
            if (typeof name === 'symbol') {
                const key = Symbol.keyFor(name);
                if (!key) throw new Error(`popstackto: assignment to a non-global symbol is not supported.`);
                dictKey = `:${key}`;
                nameStrForExample = `:${key}`;
            } else if (typeof name === 'string' || typeof name === 'number') {
                dictKey = String(name);
                nameStrForExample = String(name);
            } else {
                throw new Error(`Assignment target must be a name, symbol, or integer, but got: ${JSON.stringify(name)}`);
            }
            
            const stackValue = [...s];
            s.length = 0; // Clear the stack

            dictionary[dictKey] = {
                body: stackValue,
                description: "User-defined function/variable.",
                example: `... ${nameStrForExample} popstackto`
            };
        },
        description: 'Pops a name, assigns the entire rest of the stack as a list to that name, and then clears the stack. `... N popstackto`',
        example: '1 2 3 4 allmine popstackto',
        effect: '[... N] -> []'
    },
    testCases: [
        { 
            code: [
                '1 2 3 4 "allmine" popstackto',
                'allmine'
            ],
            expected: [[1, 2, 3, 4]]
        },
        {
            code: [
                '1 2 :allmine popstackto',
                ':allmine'
            ],
            expected: [[1, 2]]
        },
        {
            code: [
                '1 2 3 1 popstackto',
                '1'
            ],
            expected: [[1, 2, 3]]
        }
    ]
};