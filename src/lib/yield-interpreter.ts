
import { operatorModules } from './operators';
import type { StackValue, YieldOptions, EvaluateFn, Operator, LiveLoopDef, UntilDef, UntilProcess } from './types';
import { deepClone, yieldFormatter } from './utils';
import { audioEngine } from './audio/AudioEngine';

// --- Yield Interpreter Core ---
export const Yield = (() => {
    'use strict';
    
    const dictionary: { [key: string]: Operator | { body: StackValue, description: string, example: string, [key: string]: any } } = {}; 
    const dictionaryCategories = {};
    const builtInKeys = new Set<string>();
    const originalBuiltIns: { [key: string]: Operator } = {};
    const aliases: { [key: string]: string } = {
        '=': 'popto',
        '=>': 'quote',
        '<-': 'appendTo',
        '?': 'ifte',
        '++': 'succ',
        '--': 'pred',
        'avg': 'average',
        '..': 'range',
        ':': 'dup',
        '@': 'curl',
        'π': 'pi',
        'ℯ': 'euler',
    };

    let namelessLiveCounter = 1;
    let namelessUntilCounter = 1;

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
    
    // FIX: Add a reset function to restore the interpreter's state.
    const reset = () => {
        // Clear all properties from the dictionary object.
        Object.keys(dictionary).forEach(key => delete dictionary[key]);
        // Re-add all original built-in operators.
        Object.assign(dictionary, originalBuiltIns);
        namelessUntilCounter = 1;
        namelessLiveCounter = 1;
    };

    // --- Core Interpreter Logic ---
    const parse = (code: string): StackValue[] => {
        const lines = code.split('\n');
        const processedLines = lines.map(line => {
            let processedLine = line;
            // Handle '@' syntax anywhere on the line
            const curlIndex = line.indexOf('@');
            
            if (curlIndex !== -1) {
                const prefix = line.substring(0, curlIndex);
                const suffix = line.substring(curlIndex + 1).trim();

                const definingOperatorRegex = /\s+([^\s()]+)\s+(=|=>|<-|popto|quote|appendTo)$/;
                const match = suffix.match(definingOperatorRegex);

                if (match) {
                    const body = suffix.substring(0, match.index).trim();
                    const definitionPart = match[0];
                    processedLine = `${prefix} (${body})${definitionPart}`;
                } else {
                    processedLine = `${prefix} (${suffix})`;
                }
            }
            return processedLine;
        });
        const processedCode = processedLines.join('\n');

        // This regex only removes comments that start a line or are preceded by whitespace.
        const cleanCode = processedCode.replace(/(^|\s)#.*$/gm, '$1');
        // This regex correctly tokenizes by separating parentheses, braces, quoted strings,
        // symbols (like :word), and any other sequence of non-whitespace characters.
        const tokenizerRegex = /\(|\)|\{|\}|"[^"]*"|:[^\s\(\){}"]+|[^\(\){}\s]+/g;
        const tokens = cleanCode.match(tokenizerRegex) || [];

        const build = (): StackValue[] => {
            const program: StackValue[] = [];
            while (tokens.length > 0) {
                const token = tokens.shift();
                if (token === ')') return program;
                
                if (token === '(') {
                    program.push(build());
                }
                else if (token.startsWith('"') && token.endsWith('"')) {
                    // Prefix with \0 to mark as a literal string that should not be executed,
                    // even if its content matches an operator name.
                    program.push(`\0${token.slice(1, -1)}`);
                } else if (token.startsWith(':')) {
                    if (token.length > 1) {
                        program.push(Symbol.for(token.slice(1))); // Add as a global symbol
                    } else {
                        program.push(token); // Push ':' as a string for aliasing
                    }
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
    
    // NEW: Helper function to encapsulate the logic for starting a live loop.
    const startLiveLoop = (dictKey: string, loopDef: LiveLoopDef, dictionary: { [key: string]: any }, options: YieldOptions) => {
        const { beatValue } = loopDef;
        
        // Update the definition in the dictionary to store the active live-loop-def object.
        // This is crucial for live updates, as the callback function will read the
        // latest definition from the dictionary on each tick. This handles both named
        // loops (defined with =>) and nameless loops.
        if (dictKey) {
            const originalDefinition = dictionary[dictKey];
            dictionary[dictKey] = { ...originalDefinition, body: loopDef };
        }
                        
        const loopsListKey = ':loops';
        const loopsDef = dictionary[loopsListKey];
        if (!loopsDef || !('body' in loopsDef) || !Array.isArray(loopsDef.body)) {
            dictionary[loopsListKey] = { body: [], description: "List of active live loops.", example: "" };
        }
        
        const loopsListBody = (dictionary[loopsListKey] as { body: StackValue }).body;
        if (!Array.isArray(loopsListBody)) {
            throw new Error(":loops variable has been overwritten with a non-list value.");
        }
        const loopsList = loopsListBody as string[];

        if (!loopsList.includes(dictKey)) {
            loopsList.push(dictKey);
        }
        
        audioEngine.cancel(dictKey); // Stop any previous loop with the same name.

        let nextBeatTime = audioEngine.getContextTime();
        
        const callback = async (tickTime: number) => {
            const currentLoopsDef = dictionary[loopsListKey];
            const currentLoopsBody = (currentLoopsDef && 'body' in currentLoopsDef) ? currentLoopsDef.body : [];
            if (!Array.isArray(currentLoopsBody) || !currentLoopsBody.includes(dictKey)) {
                return; // Loop has been stopped
            }
            
            const stopLoop = (errorMessage?: string) => {
                if (errorMessage && options.onAsyncOutput) {
                    const loopName = dictKey.startsWith(':') ? dictKey : `:${dictKey}`;
                    options.onAsyncOutput(`\nError in live loop ${loopName}: ${errorMessage}. Loop stopped.\n`, true);
                }
                const index = (dictionary[loopsListKey].body as string[]).indexOf(dictKey);
                if (index > -1) {
                    (dictionary[loopsListKey].body as string[]).splice(index, 1);
                }
            };

            // 1. LIVE UPDATE: Get the latest definition from the dictionary.
            const latestDef = dictionary[dictKey];
            if (!latestDef || !('body' in latestDef) || latestDef.body?.type !== 'live-loop-def') {
                if (options.onAsyncOutput) {
                    options.onAsyncOutput(`Live loop '${dictKey}' stopped because its definition changed to a non-loop value.`, false);
                }
                stopLoop();
                return;
            }
            
            const latestQuotation = latestDef.body.quotation;
            if (!Array.isArray(latestQuotation)) {
                stopLoop(`Live loop '${dictKey}' has an invalid quotation body.`);
                return;
            }

            // 2. RUN the latest quotation on the MAIN stack.
            const mainStack = options.mainStack;
            if (!mainStack) {
                stopLoop("Live loop cannot run without a main stack context.");
                return;
            }
            
            try {
                // The `run` function will now operate directly on the main REPL stack.
                await options.run(latestQuotation, mainStack, { ...options, onOutput: options.onAsyncOutput, isDebug: false });
                
                // Emit a generic tick for UI updates
                if (options.onAsyncOutput) {
                    options.onAsyncOutput('YIELD_TICK', false);
                }

            } catch(e) {
                stopLoop(e.message);
                return; // Stop on error
            }
            
            // 3. RESCHEDULE for the next beat.
            const tempoDef = dictionary[':tempo'];
            const bpm = (tempoDef && 'body' in tempoDef && typeof tempoDef.body === 'number' ? tempoDef.body : 120) as number;
            const beatDuration = (60.0 / bpm) * beatValue;

            nextBeatTime += beatDuration;

            // Catch-up logic in case of long-running operations
            if (nextBeatTime < audioEngine.getContextTime()) {
                nextBeatTime = audioEngine.getContextTime() + beatDuration;
            }
            
            // Check again if it's been stopped before rescheduling
            if ((dictionary[loopsListKey].body as string[]).includes(dictKey)) {
                audioEngine.schedule(dictKey, nextBeatTime, callback);
            }
        };
        
        audioEngine.schedule(dictKey, nextBeatTime, callback);
    };

    const startUntilLoop = (dictKey: string, untilDef: UntilDef, dictionary: { [key: string]: any }, options: YieldOptions) => {
        const tempoDef = dictionary[':tempo'];
        const bpm = (tempoDef && 'body' in tempoDef && typeof tempoDef.body === 'number' ? tempoDef.body : 120) as number;
        const secondsPerBeat = 60.0 / bpm;
        const intervalSeconds = untilDef.intervalBeats * secondsPerBeat;
        const endSeconds = untilDef.endBeats * secondsPerBeat;
        const startTime = audioEngine.getContextTime();

        const processState: UntilProcess = {
            type: 'until-process',
            quotation: untilDef.quotation,
            intervalBeats: untilDef.intervalBeats,
            endBeats: untilDef.endBeats,
            results: [],
            isTemporary: !!untilDef.isTemporary,
        };
        
        const originalDefinition = dictionary[dictKey];
        dictionary[dictKey] = { ...originalDefinition, body: processState };

        const mainStack = options.mainStack;
        if (!mainStack) {
             if (options.onAsyncOutput) options.onAsyncOutput(`Error in 'until' loop ${dictKey}: Could not find main stack.`, true);
            return;
        }
        mainStack.push(untilDef.initialValue);
        if (options.onAsyncOutput) options.onAsyncOutput('YIELD_TICK', false);

        const tick = async (tickTime: number) => {
            const elapsedTime = tickTime - startTime;

            if (elapsedTime >= endSeconds) {
                if (processState.isTemporary) {
                    delete dictionary[dictKey];
                } else {
                    // Restore original definition for named loops
                    dictionary[dictKey] = originalDefinition;
                }
                if (options.onAsyncOutput) options.onAsyncOutput('YIELD_TICK', false);
                return;
            }

            try {
                await options.run([...untilDef.quotation], mainStack, { ...options, onOutput: options.onAsyncOutput, isDebug: false });
                if (mainStack.length > 0) {
                    processState.results.push(mainStack[mainStack.length - 1]);
                }
                if (options.onAsyncOutput) options.onAsyncOutput('YIELD_TICK', false);
            } catch (e) {
                if (options.onAsyncOutput) {
                    options.onAsyncOutput(`Error in 'until' loop ${dictKey}: ${e.message}. Loop stopped.`, true);
                }
                if (processState.isTemporary) delete dictionary[dictKey];
                return;
            }

            audioEngine.schedule(dictKey, tickTime + intervalSeconds, tick);
        };
        
        // Schedule the first tick immediately.
        audioEngine.schedule(dictKey, startTime, tick);
    };

    // This is the core evaluation generator. It is passed into operators that need it.
    const evaluate: EvaluateFn = function* (program, stack, options = {}, depth = 0) {
        program = Array.isArray(program) ? [...program] : [program];
        const dict = options.dictionary || dictionary;

        // This is the function that operators should call for sub-evaluation.
        const subEvaluator: EvaluateFn = (prog, st, opts) => {
            // It needs to merge options and call the main evaluate function.
            // The dictionary from the new options should take precedence.
            const newOpts = { ...options, ...(opts || {}) };
            return evaluate(prog, st, newOpts, depth + 1);
        };
        
        while (program.length > 0) {
            let token = program.shift();
            
            // 2. DEBUG HOOK
            if (options.isDebug && options.onToken) options.onToken(token, deepClone(stack), deepClone(program), depth);

            // 1. ALIASES
            if (typeof token === 'string' && aliases[token]) {
                token = aliases[token];
            }
            
            // 3. LITERAL STRINGS
            if (typeof token === 'string' && token.startsWith('\0')) {
                stack.push(token.slice(1));
                yield;
                continue;
            }

            // 4. DECISION POINT: EXECUTE or PUSH AS DATA?
            let dictKey: string | undefined;
            if (typeof token === 'string' || typeof token === 'number') {
                dictKey = String(token);
            } else if (typeof token === 'symbol') {
                const key = Symbol.keyFor(token);
                if (key) dictKey = `:${key}`;
            }

            const def = dictKey ? dict[dictKey] : undefined;
            let execute = false;

            if (def) {
                // It's in the dictionary. Default is to execute.
                execute = true;

                // --- CONTEXT CHECK (Lookahead) ---
                // We should NOT execute if the token is being used as data for an upcoming operator.
                const nameConsumers = new Set(['popto', 'appendTo', 'yield', 'body', 'popstackto', 'stop', 'kill', 'quote']);

                // Look 1 token ahead for direct consumers like '='
                if (program.length > 0) {
                    let nextTokenRaw = program[0];
                    let nextToken = (typeof nextTokenRaw === 'string' && aliases[nextTokenRaw]) ? aliases[nextTokenRaw] : nextTokenRaw;
                    
                    if (nameConsumers.has(nextToken as string)) {
                        execute = false;
                    }
                }
            
                // Look 2 tokens ahead for indirect consumers like 'yield'
                if (execute && program.length > 1) {
                    let nextNextTokenRaw = program[1];
                    let nextNextToken = (typeof nextNextTokenRaw === 'string' && aliases[nextNextTokenRaw]) ? aliases[nextNextTokenRaw] : nextNextTokenRaw;
            
                    // Special check for 'yield' which has the form: NAME PROGRAM yield
                    if (nextNextToken === 'yield') {
                        execute = false;
                    }
                }
            }
            
            // 5. ACTION
            if (execute) {
                if ('definition' in def) { // Built-in
                    yield* def.definition.exec(stack, options, subEvaluator, dict);
                } else { // User-defined
                    const body = def.body;
                    
                    // Handle special definition types (live-loop, until) that are stored as data objects
                    if (body?.type === 'live-loop-def') {
                        startLiveLoop(dictKey, body, dict, options);
                        yield;
                        continue;
                    }
                    if (body?.type === 'until-def') {
                        startUntilLoop(dictKey, body, dict, options);
                        yield;
                        continue;
                    }
                    
                    // Handle executable words defined with `=>`
                    if (Array.isArray(body) && body.length > 0 && body[body.length - 1] === 'iterate') {
                        const quotation = body[0];
                        
                        // FIX: Handle pre-built live-loop/until objects from `=>` definitions.
                        // This is necessary because `live` and `until` create the definition object,
                        // which `=>` then wraps in a quotation. This logic unwraps it.
                        if (dictKey && Array.isArray(quotation) && quotation.length === 1) {
                            const defObject = quotation[0];
                            if (defObject?.type === 'live-loop-def') {
                                startLiveLoop(dictKey, defObject, dict, options);
                                yield;
                                continue;
                            }
                            if (defObject?.type === 'until-def') {
                                startUntilLoop(dictKey, defObject, dict, options);
                                yield;
                                continue;
                            }
                        }
                        
                        // Handle named state generator defined with `=>`
                        if (Array.isArray(quotation) && quotation.length > 0) {
                            const lastToken = quotation[quotation.length - 1];
                            if (lastToken === 'yield' && quotation.length >= 2) {
                                const statePart = quotation[0];
                                const programPart = quotation[1];
                                const isNamedState = typeof statePart === 'symbol' || (Array.isArray(statePart) && statePart.length === 2 && typeof statePart[1] === 'symbol');
                                
                                if (!isNamedState) {
                                    if (def._generator_state === undefined) {
                                        def._generator_state = deepClone(statePart);
                                    }
                                    const tempStack = Array.isArray(def._generator_state) ? [...def._generator_state] : [def._generator_state];
                                    yield* subEvaluator(programPart, tempStack, options);
                                    def._generator_state = tempStack.length === 1 ? tempStack[0] : tempStack;
                                    if (tempStack.length > 0) stack.push(tempStack[tempStack.length - 1]);
                                    yield;
                                    continue; // Execution handled
                                }
                            }
                        }
                        
                        // For regular functions and named-state generators, execute the body
                        program.unshift(...body);
                        yield;
                        continue;
                    }

                    // It's a data word. Push its body to the stack.
                    const value = deepClone(body);
                    const clean = (v: any) => Array.isArray(v) ? v.map(clean) : (typeof v === 'string' && v.startsWith('\0') ? v.slice(1) : v);
                    const cleanedValue = clean(value);
                    stack.push(cleanedValue);
                }
            } else {
                // Push token as data.
                if (Array.isArray(token)) {
                    const clean = (t: any) => Array.isArray(t) ? t.map(clean) : (typeof t === 'string' && t.startsWith('\0') ? t.slice(1) : t);
                    stack.push(clean(token));
                } else {
                    stack.push(token);
                }
            }
            
            yield;
        }
    };

    const run = (program: StackValue[], stack: StackValue[], options: YieldOptions = {}) => {
        const augmentedOptions: YieldOptions = { ...options, parse, builtInKeys, run, mainStack: stack, dictionary };
        const { stopSignal = { stopped: false }, pauseSignal = { paused: false }, onStep = () => {}, getDelay = () => augmentedOptions.delay || 0, isDebug = false } = augmentedOptions;
        
        return new Promise<void>((resolve, reject) => {
            const iterator = evaluate(program, stack, augmentedOptions, 0);
            const BATCH_SIZE = 5000; // Number of synchronous steps before yielding to the event loop.

            const step = async () => {
                try {
                    // Handle stop/pause signals first
                    if (stopSignal.stopped) return resolve();
                    if (pauseSignal.paused) {
                        if (augmentedOptions.setResume) augmentedOptions.setResume(step);
                        return;
                    }
                    
                    const delay = getDelay();
                    
                    // --- Debug mode with delay ---
                    if (delay > 0 && isDebug) {
                        const { value, done } = iterator.next();
                        if (done) {
                            // After the main program is done, check for nameless loops
                            for (let i = stack.length - 1; i >= 0; i--) {
                                const item = stack[i];
                                if (item?.type === 'live-loop-def') {
                                    const loopDef = item as LiveLoopDef;
                                    const loopName = `live${namelessLiveCounter++}`;
                                    dictionary[loopName] = { body: loopDef, description: 'Nameless live loop', example: '' };
                                    startLiveLoop(loopName, loopDef, dictionary, augmentedOptions);
                                    stack.splice(i, 1);
                                } else if (item?.type === 'until-def') {
                                    const untilDef = item as UntilDef;
                                    untilDef.isTemporary = true; // Mark for auto-cleanup
                                    const loopName = `until${namelessUntilCounter++}`;
                                    dictionary[loopName] = { body: untilDef, description: 'Nameless until loop', example: '' };
                                    startUntilLoop(loopName, untilDef, dictionary, augmentedOptions);
                                    stack.splice(i, 1);
                                }
                            }
                            return resolve();
                        }
                        if (value instanceof Promise) await value; // Handle async ops like 'sleep'
                        if (isDebug) onStep(stack);
                        setTimeout(step, delay); // Schedule the next single step
                        return;
                    }

                    // --- High-performance batch execution ---
                    let stepsInBatch = 0;
                    while (stepsInBatch < BATCH_SIZE) {
                        const { value, done } = iterator.next();
                        if (done) {
                             // After the main program is done, check for nameless loops
                            for (let i = stack.length - 1; i >= 0; i--) {
                                const item = stack[i];
                                if (item?.type === 'live-loop-def') {
                                    const loopDef = item as LiveLoopDef;
                                    const loopName = `live${namelessLiveCounter++}`;
                                    dictionary[loopName] = { body: loopDef, description: 'Nameless live loop', example: '' };
                                    startLiveLoop(loopName, loopDef, dictionary, augmentedOptions);
                                    stack.splice(i, 1);
                                } else if (item?.type === 'until-def') {
                                    const untilDef = item as UntilDef;
                                    untilDef.isTemporary = true; // Mark for auto-cleanup
                                    const loopName = `until${namelessUntilCounter++}`;
                                    dictionary[loopName] = { body: untilDef, description: 'Nameless until loop', example: '' };
                                    startUntilLoop(loopName, untilDef, dictionary, augmentedOptions);
                                    stack.splice(i, 1);
                                }
                            }
                            return resolve();
                        }
                        
                        // If an async operation (like 'sleep') is yielded, await it.
                        if (value instanceof Promise) {
                            await value;
                            // After an async op, immediately yield to the event loop and continue the next step.
                            setTimeout(step, 0); 
                            return; // Exit the batch to allow the promise to resolve.
                        }
                        stepsInBatch++;
                    }

                    // After a full batch, yield to the event loop to keep the UI responsive.
                    setTimeout(step, 0);
                } catch (e) {
                    reject(e);
                }
            };
            
            step();
        });
    };

    return {
        dictionary,
        dictionaryCategories,
        builtInKeys,
        aliases,
        parse,
        run,
        reset,
    };
})();
