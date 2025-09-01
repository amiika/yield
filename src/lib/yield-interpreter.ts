import { operatorModules } from './operators';
import type { StackValue, YieldOptions, EvaluateFn, OperatorDefinition, Operator } from './types';
import { deepClone } from './utils';

// --- Yield Interpreter Core ---
export const Yield = (() => {
    'use strict';
    
    const dictionary: { [key: string]: Operator | { body: StackValue[], description: string, example: string } } = {}; 
    const dictionaryCategories = {};
    const builtInKeys = new Set<string>();
    const originalBuiltIns: { [key: string]: Operator } = {};
    const aliases: { [key: string]: string } = {
        '=': 'popto',
        '<-': 'appendTo'
    };

    // --- Dictionary and Category Assembly ---
    // Dynamically build the dictionaries from the granular operator modules.
    for (const categoryKey in operatorModules) {
        const categoryModule = operatorModules[categoryKey];
        const definitions = {};
        for (const opKey in categoryModule.definitions) {
            // Store the full operator object, not just the definition
            definitions[opKey] = categoryModule.definitions[opKey];
        }
        Object.assign(dictionary, definitions);
        Object.assign(originalBuiltIns, definitions); // Store a pristine copy of built-ins

        dictionaryCategories[categoryKey] = {
            name: categoryModule.name,
            description: categoryModule.description,
            definitions: definitions,
        };
    }
    Object.keys(dictionary).forEach(key => builtInKeys.add(key));

    const combinatorKeys = new Set([
        ...Object.keys(operatorModules.combinators.definitions),
        ...Object.keys(operatorModules.recursion.definitions)
    ]);

    // --- Core Interpreter Logic ---
    const parse = (code: string): StackValue[] => {
        const cleanCode = code.replace(/\(\*.*?\*\)/gs, '').replace(/#.*/g, '');
        // This regex correctly tokenizes by separating brackets, braces, quoted strings,
        // symbols (like :word), and any other sequence of non-whitespace characters.
        const tokenizerRegex = /\[|\]|\{|\}|"[^"]*"|:[^\s\[\]{}"]+|[^\[\]{}\s]+/g;
        const tokens = cleanCode.match(tokenizerRegex) || [];

        const build = (): StackValue[] => {
            const program: StackValue[] = [];
            while (tokens.length > 0) {
                const token = tokens.shift();
                if (token === ']' || token === '}') return program;
                
                if (token === '[') {
                    program.push(build());
                } else if (token === '{') {
                    const setTokens = build();
                    // Joy sets are typically of small non-negative integers.
                    const setValues = setTokens.map(t => typeof t === 'number' ? t : 0);
                    program.push(new Set(setValues));
                }
                else if (token.startsWith('"') && token.endsWith('"')) {
                    // Prefix with \0 to mark as a literal string that should not be executed,
                    // even if its content matches an operator name.
                    program.push(`\0${token.slice(1, -1)}`);
                } else if (token.startsWith(':')) {
                    program.push(Symbol.for(token.slice(1))); // Add as a global symbol
                }
                else {
                    const num = parseFloat(token);
                    program.push(!isNaN(num) && isFinite(token as any) ? num : token);
                }
            }
            return program;
        };
        return build();
    };
    
    // This is the core evaluation generator. It is passed into operators that need it.
    const evaluate: EvaluateFn = function* (program, stack, options = {}) {
        program = Array.isArray(program) ? [...program] : [program];
        
        while (program.length > 0) {
            let token = program.shift();

            // 1. ALIASES
            if (typeof token === 'string' && aliases[token]) {
                token = aliases[token];
            }
            
            // 2. DEBUG HOOK
            if (options.isDebug && options.onToken) options.onToken(token, stack);
            
            // 3. LITERAL STRINGS
            if (typeof token === 'string' && token.startsWith('\0')) {
                stack.push(token.slice(1));
                yield;
                continue;
            }

            // 4. DECISION POINT: EXECUTE or PUSH AS DATA?
            // FIX: Corrected the type of `dictKey` from `string | symbol | undefined` to `string | undefined` to match the implementation where symbols are converted to string keys before dictionary access. This resolves the "Type 'symbol' cannot be used as an index type" error.
            let dictKey: string | undefined;
            if (typeof token === 'string' || typeof token === 'number') {
                dictKey = String(token);
            } else if (typeof token === 'symbol') {
                const key = Symbol.keyFor(token);
                if (key) dictKey = `:${key}`;
            }

            const def = dictKey ? dictionary[dictKey] : undefined;
            let execute = false;

            if (def) {
                // It's in the dictionary. Default is to execute.
                execute = true;

                // --- CONTEXT CHECK (Lookahead) ---
                // We should NOT execute if the token is being used as data for an upcoming operator.
                const nameConsumers = new Set(['popto', 'appendTo', 'yield', 'body', 'popstackto']);
                const assignmentOps = new Set(['popto', 'appendTo', 'popstackto']);

                let nextTokenRaw = program.length > 0 ? program[0] : null;
                let nextNextTokenRaw = program.length > 1 ? program[1] : null;

                let nextToken = (typeof nextTokenRaw === 'string' && aliases[nextTokenRaw]) ? aliases[nextTokenRaw] : nextTokenRaw;
                let nextNextToken = (typeof nextNextTokenRaw === 'string' && aliases[nextNextTokenRaw]) ? aliases[nextNextTokenRaw] : nextNextTokenRaw;
                
                // Rule 1: The token is a NAME for the next operator. e.g., `... + =`
                if (nameConsumers.has(nextToken as string)) {
                    execute = false;
                }
                // Rule 2: The token is a VALUE for an operator two steps ahead. e.g., `- + =`
                else if (assignmentOps.has(nextNextToken as string)) {
                    execute = false;
                }
            }
            
            // 5. ACTION
            if (execute) {
                if ('definition' in def) { // Built-in
                    yield* def.definition.exec(stack, options, evaluate, dictionary);
                } else { // User-defined
                    // This is the existing, complex but tested heuristic for distinguishing
                    // functions from variables, which is needed to handle list variables correctly.
                     const body = def.body;
                    let isFunction = false;
                    
                    if (Array.isArray(body) && body.length > 0) {
                        const lastToken = body[body.length - 1];
                        if (typeof lastToken === 'string' && combinatorKeys.has(lastToken)) {
                            isFunction = true;
                        } else {
                            const hasBuiltIn = body.flat(Infinity).some(t => {
                                if (typeof t !== 'string') return false;
                                const innerDef = dictionary[t];
                                return !!(innerDef && 'definition' in innerDef);
                            });
                            
                            const isSingleOperatorQuotation = body.length === 1 && hasBuiltIn;
                            
                            if (hasBuiltIn && !isSingleOperatorQuotation) {
                                isFunction = true;
                            }
                        }
                    }

                    if (isFunction) {
                        program.unshift(...def.body);
                    } else {
                        if (body.length === 1 && (typeof body[0] !== 'object' || body[0] === null)) {
                            program.unshift(body[0]);
                        } else {
                            const value = deepClone(def.body);
                            const clean = (v) => Array.isArray(v) ? v.map(clean) : (typeof v === 'string' && v.startsWith('\0') ? v.slice(1) : v);
                            const cleanedValue = clean(value);
                            stack.push(cleanedValue);
                        }
                    }
                }
            } else {
                // Push token as data.
                if (Array.isArray(token)) {
                    const clean = (t) => Array.isArray(t) ? t.map(clean) : (typeof t === 'string' && t.startsWith('\0') ? t.slice(1) : t);
                    stack.push(clean(token));
                } else {
                    stack.push(token);
                }
            }
            
            yield;
        }
    };

    const run = (program: StackValue[], stack: StackValue[], options: YieldOptions = {}) => {
        // Add the interpreter's parse function to the options for operators that need it.
        const augmentedOptions = { ...options, parse };
        const { stopSignal = { stopped: false }, pauseSignal = { paused: false }, onStep = () => {}, getDelay = () => augmentedOptions.delay || 0, isDebug = false } = augmentedOptions;
        
        return new Promise<void>((resolve, reject) => {
            const iterator = evaluate(program, stack, augmentedOptions);
            const step = () => {
                try {
                    if (stopSignal.stopped) return resolve(); 
                    if (pauseSignal.paused) {
                        if (augmentedOptions.setResume) augmentedOptions.setResume(step);
                        return; 
                    }
                    const chunkSize = isDebug ? 1 : 1000;
                    for (let i = 0; i < chunkSize; i++) {
                        const result = iterator.next();
                        if (result.done) {
                            if (isDebug) onStep(stack);
                            return resolve();
                        }
                    }
                    if (isDebug) onStep(stack);
                    setTimeout(step, getDelay()); 
                } catch (e) {
                    reject(e);
                }
            };
            if (augmentedOptions.setResume) augmentedOptions.setResume(step);
            step();
        });
    };

    const reset = () => {
        // Remove all user-defined words.
        Object.keys(dictionary).forEach(key => {
            if (!builtInKeys.has(key)) {
                delete dictionary[key];
            }
        });
        // Restore all built-in operators to their original definitions,
        // in case any were overwritten by a user definition.
        Object.assign(dictionary, originalBuiltIns);
    };
    
    return { parse, run, reset, dictionary, dictionaryCategories, builtInKeys };
})();