import { operatorModules } from './operators';
import type { StackValue, YieldOptions, EvaluateFn, OperatorDefinition } from './types';

// --- Yield Interpreter Core ---
export const Yield = (() => {
    'use strict';
    
    const dictionary: { [key: string]: OperatorDefinition | { body: StackValue[], description: string, example: string } } = {}; 
    const dictionaryCategories = {};
    const builtInKeys = new Set<string>();
    const originalBuiltIns: { [key: string]: OperatorDefinition } = {};
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
            definitions[opKey] = categoryModule.definitions[opKey].definition;
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
        
        while (program.length) {
            let token = program.shift();

            // Handle aliases
            if (typeof token === 'string' && aliases[token]) {
                token = aliases[token];
            }
            
            if (options.isDebug && options.onToken) options.onToken(token, stack);
            
            // Handle literal strings created by the parser
            if (typeof token === 'string' && token.startsWith('\0')) {
                stack.push(token.slice(1));
                yield;
                continue;
            }

            let dictKey: string | undefined;
            if (typeof token === 'string' || typeof token === 'number') {
                dictKey = String(token);
            } else if (typeof token === 'symbol') {
                const key = Symbol.keyFor(token);
                if (key) {
                    dictKey = `:${key}`;
                }
            }
            
            if (dictKey !== undefined && dictionary[dictKey]) {
                // A word is a "name consumer" if it's an operator that takes the *name* of a
                // variable from the stack, rather than its value. This logic checks the *next*
                // token in the program to see if the current token should be treated as a name.
                const nameConsumers = new Set(['popto', 'appendTo', 'yield', 'body', 'popstackto']);
                const nextTokenRaw = program.length > 0 ? program[0] : null;
                const nextToken = (typeof nextTokenRaw === 'string' && aliases[nextTokenRaw]) ? aliases[nextTokenRaw] : nextTokenRaw;
                const isNameConsumer = nameConsumers.has(nextToken as string);

                if (isNameConsumer) {
                    stack.push(token);
                } else {
                    const def = dictionary[dictKey];
                    if ('body' in def) {
                        // Heuristic: A user-defined word is a function if its body contains a built-in operator.
                        // This is more robust than the previous check and correctly handles stateful functions.
                        const isFunction = Array.isArray(def.body) && def.body.flat(Infinity).some(t => {
                            if (typeof t !== 'string') return false;
                            const innerDef = dictionary[t];
                            return !!(innerDef && 'exec' in innerDef);
                        });
                        
                        if (isFunction) {
                                program.unshift(...def.body);
                        } else {
                            // Data variable. The value is the body itself.
                            // It was parsed, so it may contain literal markers that need cleaning.
                            const clean = (v) => Array.isArray(v) ? v.map(clean) : (typeof v === 'string' && v.startsWith('\0') ? v.slice(1) : v);

                            // Deep-clone to prevent operators like 'append' from mutating the definition.
                            const value = JSON.parse(JSON.stringify(def.body));
                            const cleanedValue = clean(value);
                            
                            // Unwrap single-element lists for more intuitive behavior with simple variables.
                            if (Array.isArray(cleanedValue) && cleanedValue.length === 1 && !Array.isArray(cleanedValue[0])) {
                                stack.push(cleanedValue[0]);
                            } else {
                                stack.push(cleanedValue);
                            }
                        }
                    } else {
                        // Built-in operator
                        yield* def.exec(stack, options, evaluate, dictionary);
                    }
                }
            } else {
                 // Any other token (number, list, un-quoted string not in dict) is pushed as data.
                 // We must clean lists of any internal literal markers before pushing.
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