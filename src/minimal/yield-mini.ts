/**
 * Yield Mini Interpreter
 *
 * A self-contained, minimal, stack-based concatenative language interpreter.
 * This file is designed to be easily portable to any JavaScript environment.
 * It includes the parser, the core evaluation loop, and a minimal set of
 * primitive operators from which more complex ones can be built.
 *
 * How it works:
 * 1. `parse(code)`: Converts a string of code into a list of tokens (numbers, strings, and sub-lists for quotations).
 * 2. `run(program, stack)`: Executes the parsed program in a simple, blocking loop.
 * 3. `evaluate(program, stack)`: A generator function that steps through the program one token at a time.
 *    - If a token is a literal (number, string), it's pushed onto the stack.
 *    - If a token is a word found in the dictionary, its associated function is executed.
 *    - Quotations `(...)` are pushed as lists, to be executed by other operators (combinators).
 */

// --- Types ---

// Any value that can be on the stack.
type StackValue = any;

// The type for the core evaluation generator function.
type EvaluateFn = (program: StackValue | StackValue[], stack: StackValue[], options?: YieldOptions) => Generator;

// The definition of a built-in operator.
interface OperatorDefinition {
    exec: (stack: StackValue[], options: YieldOptions, evaluate: EvaluateFn, dictionary: { [key: string]: any }) => Generator;
}

// The full operator object, containing its definition.
interface Operator {
    definition: OperatorDefinition;
}

// Options passed to the interpreter during a run.
interface YieldOptions {
    parse?: (code: string) => StackValue[];
    run?: (program: StackValue[], stack: StackValue[], options?: YieldOptions) => void;
    onOutput?: (output: string) => void;
    dictionary?: { [key: string]: any };
}

// --- Minimal Operators ---
// This includes the core set and a few "bridge" operators for basic functionality.
const minimalOperators: { [key: string]: Operator } = {
    // Core Stack
    pop: { definition: { exec: function*(s) { s.pop(); } } },
    dup: { definition: { exec: function*(s) { s.push(s[s.length - 1]); } } },
    swap: { definition: { exec: function*(s) { s.push(s.pop(), s.pop()); } } },
    list: { definition: { exec: function*(s) { const stack = [...s]; s.length = 0; s.push(stack); } } },
    clear: { definition: { exec: function*(s) { s.length = 0; } } },
    // Core List
    cons: { definition: { exec: function*(s) { const l = s.pop(); const e = s.pop(); if (!Array.isArray(l)) throw new Error('cons expects a list'); s.push([e, ...l]); } } },
    uncons: { definition: { exec: function*(s) { const l = s.pop(); if (!Array.isArray(l)) throw new Error('uncons expects a list'); const [h, ...t] = l; s.push(h, t); } } },
    // Core Execution
    iterate: { definition: { exec: function*(s, options, evaluate) { const p = s.pop(); yield* evaluate(p, s, options); } } },
    ifte: { definition: { exec: function*(s, options, evaluate) { const f = s.pop(); const t = s.pop(); yield* evaluate(s.pop() ? t : f, s, options); } } },
    eval: { definition: { exec: function*(s, options, evaluate) { const code = s.pop(); yield* evaluate(typeof code === 'string' ? options.parse(code) : code, s, options); } } },
    // Core Definitions
    popto: { definition: { exec: function*(s, options, evaluate, dictionary) { const name = String(s.pop()); const value = s.pop(); dictionary[name] = { body: value }; } } },
    quote: { definition: { exec: function*(s, options, evaluate, dictionary) { const name = String(s.pop()); const value = s.pop(); dictionary[name] = { body: [value, 'iterate'] }; } } },
    // Bridge: Arithmetic
    add: { definition: { exec: function*(s) { const b = s.pop() ?? 0; const a = s.pop() ?? 0; s.push(a + b); } } },
    subtract: { definition: { exec: function*(s) { const b = s.pop() ?? 0; const a = s.pop() ?? 0; s.push(a - b); } } },
    multiply: { definition: { exec: function*(s) { const b = s.pop() ?? 0; const a = s.pop() ?? 0; s.push(a * b); } } },
    divide: { definition: { exec: function*(s) { const b = s.pop() ?? 1; const a = s.pop() ?? 0; s.push(a / b); } } },
    // Bridge: Predicates
    equal: { definition: { exec: function*(s) { const b = s.pop(); const a = s.pop(); s.push(JSON.stringify(a) === JSON.stringify(b)); } } },
    greaterThan: { definition: { exec: function*(s) { const b = s.pop(); const a = s.pop(); s.push(a > b); } } },
    lessThan: { definition: { exec: function*(s) { const b = s.pop(); const a = s.pop(); s.push(a < b); } } },
    'integer?': { definition: { exec: function*(s) { s.push(Number.isInteger(s.pop())); } } },
    // Bridge: Literals
    'true': { definition: { exec: function*(s) { s.push(true); } } },
    'false': { definition: { exec: function*(s) { s.push(false); } } },
};

