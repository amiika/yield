
import type { Operator, StackValue } from '../../types';

export const yieldOp: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const program = s.pop();
            const nameOrValue = s.pop();
            
            let dictKey: string | undefined;
            let isDictVar = false;
            let nameForError: string | undefined;
            
            // --- Determine Program to Run ---
            let programToRun = program;
            const programName = (typeof program === 'symbol') ? `:${Symbol.keyFor(program)}` : (typeof program === 'string' ? program : '');
            if(programName) {
                const programDef = dictionary[programName];
                // If the program is a name pointing to a data word (not defined with =>),
                // we must get its body to execute it.
                if (programDef && 'body' in programDef && (!Array.isArray(programDef.body) || programDef.body[programDef.body.length - 1] !== 'i')) {
                    programToRun = programDef.body;
                }
            }
            
            // --- Determine State to Evolve ---
            let definition;
            // Handle ((VALUE :NAME)) syntax for state declaration
            if (Array.isArray(nameOrValue) && nameOrValue.length === 2 && typeof nameOrValue[1] === 'symbol') {
                const stateValue = nameOrValue[0];
                const key = Symbol.keyFor(nameOrValue[1]);
                dictKey = `:${key}`;
                nameForError = dictKey;

                // Initialize the dictionary if it doesn't exist
                if (!dictionary[dictKey]) {
                    dictionary[dictKey] = { body: stateValue, description: "User-defined state variable.", example: "" };
                }
                isDictVar = true;
                definition = dictionary[dictKey];
            } else {
                 if (typeof nameOrValue === 'symbol') {
                    const key = Symbol.keyFor(nameOrValue);
                    if (key) {
                        dictKey = `:${key}`;
                        nameForError = dictKey;
                    }
                } else if (typeof nameOrValue === 'string' || typeof nameOrValue === 'number') {
                    dictKey = String(nameOrValue);
                    nameForError = dictKey;
                }
                definition = dictKey ? dictionary[dictKey] : undefined;
                if (definition && 'body' in definition) {
                    isDictVar = true;
                }
            }
            
            // --- Execute Evolution ---
            if (isDictVar && dictKey) {
                // Evolve a dictionary variable (stateful)
                const state = definition.body;
                const tempStack = Array.isArray(state) ? [...(state as StackValue[])] : [state];

                yield* evaluate(programToRun, tempStack, options);

                // Update the dictionary entry to ensure the change persists.
                dictionary[dictKey].body = tempStack.length === 1 ? tempStack[0] : tempStack;
                
                if (tempStack.length > 0) {
                    s.push(tempStack[tempStack.length - 1]);
                }
            } else {
                // Evolve an immediate value from the stack (stateless)
                const currentState = nameOrValue;
                
                if (Array.isArray(currentState)) {
                    // List is a single unit. The result replaces it.
                    const tempStack = [currentState];
                    yield* evaluate(programToRun, tempStack, options);
                    // Push the result, wrapping in a list if there are multiple values
                    if (tempStack.length > 1) {
                        s.push(tempStack);
                    } else {
                        s.push(...tempStack);
                    }
                } else {
                    // Non-list: dupdip behavior. Preserve original, push result.
                    s.push(currentState);
                    const tempStack = [currentState];
                    yield* evaluate(programToRun, tempStack, options);
                    s.push(...tempStack);
                }
            }
        },
        description: "A stateful generator combinator. It applies a program to a value or a named variable to evolve its state, then pushes the new top value onto the stack. Syntax: `variable_name_or_value program_name_or_quotation yield`.",
        effect: '[V_name P_name] -> [T]'
    },
    examples: [
        {
            code: '1 (1 +) yield',
            expected: [1, 2]
        },
        {
            code: '1 (1) yield',
            expected: [1, 1, 1]
        },
        {
            code: ['2 :foo =', ':foo (1 +) yield', ':foo'],
            expected: [3, 3]
        },
        {
            code: '1 (1 2) (dup +) yield',
            expected: [1, [2, 3, 3, 4]],
            expectedDescription: `To perform an outer-product sum on a list within yield, then proceed with 'dup' and '+'`
        },
        {
            code: [
                '0 :state =',
                '(succ) :combinator =',
                '(:state :combinator yield) next =>',
                'next next next',
            ],
            expected: [1, 2, 3] 
        },
        { 
            code: [
                '(1 1) :fib_state =',
                '(swap dupd +) :program =',
                '(:fib_state :program yield) :fib =>',
                ':fib :fib :fib :fib :fib',
            ],
            expected: [2, 3, 5, 8, 13]
        },
        {
            code: [
                '10 1 =',
                '1 (succ) yield'
            ],
            expected: [11]
        },
        {
            code: [
                '0 :state =',
                '(1 +) :combinator =',
                '(:state :combinator yield) :next =>',
                ':next :next :next'
            ],
            expected: [1, 2, 3]
        },
        {
            code: [
                '((0) (1 +) yield) next =>',
                'next next next'
            ],
            expected: [1, 2, 3]
        },
        {
            code: [
                '(0 (1 +) yield) next =>',
                'next next next'
            ],
            expected: [1, 2, 3]
        },
        {
            code: [
                '((1 1) (dupd swap + swap succ swap) yield) next_caterer =>',
                '1',
                '(next_caterer) 5 times'
            ],
            expected: [1, 2, 4, 7, 11, 16]
        }
    ]
};
