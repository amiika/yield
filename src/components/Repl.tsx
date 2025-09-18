


import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Yield } from '../lib/yield-interpreter';
import { yieldFormatter, deepEqual } from '../lib/utils';
import { HistoryManager } from '../lib/HistoryManager';
import type { IHistoryManager, ShaderObject, PlotObject, EngravingObject, TurtleObject, Turtle3DObject } from '../lib/types';
import { ShaderCanvas } from './ShaderCanvas';
import { PlotCanvas } from './PlotCanvas';
import { EngravingCanvas } from './EngravingCanvas';
import { generateTurtleShader, generateSceneFromTurtle3D, generateMarchingShader } from '../lib/operators/shaders/glsl-generator';

// --- Type Definitions ---
interface CommandEntry {
    type: 'command';
    command: string;
    output: string;
    isError: boolean;
}

interface AsyncOutputEntry {
    type: 'async';
    output: string;
    isError: boolean;
}

// A history entry can be a user command or an async output from a live loop.
type HistoryEntry = (CommandEntry | AsyncOutputEntry) & { id: number };

// --- Global REPL State ---
let sessionStack = [];

// --- Godmode Dictionary View ---
interface DictionaryViewProps {
    // FIX: Correctly type the dictionary prop.
    dictionary: { [key: string]: any };
    builtInKeys: Set<string>;
    version: number; // Prop to force re-render
    onUpdate: (key: string, newValue: string) => boolean;
}

