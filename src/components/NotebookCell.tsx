
import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Yield } from '../lib/yield-interpreter';
import { yieldFormatter } from '../lib/utils';
import { audioEngine } from '../lib/audio/AudioEngine';
import { ShaderCanvas } from './ShaderCanvas';
import type { ShaderObject, TestCase } from '../lib/types';

// Icon Components
const PlayIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
);

const PauseIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

const StopIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6 6h12v12H6z" />
    </svg>
);

const DebugIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3v-1.5M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const TerminalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 12h4.5" />
    </svg>
);

interface NotebookCellProps {
    cellData: any;
    compact?: boolean;
}

// Helper for debug formatting: no quotes on strings, no brackets on stack
const debugFormatter = (value: any): string => {
    if (typeof value === 'string') {
        // Interpreter uses \0 prefix for literal strings, strip it for display.
        if (value.startsWith('\0')) {
            return value.slice(1);
        }
        return value;
    }
    if (Array.isArray(value)) {
        return `(${value.map(debugFormatter).join(' ')})`;
    }
    if (value === true) return 'true';
    if (value === false) return 'false';
    if (typeof value === 'object' && value !== null) {
        if (value.type === 'shader') return '<shader>';
        if (value.type === 'scene') return '<scene>';
        if (value.type === 'light') return '<light>';
        if (value.type === 'color') return '<color>';
        if (value.type === 'glsl_expression') return '<glsl_expression>';
        if (value.type === 'postEffect') return `<${value.op} effect>`;
        if (['geometry', 'combinator', 'transformation', 'alteration'].includes(value.type)) return '<sdf>';
        if (typeof value.next === 'function') return '<generator>';
    }
    if (typeof value === 'symbol') {
        const key = Symbol.keyFor(value);
        if (key !== undefined) {
            return `:${key}`;
        }
        return value.toString();
    }
    return String(value);
};


// Helper to format the debug log with indentation
const formatDebugLog = (lines: {stack: string, program: string, depth: number}[]) => {
    if (lines.length === 0) return '';
    const stackPartLengths = lines.map(l => l.stack.length + l.depth * 2);
    const maxLength = Math.max(...stackPartLengths);
    return lines.map(l => {
        const indent = '  '.repeat(l.depth);
        const stackPart = `${indent}${l.stack}`;
        return `${stackPart.padEnd(maxLength)} <- ${l.program}`;
    }).join('\n');
};

