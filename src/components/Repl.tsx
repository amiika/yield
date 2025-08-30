import React, { useState, useEffect, useRef } from 'react';
import { Yield } from '../lib/yield-interpreter';
import { simpleFormatter, deepEqual } from '../lib/utils';
import { HistoryManager } from '../lib/HistoryManager';
import type { IHistoryManager } from '../lib/types';

interface HistoryEntry {
    command: string;
    output: string;
    isError: boolean;
}

// Global stack for the REPL session
let sessionStack = [];

export const Repl = () => {
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [input, setInput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const endOfHistoryRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Command history for up/down arrows
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);

    // State history for undo/redo
    const historyManagerRef = useRef<IHistoryManager | null>(null);

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
        setShowWelcome(true);
    };

    const handleRun = async (command: string) => {
        if (showWelcome) {
            setShowWelcome(false);
        }

        if (!command.trim()) {
            const stackOutput = `[ ${sessionStack.map(simpleFormatter).join(' ')} ]`;
            // An empty command still gets an entry to show the stack.
            const newHistoryEntry = { command, output: stackOutput, isError: false };
            setHistory(prev => [...prev, newHistoryEntry]);
            return;
        }
        
        const processedCmd = command.trim().toLowerCase();

        // `clear` is a special UI-only command that doesn't create a history entry.
        if (processedCmd === 'clear') {
            setHistory([]);
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

        setIsRunning(true);
        
        let replOutput = '';
        const onOutput = (str: string) => {
            replOutput += str;
        };

        try {
            if (processedCmd === 'reset') {
                Yield.reset();
                sessionStack = [];
                // Reset state history as well
                historyManagerRef.current.clear();
                const initialSnapshot = historyManagerRef.current.createSnapshot(sessionStack, Yield.dictionary);
                historyManagerRef.current.add(initialSnapshot);
            }
            
            if (processedCmd === 'help') {
                const categoryOutputs = [];
                for (const shortKey in Yield.dictionaryCategories) {
                    const category = Yield.dictionaryCategories[shortKey];
                    categoryOutputs.push(`${shortKey}: ${category.name}`);
                }
                let output = categoryOutputs.join('\n');
                
                output += "\n\nUse `<category> help` to see commands in a category.";
                const newHistoryEntry = { command, output, isError: false };
                setHistory(prev => [...prev, newHistoryEntry]);
                return;
            }

            if (processedCmd.endsWith(' help')) {
                const topic = processedCmd.slice(0, -5).trim();
                let output = '';
                let isError = false;

                const commandDef = Yield.dictionary[topic];
                const categoryDef = Yield.dictionaryCategories[topic];

                if (commandDef && 'description' in commandDef) {
                    output = `${commandDef.description}\n\nExample:\n  ${commandDef.example}`;
                } else if (categoryDef) {
                    const commands = Object.keys(categoryDef.definitions);
                    output = `--- ${categoryDef.name} ---\n`;
                    output += `${categoryDef.description}\n\n`;
                    output += `Commands: ${commands.join(', ')}`;
                } else {
                     output = `Error: Unknown command or category '${topic}'.`;
                     isError = true;
                }
                const newHistoryEntry = { command, output, isError };
                setHistory(prev => [...prev, newHistoryEntry]);
                return;
            }
            
            const isHistoryCmd = ['undo', 'redo'].includes(processedCmd);
            const stateBefore = isHistoryCmd ? historyManagerRef.current.createSnapshot(sessionStack, Yield.dictionary) : null;

            const program = Yield.parse(command);
            await Yield.run(program, sessionStack, { 
                onOutput,
                historyManager: historyManagerRef.current,
                commandHistory: nextCommandHistory,
            });

            if (isHistoryCmd) {
                const stateAfter = historyManagerRef.current.createSnapshot(sessionStack, Yield.dictionary);
                if (deepEqual(stateBefore, stateAfter)) {
                    // State did not change, so don't add to visual history.
                    return;
                }
            }
            
            // After running, if the command was NOT a history command, add a new state snapshot.
            // The history manager internally checks if the state has actually changed.
            if (processedCmd !== 'undo' && processedCmd !== 'redo' && processedCmd !== 'again') {
                const stateAfter = historyManagerRef.current.createSnapshot(sessionStack, Yield.dictionary);
                historyManagerRef.current.add(stateAfter);
            }
            
            const stackOutput = `[ ${sessionStack.map(simpleFormatter).join(' ')} ]`;
            let finalOutput = stackOutput;
            if (replOutput) {
                // Separate stack from output with a newline, then add the output
                finalOutput += '\n' + replOutput;
            }
            const newHistoryEntry = { command, output: finalOutput, isError: false };
            setHistory(prev => [...prev, newHistoryEntry]);
        } catch (error) {
            const newHistoryEntry = { command, output: error.message, isError: true };
            setHistory(prev => [...prev, newHistoryEntry]);
        } finally {
            if (processedCmd === 'reset') {
                 const newHistoryEntry = { command, output: 'Interpreter state, stack, and history cleared.', isError: false };
                 setHistory(prev => [...prev, newHistoryEntry]);
            }
            setIsRunning(false);
            // Refocus the input after command execution
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        
        // If the change is a deletion, just update the state and bypass auto-spacing logic.
        if (newValue.length < input.length) {
            setInput(newValue);
            return;
        }

        const lastTypedChar = newValue.slice(-1);
        const mathOps = ['+', '-', '*', '/', '%'];

        // Check if the last typed character is a math operator and it's not the first character
        if (mathOps.includes(lastTypedChar) && newValue.length > 1) {
            const charBefore = newValue.slice(-2, -1);
            
            // If the character before the operator is not a space, add one before.
            if (charBefore.trim() !== '') {
                const updatedValue = `${newValue.slice(0, -1)} ${lastTypedChar} `;
                setInput(updatedValue);
            } else {
                // If there's already a space, just add one after.
                const updatedValue = `${newValue} `;
                setInput(updatedValue);
            }
        } else {
            setInput(newValue);
        }
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
            e.preventDefault();
            setCommandHistoryIndex(prev => {
                const nextIndex = prev === -1 ? commandHistory.length - 1 : Math.max(0, prev - 1);
                setInput(commandHistory[nextIndex] || '');
                return nextIndex;
            });
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setCommandHistoryIndex(prev => {
                const nextIndex = prev === -1 ? -1 : Math.min(commandHistory.length, prev + 1);
                setInput(commandHistory[nextIndex] || '');
                return nextIndex;
            });
        }

        if (e.key === 'ArrowLeft' && input === '') {
            e.preventDefault();
            handleRun('undo');
        }

        if (e.key === 'ArrowRight' && input === '') {
            e.preventDefault();
            handleRun('redo');
        }
    };

    return (
        <div 
            className="repl-terminal fira-code bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden h-[70vh] flex flex-col"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="repl-history p-4 overflow-y-auto flex-grow">
                {showWelcome && (
                    <div className="mb-2 whitespace-pre-wrap">
                        <div className="output-area text-gray-100">
                            World Hello!
                            <p className="text-gray-400 text-sm mt-1">Try typing `help` to see available commands.</p>
                        </div>
                    </div>
                )}
                {history.map((entry, index) => (
                    <div key={index} className="mb-2 whitespace-pre-wrap">
                        <div className="flex items-start">
                             <span className="text-green-400 mr-2 flex-shrink-0">&gt;</span>
                             <span className="text-gray-300">{entry.command}</span>
                        </div>
                        <div className={`output-area ${entry.isError ? 'text-red-400' : 'text-gray-100'}`}>
                            {entry.output}
                        </div>
                    </div>
                ))}
                <div ref={endOfHistoryRef} />
            </div>
            <div className="repl-input-area p-4 border-t border-gray-700 bg-gray-800">
                <div className="flex items-start">
                    <span className="text-green-400 mr-2 flex-shrink-0">&gt;</span>
                    <textarea
                        ref={inputRef}
                        className="repl-input"
                        value={input}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Type command or help"
                        disabled={isRunning}
                        autoFocus
                        rows={1}
                    />
                </div>
            </div>
        </div>
    );
};