const DictionaryView: React.FC<DictionaryViewProps> = ({ dictionary, builtInKeys, version, onUpdate }) => {
    const userDictionary = useMemo(() => Object.entries(dictionary)
        .filter(([key]) => !builtInKeys.has(key) && 'body' in dictionary[key]), 
        [dictionary, builtInKeys, version]
    );

    const [errorKey, setErrorKey] = useState<string | null>(null);

    useEffect(() => {
        // Clear errors when the dictionary is updated externally (e.g., by undo/redo)
        setErrorKey(null);
    }, [version]);

    const formatBodyForEditing = (body: any): string => {
        if (body?.type === 'until-process') {
            const { quotation, intervalBeats, endBeats } = body;
            const formattedQuotation = yieldFormatter(quotation);
            return `${formattedQuotation} ${intervalBeats} ${endBeats} until`;
        }
        
        const formatted = yieldFormatter(body);
        // The body of a user-defined word is a list of tokens.
        // The formatter wraps lists in `()`. For editing the content, we strip them.
        if (Array.isArray(body) && formatted.startsWith('(') && formatted.endsWith(')')) {
            return formatted.slice(1, -1);
        }
        return formatted;
    };

    const handleBlur = (key: string, e: React.FocusEvent<HTMLSpanElement>) => {
        const newContent = e.currentTarget.innerText;
        
        const originalDef = dictionary[key];
        // FIX: Added more robust type checking for originalDef and its body.
        if (!originalDef || typeof originalDef !== 'object' || !('body' in originalDef) || originalDef.body?.type === 'until-process') return;
        const originalContent = formatBodyForEditing(originalDef.body);

        if (newContent.trim() === originalContent.trim()) {
            if (errorKey === key) setErrorKey(null);
            return;
        }

        const success = onUpdate(key, newContent);
        if (!success) {
            setErrorKey(key);
            // Revert the UI text to the last known valid state.
            e.currentTarget.innerText = originalContent;
        } else {
            // Success, clear any lingering error state.
            if (errorKey === key) setErrorKey(null);
        }
    };

    const handleFocus = (key: string) => {
        if (errorKey === key) {
            setErrorKey(null);
        }
    };

    return (
        <div className="h-full bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden flex flex-col fira-code">
            <header className="p-3 border-b border-gray-700 bg-gray-800/70">
                <h2 className="font-bold text-gray-300">GODMODE</h2>
            </header>
            <div className="p-4 overflow-y-auto flex-grow bg-black/30 text-sm">
                {userDictionary.length === 0 ? (
                    <p className="text-gray-500 italic">No user-defined words yet.</p>
                ) : (
                    <div>
                        {userDictionary.map(([key, valueDef]) => (
                            // FIX: Add a type guard to ensure valueDef has a 'body' property before accessing it.
                            'body' in valueDef &&
                            <div key={`${key}-${version}`} className="flex items-baseline mb-1">
                                <span className={`font-semibold mr-2 ${errorKey === key ? 'text-red-500' : 'text-cyan-400'}`}>
                                    {key}
                                </span>
                                <span className="text-gray-500 mr-2">=</span>
                                <span
                                    className="text-gray-300 whitespace-pre-wrap flex-grow outline-none focus:bg-gray-700/50 rounded px-1"
                                    contentEditable={typeof valueDef.body === 'object' && valueDef.body?.type !== 'until-process'}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleBlur(key, e)}
                                    onFocus={() => handleFocus(key)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            e.currentTarget.blur();
                                        }
                                    }}
                                >
                                    {formatBodyForEditing(valueDef.body)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


export const Repl = () => {
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [input, setInput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [shaderOnStack, setShaderOnStack] = useState<ShaderObject | null>(null);
    const [plotOnStack, setPlotOnStack] = useState<PlotObject | null>(null);
    const [engravingOnStack, setEngravingOnStack] = useState<EngravingObject | null>(null);
    const [turtleOnStack, setTurtleOnStack] = useState<TurtleObject | null>(null);
    const [turtle3DOnStack, setTurtle3DOnStack] = useState<Turtle3DObject | null>(null);
    const [liveOutput, setLiveOutput] = useState<string | null>(null); // For live loop stack display
    const [isGodMode, setIsGodMode] = useState(false); // Godmode state
    const [dictionaryVersion, setDictionaryVersion] = useState(0); // Dictionary update tracker
    const endOfHistoryRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Command history for up/down arrows
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);

    // State history for undo/redo
    const historyManagerRef = useRef<IHistoryManager | null>(null);
    const historyIdCounter = useRef(0);
    const didEmitInTick = useRef(false);
    const ranFromSessionStorage = useRef(false);

    // --- Effects ---

    useEffect(() => {
        // This effect runs once to initialize the REPL session.
        Yield.reset();
        sessionStack = [];
        
        // Initialize the state history manager
        historyManagerRef.current = new HistoryManager(Yield.builtInKeys);
        const initialSnapshot = historyManagerRef.current.createSnapshot(sessionStack, Yield.dictionary);
        historyManagerRef.current.add(initialSnapshot);

        setHistory([]);
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, showWelcome]);
    
    // Auto-resize textarea
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            const scrollHeight = inputRef.current.scrollHeight;
            inputRef.current.style.height = `${scrollHeight}px`;
        }
    }, [input]);
    
    // --- Handlers ---

    // Callback for asynchronous output from live loops or other background processes.
    const handleAsyncOutput = useCallback((output: string, isError = false) => {
        const trimmedOutput = output.trim();
        if (!trimmedOutput) return;
    
        // Generic tick for any live operator to refresh the UI
        if (!isError && trimmedOutput === 'YIELD_TICK') {
            if (!didEmitInTick.current) {
                setLiveOutput(`( ${sessionStack.map(yieldFormatter).join(' ')} )`);
            }
            setDictionaryVersion(v => v + 1); // Update dictionary on tick as well
            didEmitInTick.current = false; // Reset for the next tick.
            return;
        }
        
        // It's an error or a different async output like 'print'.
        let finalOutput = trimmedOutput;
        if (isError) {
             const stackOutput = `( ${sessionStack.map(yieldFormatter).join(' ')} )`;
             finalOutput = `${trimmedOutput}\n${stackOutput}`;
        } else {
            // It was a non-error, non-tick output, so it's from print.
            didEmitInTick.current = true;
        }
        
        const newEntry: AsyncOutputEntry & { id: number } = {
            type: 'async',
            output: finalOutput,
            isError,
            id: historyIdCounter.current++,
        };
        setHistory(prev => [...prev, newEntry]);
        
        if (isError) {
            setLiveOutput(null);
        }
    }, []);

    const handleResetAndClear = () => {
        Yield.reset(); // Clear custom operators
        sessionStack = []; // Clear the stack
        
        // Reset state history as well
        if (historyManagerRef.current) {
            historyManagerRef.current.clear();
            const initialSnapshot = historyManagerRef.current.createSnapshot(sessionStack, Yield.dictionary);
            historyManagerRef.current.add(initialSnapshot);
        }

        setHistory([]); // Clear the screen
        setInput('');   // Clear the input
        setShaderOnStack(null);
        setPlotOnStack(null);
        setEngravingOnStack(null);
        setTurtleOnStack(null);
        setTurtle3DOnStack(null);
        setLiveOutput(null);
        setShowWelcome(true);
        setDictionaryVersion(v => v + 1);
    };

    const handleDictionaryUpdate = useCallback((key: string, newValue: string): boolean => {
        try {
            if (key === ':loops') {
                throw new Error("Cannot directly modify the reserved ':loops' variable.");
            }
            // The user is editing the body of the definition. The provided string is the new body.
            // We parse it directly to get the list of tokens.
            const newBody = Yield.parse(newValue);
            const definition = Yield.dictionary[key];
            if (definition && 'body' in definition) {
                if (definition.body?.type === 'until-process') {
                    throw new Error("Cannot directly modify a running 'until' process.");
                }
                definition.body = newBody;
            } else {
                throw new Error(`Cannot update body of non-user-defined word: '${key}'.`);
            }

            setDictionaryVersion(v => v + 1);

            // Add change to history
            if (historyManagerRef.current) {
                const snapshot = historyManagerRef.current.createSnapshot(sessionStack, Yield.dictionary);
                historyManagerRef.current.add(snapshot);
            }
            return true; // success
        } catch (error) {
            // Provide feedback in the main REPL history for clarity.
            handleAsyncOutput(`Error updating '${key}': ${error.message}`, true);
            return false; // failure
        }
    }, [handleAsyncOutput]);

    const runCommand = useCallback(async (command: string) => {
        if (!command.trim()) {
            const stackOutput = `( ${sessionStack.map(yieldFormatter).join(' ')} )`;
            const newHistoryEntry: HistoryEntry = { type: 'command', command, output: stackOutput, isError: false, id: historyIdCounter.current++ };
            setHistory(prev => [...prev, newHistoryEntry]);
            return;
        }
        
        const processedCmd = command.trim().toLowerCase();

        // `cls` is a special UI-only command that doesn't create a history entry.
        if (processedCmd === 'cls') {
            setHistory([]);
            return;
        }
        
        // `godmode` is a special UI-only command.
        if (processedCmd === 'godmode') {
            const willBeOn = !isGodMode;
            setIsGodMode(willBeOn);
            const message = `Godmode ${willBeOn ? 'activated' : 'deactivated'}.`;
            const newHistoryEntry: HistoryEntry = { type: 'command', command, output: message, isError: false, id: historyIdCounter.current++ };
            setHistory(prev => [...prev, newHistoryEntry]);
            return;
        }

        // Create the new history for this execution and for the state update
        const nextCommandHistory = [...commandHistory];
        if (nextCommandHistory[nextCommandHistory.length - 1] !== command) {
            nextCommandHistory.push(command);
        }

        // Add to command history before running
        setCommandHistory(nextCommandHistory);
        setCommandHistoryIndex(-1); // Reset index
        
        // Collect synchronous output separately from async output.
        const syncOutput: string[] = [];
        const onSyncOutput = (str: string) => {
            syncOutput.push(str);
        };

        try {
            if (processedCmd === 'help' || processedCmd.endsWith(' help')) {
                 // Handle help commands synchronously as they are UI-specific
                let output = '';
                let isError = false;
                if (processedCmd === 'help') {
                     const categoryOutputs = Object.keys(Yield.dictionaryCategories).map(shortKey => {
                        const category = Yield.dictionaryCategories[shortKey];
                        return `${shortKey}: ${category.name}`;
                    });
                    output = categoryOutputs.join('\n') + "\n\nUse `<category> help` to see commands in a category.\nTry `godmode` to see the live dictionary.";
                } else {
                    const topic = processedCmd.slice(0, -5).trim();
                    const commandDef = Yield.dictionary[topic];
                    const categoryDef = Yield.dictionaryCategories[topic];
                    if (commandDef && 'definition' in commandDef) {
                        const exampleCode = commandDef.examples?.[0]?.code;
                        const exampleStr = exampleCode ? (Array.isArray(exampleCode) ? exampleCode.join('\n') : exampleCode) : null;
                        output = `${commandDef.definition.description}${exampleStr ? `\n\nExample:\n  ${exampleStr}` : ''}`;
                    } else if (categoryDef) {
                        output = `--- ${categoryDef.name} ---\n${categoryDef.description}\n\nCommands: ${Object.keys(categoryDef.definitions).join(', ')}`;
                    } else {
                        output = `Error: Unknown command or category '${topic}'.`;
                        isError = true;
                    }
                }
                const newHistoryEntry: HistoryEntry = { type: 'command', command, output, isError, id: historyIdCounter.current++ };
                setHistory(prev => [...prev, newHistoryEntry]);
                return;
            }

            const isHistoryCmd = ['undo', 'redo'].includes(processedCmd);
            const stateBefore = isHistoryCmd ? historyManagerRef.current.createSnapshot(sessionStack, Yield.dictionary) : null;

            const program = Yield.parse(command);
            // FIX: Type-check for 'body' property on dictionary entry before accessing it.
            const loopsDefBefore = Yield.dictionary[':loops'];
            const loopsBefore = (loopsDefBefore && 'body' in loopsDefBefore && Array.isArray(loopsDefBefore.body)) ? loopsDefBefore.body.length : 0;
            await Yield.run(program, sessionStack, { 
                onOutput: onSyncOutput,
                onAsyncOutput: handleAsyncOutput, // Pass the async handler
                historyManager: historyManagerRef.current,
                commandHistory: nextCommandHistory,
            });
            // FIX: Type-check for 'body' property on dictionary entry before accessing it.
            const loopsDefAfter = Yield.dictionary[':loops'];
            const loopsAfter = (loopsDefAfter && 'body' in loopsDefAfter && Array.isArray(loopsDefAfter.body)) ? loopsDefAfter.body.length : 0;
            const hasStartedLiveLoop = loopsAfter > loopsBefore;


            if (isHistoryCmd) {
                const stateAfter = historyManagerRef.current.createSnapshot(sessionStack, Yield.dictionary);
                if (deepEqual(stateBefore, stateAfter)) {
                    // State did not change, but still show the command was run for good UX.
                    const newHistoryEntry: HistoryEntry = { type: 'command', command, output: `( ${sessionStack.map(yieldFormatter).join(' ')} )`, isError: false, id: historyIdCounter.current++ };
                    setHistory(prev => [...prev, newHistoryEntry]);
                    return;
                }
            }
            
            if (processedCmd === 'reset') {
                 Yield.reset();
                 sessionStack = [];
                 historyManagerRef.current.clear();
                 const initialSnapshot = historyManagerRef.current.createSnapshot(sessionStack, Yield.dictionary);
                 historyManagerRef.current.add(initialSnapshot);
            }
            
            if (processedCmd !== 'undo' && processedCmd !== 'redo' && processedCmd !== 'again') {
                const stateAfter = historyManagerRef.current.createSnapshot(sessionStack, Yield.dictionary);
                historyManagerRef.current.add(stateAfter);
            }
            
            const lastItemOnStack = sessionStack.length > 0 ? sessionStack[sessionStack.length - 1] : null;
            setShaderOnStack(null);
            setPlotOnStack(null);
            setEngravingOnStack(null);
            setTurtleOnStack(null);
            setTurtle3DOnStack(null);

            if (lastItemOnStack && lastItemOnStack.type === 'shader') {
                setShaderOnStack(lastItemOnStack);
            } else if (lastItemOnStack && lastItemOnStack.type === 'plot') {
                setPlotOnStack(lastItemOnStack);
            } else if (lastItemOnStack && lastItemOnStack.type === 'engraving') {
                setEngravingOnStack(lastItemOnStack);
            } else if (lastItemOnStack && lastItemOnStack.type === 'turtle') {
                setTurtleOnStack(lastItemOnStack);
            } else if (lastItemOnStack && lastItemOnStack.type === 'turtle3d') {
                setTurtle3DOnStack(lastItemOnStack);
            }

            let outputForHistory = '';
            // If a live loop was started, suppress the synchronous stack output
            // because the live output will provide updates.
            if (!hasStartedLiveLoop) {
                const stackOutput = `( ${sessionStack.map(yieldFormatter).join(' ')} )`;
                let finalOutput = stackOutput;
                if (syncOutput.length > 0) {
                    finalOutput += '\n' + syncOutput.join('');
                }
                outputForHistory = finalOutput;
            }

            const newHistoryEntry: HistoryEntry = { type: 'command', command, output: outputForHistory, isError: false, id: historyIdCounter.current++ };
            setHistory(prev => [...prev, newHistoryEntry]);
        } catch (error) {
            const newHistoryEntry: HistoryEntry = { type: 'command', command, output: error.message, isError: true, id: historyIdCounter.current++ };
            setHistory(prev => [...prev, newHistoryEntry]);
        } finally {
            if (processedCmd === 'reset') {
                 const newHistoryEntry: HistoryEntry = { type: 'command', command, output: 'Interpreter state, stack, and history cleared.', isError: false, id: historyIdCounter.current++ };
                 setHistory(prev => [...prev, newHistoryEntry]);
            }
            setDictionaryVersion(v => v + 1);
        }
    }, [isGodMode, commandHistory, handleAsyncOutput]);
    
    const handleRun = useCallback(async (commandBlock: string) => {
        if (showWelcome) {
            setShowWelcome(false);
        }
        setLiveOutput(null);
    
        setIsRunning(true);
        // Await the whole block's execution to ensure correct parsing of multi-line programs.
        await runCommand(commandBlock);
        setIsRunning(false);
        setLiveOutput(null);
        setTimeout(() => inputRef.current?.focus(), 0);
    }, [showWelcome, runCommand]);

    useEffect(() => {
        // Only run once on mount
        if (ranFromSessionStorage.current) return;

        const codeToRun = sessionStorage.getItem('yield_repl_code');
        if (codeToRun) {
            ranFromSessionStorage.current = true;
            sessionStorage.removeItem('yield_repl_code');
            handleRun(codeToRun);
        }
    }, [handleRun]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (isRunning) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            handleResetAndClear();
            return;
        }

        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const commandToRun = input;
            setInput('');
            handleRun(commandToRun);
            return;
        }

        if (e.key === 'ArrowUp') {
            const textarea = e.currentTarget;
            const cursorPosition = textarea.selectionStart;
            const textBeforeCursor = textarea.value.substring(0, cursorPosition);
            const isFirstLine = textBeforeCursor.split('\n').length === 1;

            if (isFirstLine) {
                e.preventDefault();
                setCommandHistoryIndex(prev => {
                    const nextIndex = prev === -1 ? commandHistory.length - 1 : Math.max(0, prev - 1);
                    setInput(commandHistory[nextIndex] || '');
                    return nextIndex;
                });
            }
            // Otherwise, allow default behavior (moving cursor up)
        }

        if (e.key === 'ArrowDown') {
            const textarea = e.currentTarget;
            const cursorPosition = textarea.selectionStart;
            const totalLines = textarea.value.split('\n').length;
            const textBeforeCursor = textarea.value.substring(0, cursorPosition);
            const currentLine = textBeforeCursor.split('\n').length;

            if (currentLine === totalLines) {
                e.preventDefault();
                setCommandHistoryIndex(prev => {
                    const nextIndex = prev === -1 ? -1 : Math.min(commandHistory.length, prev + 1);
                    setInput(commandHistory[nextIndex] || '');
                    return nextIndex;
                });
            }
            // Otherwise, allow default behavior (moving cursor down)
        }

        if (e.key === 'ArrowLeft' && input === '') { e.preventDefault(); handleRun('undo'); }
        if (e.key === 'ArrowRight' && input === '') { e.preventDefault(); handleRun('redo'); }
    };
    
    const isPanelOpen = shaderOnStack || plotOnStack || engravingOnStack || turtleOnStack || turtle3DOnStack || isGodMode;

    // When in godmode, always show the stack. Otherwise, show it only when live loops are active.
    const liveStackContent = liveOutput || (isGodMode ? `( ${sessionStack.map(yieldFormatter).join(' ')} )` : null);

    const turtle3DShaderCode = useMemo(() => {
        if (!turtle3DOnStack) return null;
        try {
            const scene = generateSceneFromTurtle3D(turtle3DOnStack);
            return generateMarchingShader(scene, 10);
        } catch (e) {
            console.error("Error generating 3D turtle shader:", e);
            return null;
        }
    }, [turtle3DOnStack]);

    return (
        <div className="flex h-[70vh] gap-4">
            <div 
                className={`repl-terminal fira-code bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden flex flex-col transition-all duration-300 ${isPanelOpen ? 'w-2/3' : 'w-full'}`}
                onClick={() => inputRef.current?.focus()}
            >
                <div className="repl-history p-4 overflow-y-auto flex-grow bg-black/30 backdrop-blur-sm">
                    {showWelcome && (
                        <div className="mb-2 whitespace-pre-wrap">
                            <div className="output-area text-gray-100">
                                World Hello!
                                <p className="text-gray-400 text-sm mt-1">Try typing `help` to see available commands. Press left and right to undo and redo.</p>
                            </div>
                        </div>
                    )}
                    {history.map(entry => {
                        if (entry.type === 'async') {
                            return (
                                <div key={entry.id} className="whitespace-pre-wrap">
                                    <div className={`output-area ml-6 ${entry.isError ? 'text-red-400' : 'text-cyan-400'}`}>
                                        {entry.output}
                                    </div>
                                </div>
                            );
                        }
                        // It's a 'command' entry
                        return (
                             <div key={entry.id} className="mb-2 whitespace-pre-wrap">
                                <div className="flex items-start">
                                    <span className="text-green-400 mr-2 flex-shrink-0">&gt;</span>
                                    <span className="text-gray-300">{entry.command}</span>
                                </div>
                                <div className={`output-area ${entry.isError ? 'text-red-400' : 'text-gray-100'}`}>
                                    {entry.output}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={endOfHistoryRef} />
                </div>
                <div className="repl-input-area p-4 border-t border-gray-700 bg-gray-800/70 backdrop-blur-sm">
                    {liveStackContent && (
                        <div className="live-output-area pb-3 mb-3 border-b border-gray-600">
                            <div className="flex items-center text-sm">
                                <span className="text-gray-400 mr-2 font-sans text-xs uppercase flex-shrink-0">Live Stack:</span>
                                <div className="output-area text-cyan-400 whitespace-pre-wrap">
                                    {liveStackContent}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex items-start">
                        <span className="text-green-400 mr-2 flex-shrink-0">&gt;</span>
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            className="repl-textarea fira-code bg-transparent text-gray-300 w-full resize-none focus:outline-none placeholder-gray-500"
                            placeholder="Type a command..."
                            rows={1}
                            spellCheck="false"
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off"
                            aria-label="REPL input"
                        />
                    </div>
                </div>
            </div>
            {isPanelOpen && (
                <div className="w-1/3 transition-all duration-300 flex flex-col gap-4">
                    {shaderOnStack && (
                        <div className="flex-1 min-h-0">
                            <ShaderCanvas shaderCode={shaderOnStack.code} className="w-full h-full rounded-lg" />
                        </div>
                    )}
                    {plotOnStack && (
                         <div className="flex-1 min-h-0">
                            <PlotCanvas plotData={plotOnStack} className="w-full h-full" />
                        </div>
                    )}
                    {engravingOnStack && (
                        <div className="flex-1 min-h-0">
                            <EngravingCanvas engravingData={engravingOnStack} className="w-full h-full" />
                        </div>
                    )}
                    {turtleOnStack && (
                        <div className="flex-1 min-h-0">
                            <ShaderCanvas shaderCode={generateTurtleShader(turtleOnStack)} className="w-full h-full rounded-lg" />
                        </div>
                    )}
                    {turtle3DOnStack && turtle3DShaderCode && (
                        <div className="flex-1 min-h-0">
                            <ShaderCanvas shaderCode={turtle3DShaderCode} className="w-full h-full rounded-lg" />
                        </div>
                    )}
                    {isGodMode && (
                        <div className="flex-1 min-h-0">
                            <DictionaryView 
                                dictionary={Yield.dictionary} 
                                builtInKeys={Yield.builtInKeys} 
                                version={dictionaryVersion} 
                                onUpdate={handleDictionaryUpdate}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};