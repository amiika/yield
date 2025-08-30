import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Yield } from '../lib/yield-interpreter';
import { simpleFormatter } from '../lib/utils';
import { audioEngine } from '../lib/audio/AudioEngine';

// SVG Icon Components
const PlayIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const PauseIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
);

const StopIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6 6h12v12H6z" />
    </svg>
);

export const NotebookCell = ({ cellData }) => {
    const [code, setCode] = useState(cellData.example);
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, running, paused, success, error, stopped
    const [isDebug, setIsDebug] = useState(false);
    const [delay, setDelay] = useState(1000);
    const executionState = useRef(null);
    const sideEffectOutput = useRef('');
    const [activeVoiceIds, setActiveVoiceIds] = useState<Set<string>>(new Set());
    const cellId = useMemo(() => `cell_${Math.random().toString(36).substr(2, 9)}`, []);


    const handleStop = () => {
        if (executionState.current && executionState.current.stopSignal) {
            executionState.current.stopSignal.stopped = true;
        }
        // Also stop any playing audio from this cell.
        audioEngine.stopAll();
        setActiveVoiceIds(new Set());
    };
    
    const handlePlayPause = useCallback(async () => {
        if (status === 'running') {
            if (executionState.current) {
                executionState.current.pauseSignal.paused = true;
                setStatus('paused');
            }
            return;
        }

        if (status === 'paused') {
            if (executionState.current) {
                executionState.current.pauseSignal.paused = false;
                setStatus('running');
                if (executionState.current.resume) {
                    executionState.current.resume();
                }
            }
            return;
        }

        setStatus('running');
        setOutput('');
        sideEffectOutput.current = '';
        setActiveVoiceIds(new Set());
        const stack = [];
        const stopSignal = { stopped: false };
        const pauseSignal = { paused: false };
        let resumeFunction = null;
        let currentToken = null;
        let stackBefore = [];

        executionState.current = { stopSignal, pauseSignal, resume: () => resumeFunction && resumeFunction() };

        const runOptions = {
            stopSignal,
            pauseSignal,
            isDebug,
            getDelay: () => (isDebug ? delay : 0),
            onToken: (token, currentStack) => {
                currentToken = token;
                stackBefore = JSON.parse(JSON.stringify(currentStack));
            },
            onStep: (currentStack) => {
                const tokenDisplay = simpleFormatter(currentToken);
                const outputStr = `[ ${currentStack.map(simpleFormatter).join(' ')} ]  <- [ ${stackBefore.map(simpleFormatter).join(' ')} ] ${tokenDisplay}`;
                setOutput(outputStr);
            },
            onOutput: (str: string) => {
                sideEffectOutput.current += str;
            },
            setResume: (resume) => { resumeFunction = resume; },
            onVoiceCreated: (voiceId: string) => {
                if (voiceId) {
                    setActiveVoiceIds(prev => new Set(prev).add(voiceId));
                }
            },
            onVoiceDestroyed: (voiceId: string) => {
                 if (voiceId) {
                    setActiveVoiceIds(prev => {
                        const next = new Set(prev);
                        next.delete(voiceId);
                        return next;
                    });
                }
            },
            sourceId: cellId,
        };

        try {
            Yield.reset();
            const program = Yield.parse(code);
            await Yield.run(program, stack, runOptions);

            const stackOutput = `[ ${stack.map(simpleFormatter).join(' ')} ]`;

            if (stopSignal.stopped) {
                setOutput(`${stackOutput}\n(Execution stopped by user)`);
                setStatus('stopped');
            } else {
                let finalOutput = stackOutput;
                if (sideEffectOutput.current) {
                    // Separate stack from output with a newline, then add the output
                    finalOutput += '\n' + sideEffectOutput.current;
                }
                setOutput(finalOutput);
                setStatus('success');
            }
        } catch (error) {
            console.error(error);
            setOutput(`Error: ${error.message}`);
            setStatus('error');
        } finally {
            if (!pauseSignal.paused) {
                executionState.current = null;
            }
        }
    }, [code, status, isDebug, delay, cellId]);
    
    const statusConfig = {
        idle: { color: 'bg-gray-300', title: 'Idle' },
        running: { color: 'bg-blue-500 animate-pulse', title: 'Running' },
        paused: { color: 'bg-blue-500', title: 'Paused' },
        success: { color: 'bg-green-500', title: 'Success' },
        error: { color: 'bg-red-500', title: 'Error' },
        stopped: { color: 'bg-yellow-500', title: 'Stopped' },
    };
    
    const isExecuting = status === 'running' || status === 'paused';
    const canStop = isExecuting || activeVoiceIds.size > 0;
    const baseButtonClasses = "control-btn w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    return (
        <div className="cell bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex items-start space-x-4">
                <div className="cell-controls flex-shrink-0 flex flex-col items-center pt-3 space-y-2">
                    <button
                        onClick={handlePlayPause}
                        className={`${baseButtonClasses} bg-gray-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 focus:ring-indigo-500`}
                        aria-label={status === 'running' ? 'Pause' : 'Play'}>
                        {status === 'running' ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button
                        onClick={handleStop}
                        className={`${baseButtonClasses} bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-600 focus:ring-red-500 disabled:bg-gray-100 disabled:text-gray-400`}
                        disabled={!canStop}
                        aria-label="Stop">
                        <StopIcon />
                    </button>
                    <div className={`status-indicator mt-2 w-2 h-2 rounded-full ${statusConfig[status].color}`} title={statusConfig[status].title}></div>
                </div>
                <div className="flex-grow min-w-0">
                    <h3 className="text-xl font-bold font-mono text-indigo-600">{cellData.name}</h3>
                    <p className="mt-2 mb-3 text-gray-700">
                        {cellData.description}
                        <br />
                        <span className="font-mono text-sm bg-gray-100 p-1 rounded">Stack effect: {cellData.effect}</span>
                    </p>
                    <div className="code-block bg-gray-50 p-3 rounded-md border">
                        <pre>
                            <code
                                contentEditable={!isExecuting}
                                onBlur={(e) => setCode(e.currentTarget.innerText)}
                                suppressContentEditableWarning={true}
                                className="fira-code block outline-none whitespace-pre-wrap"
                            >
                                {code}
                            </code>
                        </pre>
                    </div>
                    <div className="mt-4">
                        <label className="flex items-center space-x-2 text-sm text-gray-600">
                            <input type="checkbox" checked={isDebug} onChange={(e) => setIsDebug(e.target.checked)} disabled={isExecuting} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <span>Debug Mode</span>
                        </label>
                        {isDebug && (
                            <div className="debug-controls mt-2">
                                <label className="block text-sm font-medium text-gray-700">Step Delay: <span className="delay-value font-mono">{delay}</span>ms</label>
                                <input type="range" min="0" max="2000" value={delay} onChange={(e) => setDelay(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        )}
                    </div>
                    {output && <div className={`output mt-3 p-3 rounded-md fira-code min-h-[40px] whitespace-pre-wrap ${status === 'error' ? 'text-red-400 bg-red-100' : 'bg-gray-800 text-white'}`}>{output}</div>}
                </div>
            </div>
        </div>
    );
};