// --- Yield Interpreter Core ---
export const Yield = (() => {
    'use strict';
    
    // The dictionary holds all defined words, both built-in and user-defined.
    const dictionary: { [key: string]: Operator | { body: StackValue } } = {};
    const builtInKeys = new Set<string>();
    const originalBuiltIns: { [key: string]: Operator } = {};
    // Aliases provide convenient shorthand for common operators.
    const aliases: { [key: string]: string } = {
        '=': 'popto', '=>': 'quote', '?': 'ifte', 'i': 'iterate', '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide', '==': 'equal', '>': 'greaterThan', '<': 'lessThan'
    };
    
    // Initialize the dictionary with the minimal operator set.
    Object.assign(dictionary, minimalOperators);
    Object.assign(originalBuiltIns, minimalOperators);
    Object.keys(dictionary).forEach(key => builtInKeys.add(key));

    /**
     * Resets the interpreter to its initial state, clearing all user-defined words.
     */
    const reset = () => {
        Object.keys(dictionary).forEach(key => { if (!builtInKeys.has(key)) delete dictionary[key]; });
    };

    /**
     * Parses a string of code into an executable program (a list of tokens).
     * Handles numbers, strings, words, and nested quotations `(...)`.
     * @param code The raw source code string.
     * @returns A list of stack values representing the program.
     */
    const parse = (code: string): StackValue[] => {
        const cleanCode = code.replace(/#.*$/gm, ''); // Remove comments
        const tokens = cleanCode.match(/\(|\)|"[^"]*"|[^\s()]+/g) || [];
        
        // Recursive decent parser to build nested lists for quotations.
        const build = (): StackValue[] => {
            const program: StackValue[] = [];
            while (tokens.length > 0) {
                const token = tokens.shift();
                if (token === ')') return program;
                if (token === '(') { 
                    program.push(build()); 
                } else if (token.startsWith('"') && token.endsWith('"')) { 
                    // Prefix with \0 to mark as a literal string that shouldn't be executed.
                    program.push(`\0${token.slice(1, -1)}`); 
                } else { 
                    const num = parseFloat(token); 
                    program.push(!isNaN(num) && isFinite(token as any) ? num : token); 
                }
            }
            return program;
        };
        return build();
    };
    
    /**
     * The core evaluation generator. Steps through a program, manipulating the stack.
     * This is a generator function to allow for future extensions like debugging and cooperative multitasking.
     * @param program The program to execute (a list of tokens).
     * @param stack The data stack to operate on.
     * @param options Additional options for the run.
     */
    const evaluate: EvaluateFn = function* (program, stack, options = {}) {
        program = Array.isArray(program) ? [...program] : [program];
        const dict = options.dictionary || dictionary;

        while (program.length > 0) {
            let token = program.shift();
            
            // Resolve aliases first.
            if (typeof token === 'string' && aliases[token]) token = aliases[token];
            
            // Handle literal strings (marked with \0 by the parser).
            if (typeof token === 'string' && token.startsWith('\0')) { 
                stack.push(token.slice(1)); 
                continue; 
            }

            const def = (typeof token === 'string' || typeof token === 'number') ? dict[String(token)] : undefined;
            let execute = false;

            if (def) {
                execute = true;
                // Lookahead: If the next token is a defining operator, treat the current token as data.
                const nameConsumers = new Set(['popto', 'quote']);
                if (program.length > 0) {
                    let nextToken = program[0];
                    if (typeof nextToken === 'string' && aliases[nextToken]) nextToken = aliases[nextToken];
                    if (nameConsumers.has(nextToken as string)) execute = false;
                }
            }
            
            if (execute) {
                if ('definition' in def) { // It's a built-in operator.
                    yield* def.definition.exec(stack, { ...options }, evaluate, dict);
                } else { // It's a user-defined word.
                    const body = def.body;
                    // Check if it's a function (defined with =>) or just data (defined with =).
                    if (Array.isArray(body) && body[body.length - 1] === 'iterate') {
                        // It's a function, unwrap and prepend its body to the program.
                        program.unshift(...body);
                    } else {
                        // It's data, push its body onto the stack.
                        stack.push(body);
                    }
                }
            } else {
                // Not in dictionary or being defined, so it's a literal value.
                stack.push(token);
            }
        }
    };

    /**
     * Runs a program to completion.
     * @param program The parsed program to execute.
     * @param stack The data stack to operate on.
     * @param options Additional options for the run.
     */
    const run = (program: StackValue[], stack: StackValue[], options: YieldOptions = {}) => {
        // Always include the interpreter's own parse and run functions in the options.
        const augmentedOptions: YieldOptions = { ...options, dictionary, parse, run };
        const iterator = evaluate(program, stack, augmentedOptions);
        // Simple, blocking run loop. Drains the generator.
        while(!iterator.next().done) {}
    };

    return { dictionary, builtInKeys, aliases, parse, run, reset };
})();

/**
 * A shorthand function to evaluate a Yield program string.
 * It creates a fresh stack, runs the code, and returns the final stack.
 * @param code The Yield program to execute.
 * @param initialStack An optional initial stack.
 * @returns The final stack after execution.
 */
export const yield_ = (code: string, initialStack: StackValue[] = []): StackValue[] => {
    const stack = [...initialStack]; // Work on a copy
    const program = Yield.parse(code);
    Yield.run(program, stack);
    return stack;
};
