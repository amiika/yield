import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Yield } from '../lib/yield-interpreter';
import { simpleFormatter } from '../lib/utils';
import { audioEngine } from '../lib/audio/AudioEngine';

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


export const NotebookCell = ({ cellData, compact = false }) => {
    const [code, setCode] = useState(cellData.example);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState('idle'); // idle, running, success, error, stopped
    const [isDebug, setIsDebug] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [delay, setDelay] = useState(1000);

    const executionState = useRef<{ 
        stopSignal?: { stopped: boolean },
        pauseSignal?: { paused: boolean },
        resumeFn?: () => void 
    } | null>(null);
    
    const sideEffectOutput = useRef('');
    const [activeVoiceIds, setActiveVoiceIds] = useState<Set<string>>(new Set());
    const cellId = useMemo(() => `cell_${Math.random().toString(36).substr(2, 9)}`, []);

    // Effect to reset result when code example changes (e.g., in Reference page)
    useEffect(() => {
        setCode(cellData.example);
        setResult(null); // Clear result when the underlying example changes.
        setError(null);
        setStatus('idle');
    }, [cellData.example]);


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

        audioEngine.stopAll();
        setActiveVoiceIds(new Set());
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
    
    const handleRun = useCallback(async () => {
        setStatus('running');
        setIsPaused(false);
        setResult(null);
        setError(null);
        sideEffectOutput.current = '';
        setActiveVoiceIds(new Set());
        
        const stopSignal = { stopped: false };
        const pauseSignal = { paused: false };
        executionState.current = { 
            stopSignal, 
            pauseSignal,
            resumeFn: undefined
        };

        let currentToken = null;
        let stackBefore = [];

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
            onToken: (token, currentStack) => {
                currentToken = token;
                stackBefore = JSON.parse(JSON.stringify(currentStack));
            },
            onStep: (currentStack) => {
                const tokenDisplay = simpleFormatter(currentToken);
                const outputStr = `[ ${currentStack.map(simpleFormatter).join(' ')} ]  <- [ ${stackBefore.map(simpleFormatter).join(' ')} ] ${tokenDisplay}`;
                setResult(outputStr);
            },
            onOutput: (str: string) => {
                sideEffectOutput.current += str;
            },
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
            const cellStack = []; // Each cell execution gets its own fresh stack.
            await Yield.run(program, cellStack, runOptions);

            const stackOutput = `[ ${cellStack.map(simpleFormatter).join(' ')} ]`;

            if (stopSignal.stopped) {
                setResult(`${stackOutput}\n(Execution stopped by user)`);
                setStatus('stopped');
            } else {
                let finalOutput = stackOutput;
                if (sideEffectOutput.current) {
                    finalOutput += '\n' + sideEffectOutput.current;
                }
                setResult(finalOutput);
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
    }, [code, isDebug, delay, cellId]);
    
    const isExecuting = status === 'running';
    const canStop = isExecuting || activeVoiceIds.size > 0;
    
    // Determine result box styles
    let resultStyles = 'bg-gray-800 text-white';
    if (status === 'error') resultStyles = 'text-red-600 bg-red-100';
    if (status === 'success' && isDebug) resultStyles = 'text-blue-600 bg-blue-100';

    return (
        <div className="cell bg-white p-4 rounded-lg shadow mb-6 border border-gray-200 relative">
            {!compact && (
                <>
                    <div className="flex justify-between items-baseline flex-wrap gap-2">
                        <h3 className="text-xl font-bold font-mono text-indigo-600">{cellData.name}</h3>
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
                            onClick={() => setIsDebug(!isDebug)}
                            className={`control-btn p-1 rounded-full hover:bg-gray-200 ${isDebug ? 'text-indigo-600 bg-indigo-100' : 'text-gray-600'}`}
                            aria-label="Toggle Debug Mode"
                            title="Toggle Debug Mode"
                        >
                            <DebugIcon />
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

            {(result || error) && (
                 <div className={`output mt-3 p-3 rounded-md fira-code whitespace-pre-wrap text-sm ${resultStyles}`}>
                    <p className={`text-sm mb-1 font-semibold ${status === 'error' ? 'text-red-700' : 'text-gray-400'}`}>{error ? 'Error:' : 'Result:'}</p>
                    <pre>{error ? error : result}</pre>
                </div>
            )}
        </div>
    );
};