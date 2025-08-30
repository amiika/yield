import type { Operator } from '../../types';

export const yieldOp: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const name = s.pop();
            const program = s.pop();
            
            let dictKey: string;
            let nameForError: string;

            if (typeof name === 'symbol') {
                const key = Symbol.keyFor(name);
                if (!key) throw new Error(`yield: cannot yield to a non-global symbol.`);
                dictKey = `:${key}`;
                nameForError = `:${key}`;
            } else if (typeof name === 'string' || typeof name === 'number') {
                dictKey = String(name);
                nameForError = String(name);
            } else {
                throw new Error(`yield expects a name, symbol, or integer, but got: ${JSON.stringify(name)}`);
            }
            
            const definition = dictionary[dictKey];
            if (!definition || 'exec' in definition || !Array.isArray(definition.body)) {
                throw new Error(`yield can only be applied to a user-defined list variable: '${nameForError}'.`);
            }
            
            // 1. Spread the variable's contents onto a temporary stack.
            const tempStack = [...definition.body];
            
            // 2. Apply the program.
            yield* evaluate(program, tempStack, options);

            // 3. Update the variable with the result.
            dictionary[dictKey] = { ...definition, body: tempStack };

            // 4. Push the new top-of-state to the main stack as the result.
            if (tempStack.length > 0) {
                s.push(tempStack[tempStack.length - 1]);
            }
        },
        description: 'A stateful function combinator. Spreads the contents of a named list variable, applies a program to them, updates the variable with the result, and pushes the new top-of-state to the main stack. Syntax: `[program] variable_name yield`.',
        example: `# Stateful Counter
[0] counter =
[ [succ] counter yield ] next =
next next next`,
        effect: '[[P] W] -> [T]'
    },
    testCases: [
        {
            code: [
                '[0] counter_state =',
                '[ [succ] counter_state yield ] next =',
                'next next next',
            ],
            expected: [1, 2, 3] 
        },
        { 
            code: [
                '[0 1] fib_state =',
                '[ [swap dupd +] fib_state yield ] fib =',
                'fib fib fib fib fib',
            ],
            expected: [1, 2, 3, 5, 8]
        },
        {
            code: [
                '10 1 =',
                '[succ] 1 yield'
            ],
            expected: [11]
        },
        {
            code: [
                '[] :log =',
                // This pattern prepends to the logical stack by appending to the list representation
                // e.g., stack [1] -> list [1] -> list [1, 2] -> stack [2, 1] (top is 1)
                '[ stack 1 append unstack ] :log yield', // state becomes [1], pushes 1
                '[ stack 2 append unstack ] :log yield'  // state becomes [2, 1], pushes 1
            ],
            expected: [1, 1]
        }
    ]
};