export const NotebookCell: React.FC<NotebookCellProps> = ({ cellData, compact = false }) => {
    // Memoize and normalize examples from cellData to handle different sources
    const examples: TestCase[] = useMemo(() => {
        if (cellData.examples && cellData.examples.length > 0) {
            // From Reference page, which provides a full 'examples' array
            return cellData.examples;
        }
        if (cellData.example) {
            // From Tutorial/Synopsis pages, which provide a single 'example'
            return [{
                code: cellData.example,
                expected: cellData.expected,
                assert: cellData.assert,
                expectedError: cellData.expectedError,
                expectedDescription: cellData.expectedDescription,
                replCode: cellData.replCode,
            }];
        }
        return [];
    }, [cellData]);

    const getCodeFromExample = useCallback((example: TestCase | undefined) => {
        if (!example) return '';
        const codeSource = example.replCode || example.code;
        return Array.isArray(codeSource) ? codeSource.join('\n') : String(codeSource || '');
    }, []);
    
    const [exampleIndex, setExampleIndex] = useState(0);
    const [code, setCode] = useState(getCodeFromExample(examples[0]));

    const [result, setResult] = useState<string | ShaderObject | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [asyncOutput, setAsyncOutput] = useState<{ text: string, isError: boolean }[]>([]);
    const [status, setStatus] = useState('idle'); // idle, running, success, error, stopped
    const [isDebug, setIsDebug] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [delay, setDelay] = useState(0);
    const currentExample = useMemo(() => examples[exampleIndex] || null, [examples, exampleIndex]);

    const executionState = useRef<{ 
        stopSignal?: { stopped: boolean },
        pauseSignal?: { paused: boolean },
        resumeFn?: () => void 
    } | null>(null);
    
    const sideEffectOutput = useRef('');
    const debugLogLines = useRef<{stack: string, program: string, depth: number}[]>([]);
    const [activeVoiceIds, setActiveVoiceIds] = useState<Set<string>>(new Set());
    const [hasLiveLoops, setHasLiveLoops] = useState(false);
    const cellId = useMemo(() => `cell_${Math.random().toString(36).substr(2, 9)}`, []);
    const justToggledDebugOn = useRef(false);
    const cellStackRef = useRef<any[]>([]);

    // Effect to reset when the list of examples changes (e.g., in Reference page)
    useEffect(() => {
        setExampleIndex(0);
    }, [examples]);

    // Effect to update code and reset cell state when the example index changes
    useEffect(() => {
        const newExample = examples[exampleIndex];
        if (newExample !== undefined) {
            setCode(getCodeFromExample(newExample));
            setResult(null);
            setError(null);
            setStatus('idle');
        }
    }, [exampleIndex, examples, getCodeFromExample]);

    const handleNextExample = () => {
        setExampleIndex(prev => (prev + 1) % examples.length);
    };

    const handlePrevExample = () => {
        setExampleIndex(prev => (prev - 1 + examples.length) % examples.length);
    };

    const handleRunInRepl = () => {
        const codeToRun = getCodeFromExample(currentExample);
        sessionStorage.setItem('yield_repl_code', codeToRun);
        window.location.hash = '#/repl';
    };

    const handleStop = () => {
        if (executionState.current?.stopSignal) {
            executionState.current.stopSignal.stopped = true;
        }
        
        // If execution is paused, we need to resume it briefly so the run loop
        // can check the stop signal and terminate gracefully.
        if (isPaused && executionState.current?.resumeFn) {
            if(executionState.current.pauseSignal) {
                executionState.current.pauseSignal.paused = false;
            }
            setIsPaused(false);
            executionState.current.resumeFn();
        }

        // Replicate hush operator behavior: stop all audio, cancel all scheduled
        // events, and clear the global :loops list to terminate live loops.
        audioEngine.stopAll();
        const loopsListKey = ':loops';
        const loopsListDef = Yield.dictionary[loopsListKey];
        if (loopsListDef && 'body' in loopsListDef && Array.isArray(loopsListDef.body)) {
            loopsListDef.body.length = 0; // Clear the array
        }
        
        setActiveVoiceIds(new Set());
        setHasLiveLoops(false);
    };
    
    const handlePause = () => {
        if (status !== 'running' || !isDebug) return;

        const nextPausedState = !isPaused;
        setIsPaused(nextPausedState);

        if (executionState.current?.pauseSignal) {
            executionState.current.pauseSignal.paused = nextPausedState;
        }

        // If resuming, call the resume function which was set by the interpreter
        if (!nextPausedState && executionState.current?.resumeFn) {
            executionState.current.resumeFn();
        }
    };
    
    const handleAsyncOutput = useCallback((output: string, isError = false) => {
        const trimmedOutput = output.trim();
        if (trimmedOutput) {
            if (!isError && trimmedOutput === 'YIELD_TICK') {
                const stack = cellStackRef.current;
                let stackOutput: string;
                if (stack.length === 1) {
                    stackOutput = yieldFormatter(stack[0]);
                } else {
                    stackOutput = `${stack.map(yieldFormatter).join(' ')}`;
                }
                setResult(stackOutput);
            } else {
                setAsyncOutput(prev => [...prev, { text: trimmedOutput, isError }]);
            }
        }
    }, []);

    const handleRun = useCallback(async () => {
        setStatus('running');
        setIsPaused(false);
        setResult(null);
        setError(null);
        setAsyncOutput([]);
        sideEffectOutput.current = '';
        setActiveVoiceIds(new Set());
        setHasLiveLoops(false);
        debugLogLines.current = []; // Always clear at start of run
        
        const stopSignal = { stopped: false };
        const pauseSignal = { paused: false };
        executionState.current = { 
            stopSignal, 
            pauseSignal,
            resumeFn: undefined
        };

        const runOptions = {
            stopSignal,
            pauseSignal,
            isDebug,
            getDelay: () => (isDebug ? delay : 0),
            setResume: (resumeFn: () => void) => {
                if (executionState.current) {
                    executionState.current.resumeFn = resumeFn;
                }
            },
            onToken: (token, stack, remainingProgram, depth) => {
                if (!isDebug) return;
                
                const stackStr = stack.map(debugFormatter).join(' ');
                const programStr = [debugFormatter(token), ...remainingProgram.map(debugFormatter)].join(' ');
                
                if (delay > 0) {
                    // Step-by-step: show only the current line.
                    const indent = '  '.repeat(depth);
                    const singleLineOutput = `${indent}${stackStr} <- ${programStr}`;
                    setResult(singleLineOutput);
                } else {
                    // Fast debug: accumulate all lines.
                    debugLogLines.current.push({ stack: stackStr, program: programStr, depth });
                }
            },
            onOutput: (str: string) => {
                sideEffectOutput.current += str;
            },
            onAsyncOutput: handleAsyncOutput,
            onVoiceCreated: (voiceId: string) => {
                if (voiceId) setActiveVoiceIds(prev => new Set(prev).add(voiceId));
            },
            onVoiceDestroyed: (voiceId: string) => {
                 if (voiceId) setActiveVoiceIds(prev => {
                    const next = new Set(prev);
                    next.delete(voiceId);
                    return next;
                });
            },
            sourceId: cellId,
        };

        try {
            Yield.reset();
            const program = Yield.parse(code);
            const cellStack: any[] = []; // Each cell execution gets its own fresh stack.
            cellStackRef.current = cellStack; // Keep ref updated for async handler
            await Yield.run(program, cellStack, runOptions);

            const loopsListDef = Yield.dictionary[':loops'];
            if (loopsListDef && 'body' in loopsListDef && Array.isArray(loopsListDef.body) && loopsListDef.body.length > 0) {
                setHasLiveLoops(true);
            }

            if (stopSignal.stopped) {
                const stackOutput = cellStack.map(debugFormatter).join(' ');
                setResult(`${stackOutput}\n(Execution stopped by user)`);
                setStatus('stopped');
            } else {
                 if (isDebug) {
                    if (delay === 0) { // Fast Debug: Show full log at the end
                        const lines = debugLogLines.current;
                        const logOutput = lines.length > 0 ? formatDebugLog(lines) : '';
                        const stackOutput = cellStack.map(debugFormatter).join(' ');

                        let finalOutput = logOutput;
                        if (logOutput) {
                            finalOutput += '\n' + stackOutput;
                        } else {
                            finalOutput = stackOutput;
                        }

                        if (sideEffectOutput.current) {
                            finalOutput += '\n' + sideEffectOutput.current;
                        }
                        setResult(finalOutput);
                    } else { // Step-by-Step Debug: Show final stack at the end
                        const stackOutput = cellStack.map(debugFormatter).join(' ');
                        let finalOutput = stackOutput;
                        if (sideEffectOutput.current) {
                            finalOutput += '\n' + sideEffectOutput.current;
                        }
                        setResult(finalOutput);
                    }
                } else {
                    const lastItem = cellStack.length > 0 ? cellStack[cellStack.length - 1] : null;
                    if (lastItem && lastItem.type === 'shader') {
                        setResult(lastItem as ShaderObject);
                    } else {
                        let stackOutput: string;
                        if (cellStack.length === 1) {
                            stackOutput = yieldFormatter(cellStack[0]);
                        } else {
                            stackOutput = `${cellStack.map(yieldFormatter).join(' ')}`;
                        }
                        let finalOutput = stackOutput;
                        if (sideEffectOutput.current) {
                            finalOutput += '\n' + sideEffectOutput.current;
                        }
                        setResult(finalOutput);
                    }
                }
                setStatus('success');
            }
        } catch (e) {
            console.error(e);
            setError(e.message);
            setResult(null);
            setStatus('error');
        } finally {
            executionState.current = null;
            setIsPaused(false);
        }
    }, [code, isDebug, delay, cellId, handleAsyncOutput]);
    
    const isExecuting = status === 'running';

    const handleToggleDebug = () => {
        if (isExecuting) {
            setIsDebug(!isDebug);
            return;
        }
        if (!isDebug) { // It's currently off, will be turned on.
            justToggledDebugOn.current = true;
        }
        setIsDebug(!isDebug);
    };

    useEffect(() => {
        if (justToggledDebugOn.current) {
            justToggledDebugOn.current = false;
            handleRun();
        }
    }, [isDebug, handleRun]);

    const canStop = isExecuting || activeVoiceIds.size > 0 || hasLiveLoops;
    
    // Determine result box styles
    let resultStyles = 'bg-gray-800 text-white';
    if (status === 'error') resultStyles = 'text-red-600 bg-red-100';
    if (status === 'success' && isDebug) resultStyles = 'bg-gray-900 text-gray-200';
    
    const hasResult = result || error;
    const hasExpectation = currentExample && (
        Array.isArray(currentExample.expected) ||
        currentExample.assert ||
        currentExample.expectedType ||
        currentExample.expectedDescription
    );

    return (
        <div className="cell bg-white p-4 rounded-lg shadow mb-6 border border-gray-200 relative">
            {!compact && (
                <>
                    <div className="flex justify-between items-baseline flex-wrap gap-2">
                        <div className="flex items-baseline space-x-4">
                            <h3 className="text-xl font-bold font-mono text-indigo-600">{cellData.name}</h3>
                            {cellData.aliases && cellData.aliases.length > 0 && (
                                <span className="font-mono text-gray-500 text-sm">
                                    ({cellData.aliases.length > 1 ? 'aliases' : 'alias'}: {cellData.aliases.join(', ')})
                                </span>
                            )}
                            {examples.length > 1 && (
                                <div className="flex items-center space-x-1 text-gray-500">
                                    <button
                                        onClick={handlePrevExample}
                                        title="Previous Example"
                                        className="p-1 rounded-full hover:bg-gray-200"
                                        aria-label="Previous example"
                                    >
                                        &lt;
                                    </button>
                                    <span className="text-sm font-mono select-none" aria-live="polite">
                                        {exampleIndex + 1}/{examples.length}
                                    </span>
                                    <button
                                        onClick={handleNextExample}
                                        title="Next Example"
                                        className="p-1 rounded-full hover:bg-gray-200"
                                        aria-label="Next example"
                                    >
                                        &gt;
                                    </button>
                                </div>
                            )}
                        </div>
                        <span className="font-mono text-sm bg-gray-100 p-1 rounded whitespace-nowrap">{cellData.effect}</span>
                    </div>
                     <p className="mt-2 text-gray-700">{cellData.description}</p>
                </>
            )}

            <div className={`code-block bg-gray-50 p-3 rounded-md border ${compact ? 'mt-0' : 'mt-4'}`}>
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm text-gray-500">Example:</p>
                     <div className="flex items-center space-x-2">
                        <button
                            onClick={isExecuting && isDebug ? handlePause : handleRun}
                            disabled={isExecuting && !isDebug}
                            className="control-btn p-1 rounded-full hover:bg-gray-200 text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                            aria-label={isExecuting ? (isDebug ? (isPaused ? "Resume" : "Pause") : "Running...") : "Run"}
                            title={isExecuting ? (isDebug ? (isPaused ? "Resume" : "Pause") : "Running...") : "Run"}
                        >
                            {isExecuting ? (
                                isDebug ? (
                                    isPaused ? <PlayIcon /> : <PauseIcon />
                                ) : (
                                    <span className="text-xs px-1 animate-pulse">...</span>
                                )
                            ) : (
                                <PlayIcon />
                            )}
                        </button>
                        <button
                            onClick={handleStop}
                            disabled={!canStop}
                            className="control-btn p-1 rounded-full text-gray-600 hover:bg-red-100 hover:text-red-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                            aria-label="Stop example"
                            title="Stop example"
                        >
                            <StopIcon />
                        </button>
                        <button
                            onClick={handleToggleDebug}
                            className={`control-btn p-1 rounded-full hover:bg-gray-200 ${isDebug ? 'text-indigo-600 bg-indigo-100' : 'text-gray-600'}`}
                            aria-label="Toggle Debug Mode"
                            title="Toggle Debug Mode"
                        >
                            <DebugIcon />
                        </button>
                        <button
                            onClick={handleRunInRepl}
                            className="control-btn p-1 rounded-full hover:bg-gray-200 text-gray-600"
                            aria-label="Run in REPL"
                            title="Run in REPL"
                        >
                            <TerminalIcon />
                        </button>
                    </div>
                </div>

                <pre className="fira-code whitespace-pre-wrap text-sm">
                    <code
                        contentEditable={!isExecuting}
                        onBlur={(e) => setCode(e.currentTarget.innerText)}
                        suppressContentEditableWarning={true}
                        className="block outline-none"
                    >
                        {code}
                    </code>
                </pre>
            </div>
            
             {isDebug && (
                <div className="debug-controls mt-2">
                    <label className="block text-sm font-medium text-gray-700">Debug delay: <span className="delay-value font-mono">{delay}</span>ms</label>
                    <input type="range" min="0" max="2000" value={delay} onChange={(e) => setDelay(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
            )}

            {(hasResult || (status === 'idle' && hasExpectation) || asyncOutput.length > 0) && (
                <div className={`output mt-3 rounded-md overflow-hidden`}>
                    {(() => {
                        // Case 1: We have an actual result from running the code.
                        if (hasResult) {
                            if (result && typeof result === 'object' && result.type === 'shader') {
                                return (
                                    <div className="h-96">
                                        <ShaderCanvas shaderCode={result.code} className="w-full h-full" />
                                    </div>
                                );
                            }
                            return (
                                <div className={`p-3 fira-code text-sm ${resultStyles} overflow-x-auto`}>
                                    <p className={`text-sm mb-1 font-semibold ${status === 'error' ? 'text-red-700' : 'text-gray-400'}`}>{error ? 'Error:' : (isDebug ? 'Debug Log:' : 'Result:')}</p>
                                    <pre>{error ? error : (typeof result === 'object' ? null : result)}</pre>
                                </div>
                            );
                        }
        
                        // Case 2: We are idle and have an expectation to show.
                        if (status === 'idle' && currentExample) {
                            if (Array.isArray(currentExample.expected)) {
                                let expectedOutput: string;
                                if (currentExample.expected.length === 1) {
                                    expectedOutput = yieldFormatter(currentExample.expected[0]);
                                } else {
                                    expectedOutput = `[ ${currentExample.expected.map(yieldFormatter).join(' ')} ]`;
                                }
                                return (
                                    <div className={`p-3 fira-code text-sm bg-gray-100 text-gray-500 overflow-x-auto`}>
                                        <p className={`text-sm mb-1 font-semibold text-gray-400`}>Expected:</p>
                                        <pre>{expectedOutput}</pre>
                                    </div>
                                );
                            }
                            // If it's not a simple 'expected' array, show placeholder.
                            return (
                                <div className={`p-3 fira-code text-sm bg-gray-100 text-gray-500 italic overflow-x-auto`}>
                                    <p>Press play to see the result.</p>
                                </div>
                            );
                        }
                        
                        return null;
                    })()}
                    {asyncOutput.length > 0 && (
                        <div className={`p-3 fira-code text-sm bg-gray-800 text-white overflow-x-auto ${hasResult ? 'border-t border-gray-700' : ''}`}>
                            <p className={`text-sm mb-1 font-semibold text-gray-400`}>Async Output:</p>
                            <pre className="whitespace-pre-wrap">
                                {asyncOutput.map((line, i) => (
                                    <div key={i} className={line.isError ? 'text-red-400' : 'text-cyan-400'}>
                                        {line.text}
                                    </div>
                                ))}
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
