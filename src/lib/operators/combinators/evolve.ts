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
            if (!definition || !('body' in definition) || !Array.isArray(definition.body)) {
                throw new Error(`yield can only be applied to a user-defined list variable: '${nameForError}'.`);
            }
            
            // 1. Get a copy of the current state for evolution.
            const currentStateBody = [...definition.body];

            // 2. Evolve the state for the *next* call.
            // The temporary stack for evaluation starts with the current state.
            const tempStack = currentStateBody;
            yield* evaluate(program, tempStack, options);

            // 3. Update the variable with the result of the evolution.
            dictionary[dictKey] = { ...definition, body: tempStack };
            
            // 4. Push the *new* top-of-state to the main stack as the result.
            if (tempStack.length > 0) {
                s.push(tempStack[tempStack.length - 1]);
            }
        },
        description: 'A stateful generator combinator. It applies a program to a named list variable to evolve its state, then pushes the new top value of that variable onto the stack. Syntax: `program_name_or_quotation variable_name yield`.',
        effect: '[P_name V_name] -> [T]'
    },
    examples: [
        {
            code: [
                '0 counter_state =',
                '[succ] combinator =',
                '[combinator counter_state yield] next =',
                'next next next',
            ],
            expected: [1, 2, 3] 
        },
        { 
            code: [
                '0 1 fib_state =',
                '[swap dupd +] program =',
                '[program fib_state yield] fib =',
                'fib fib fib fib fib',
            ],
            expected: [0, 1, 2, 3, 5, 8]
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
                '[1] program =',
                '[program :log yield] logit =',
                'logit',
                'logit'
            ],
            expected: [1, 1]
        },
        {
            code: [
                '0 state =',
                '[1 +] combinator =',
                '[combinator state yield] next =',
                'next next next'
            ],
            expected: [1, 2, 3]
        },
        {
            code: [
                '0 :state =',
                '[1 +] :combinator =',
                '[:combinator :state yield] :next =',
                ':next :next :next'
            ],
            expected: [1, 2, 3]
        },
        {
            code: [
                '[[1 +] [0] yield] next =',
                'next next next'
            ],
            expected: [1, 2, 3]
        },
        {
            code: [
                '[[1 +] 0 yield] next =',
                'next next next'
            ],
            expected: [1, 2, 3]
        }
    ]
};