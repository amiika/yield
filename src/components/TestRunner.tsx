
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Yield } from '../lib/yield-interpreter';
import { yieldFormatter, deepEqual } from '../lib/utils';
import { operatorModules } from '../lib/operators';
import { documentation } from '../lib/tutorial';
import { HistoryManager } from '../lib/HistoryManager';
import { audioEngine } from '../lib/audio/AudioEngine';
import type { TestCase, ShaderObject } from '../lib/types';
import { resetUntilCounter } from '../lib/operators/live/until';

// --- Helper Functions & Components ---

const expectedToString = (expected: any[] | undefined): string => {
    if (expected === undefined) return '';
    return expected.map(yieldFormatter).join(' ');
};

const stringToExpected = (str: string): any[] => {
    if (str.trim() === '') return [];
    try {
        // Use the interpreter's parser to handle numbers, strings, and lists
        return Yield.parse(str);
    } catch (e) {
        console.error("Error parsing expected output string:", e);
        // Fallback to treating it as a single string
        return [str];
    }
};

const formatDictionaryState = (dictionary: { [key: string]: any }): string => {
    const userDictionaryEntries = Object.entries(dictionary)
        .filter(([key]) => !Yield.builtInKeys.has(key));

    if (userDictionaryEntries.length === 0) {
        return "Dictionary: (empty)";
    }

    const formattedEntries = userDictionaryEntries.map(([key, valueDef]) => {
        if (valueDef && 'body' in valueDef) {
            return `  ${key}: ${yieldFormatter(valueDef.body)}`;
        }
        return `  ${key}: (unknown format)`;
    }).join('\n');

    return `Dictionary State:\n${formattedEntries}`;
};

const formatFailedTest = (item: TestItem): string => {
    const codeForDisplay = item.currentTest.replCode 
        ? (Array.isArray(item.currentTest.replCode) ? item.currentTest.replCode.join('\n') : item.currentTest.replCode)
        : (Array.isArray(item.currentTest.code) ? item.currentTest.code.join('\n') : String(item.currentTest.code));

    let expectedOutputStr = '';
    if (item.currentTest.expected !== undefined) {
        expectedOutputStr = `( ${expectedToString(item.currentTest.expected)} )`;
    } else if (item.currentTest.assertString !== undefined) {
        expectedOutputStr = `(assert) ${item.currentTest.assertString}`;
    } else if (item.currentTest.assert) {
        expectedOutputStr = `(assert) ${item.currentTest.assert.toString()}`;
    } else if (item.currentTest.async) {
        expectedOutputStr = `(async assert) ${item.currentTest.async.assertDescription || item.currentTest.async.assert.toString()}`;
    } else if (item.currentTest.expectedDescription) {
        expectedOutputStr = item.currentTest.expectedDescription;
    } else if (item.currentTest.expectedType) {
        expectedOutputStr = `A value of type: ${item.currentTest.expectedType}`;
    } else if (item.currentTest.expectedError) {
        expectedOutputStr = `(error) ${item.currentTest.expectedError}`;
    }
    
    let textToCopy = `# --- TEST FAILED: ${item.description} ---`;

    if (item.result.errorMessage?.includes('--- GLSL Source ---')) {
        // For GLSL errors, the error message itself contains the full context.
        textToCopy += `\n# Reason: ${item.result.errorMessage}`;
    } else {
        // For regular errors, add the code that was run.
        textToCopy += `\n# Code:\n# ${codeForDisplay.replace(/\n/g, '\n# ')}`;
        textToCopy += `\n# Reason: ${item.result.errorMessage || 'N/A'}`;
        textToCopy += `\n# Expected: ${expectedOutputStr}\n# Got:   ${item.result.actualOutput || 'N/A'}`;
        if (item.result.dictionaryState) {
            textToCopy += `\n# ${item.result.dictionaryState.replace(/\n/g, '\n# ')}`;
        }
    }

    return textToCopy;
};

// Headless shader compiler for test validation
const compileShaderHeadless = (shaderCode: string): { success: boolean; error: string | null } => {
    // Check if we are in a browser environment
    if (typeof document === 'undefined') {
        return { success: true, error: null }; // Cannot validate in non-browser env, assume pass
    }

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) {
        // Don't fail the test if WebGL2 isn't supported, just warn and skip validation.
        console.warn('Could not create WebGL2 context for shader validation.');
        return { success: true, error: null };
    }

    const vertexShaderSource = `#version 300 es
in vec4 a_position;
void main() {
    gl_Position = a_position;
}`;

    const createShader = (type: number, source: string): WebGLShader | null => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, shaderCode);

    if (!vertexShader || !fragmentShader) {
        return { success: false, error: 'Could not create shader objects.' };
    }
    
    let compileError = null;
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        compileError = gl.getShaderInfoLog(fragmentShader);
    }

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    
    if (compileError) {
        return { success: false, error: compileError };
    }

    return { success: true, error: null };
};


// --- Icon Components ---

const ChevronDownIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
);
const ChevronRightIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);
const CopyIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);
const PlayIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
);
const WarningIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
);


// --- Types ---

interface TestResult {
    status: 'passed' | 'failed' | 'idle';
    actualOutput?: string;
    errorMessage?: string;
    dictionaryState?: string;
}

interface TestItem {
    id: string;
    description: string;
    originalTest: TestCase;
    currentTest: TestCase;
    result: TestResult;
    isExpanded: boolean;
}

type SummaryStatus = 'idle' | 'running' | 'success' | 'failure';

type ExpectationType = 'stack' | 'error' | 'assert' | 'async';

// --- Module-level state for persistence across mounts ---
let cachedTestItems: TestItem[] = [];
let cachedSummaryStatus: SummaryStatus = 'idle';
let hasRunOnce = false;

// --- Core Test Logic (extracted from component) ---

const runTestLogic = async (testCase: TestCase, stopSignal: { stopped: boolean }): Promise<TestResult> => {
    try {
        await audioEngine.init(); // Ensure audio context is ready for live coding tests
    } catch (e) {
        // This can fail on initial headless run, which is okay.
        // Audio tests will fail as expected later.
        console.warn("Could not initialize audio engine for test run.");
    }
    
    // Cleanup function to be called after each test.
    const cleanup = async () => {
        audioEngine.setMuted(false);
        try {
            // hush stops all audio and clears all live loops.
            await Yield.run(Yield.parse('hush'), [], {});
        } catch (cleanupError) {
            console.error("Error during post-test cleanup:", cleanupError);
        }
    };

    // Each test gets a fresh, isolated state.
    Yield.reset();
    audioEngine.setMuted(true); // Muting also stops all current sounds for isolation
    const stack: any[] = [];
    const historyManager = new HistoryManager(Yield.builtInKeys);
    const initialSnapshot = historyManager.createSnapshot(stack, Yield.dictionary);
    historyManager.add(initialSnapshot);
    const commandHistory: string[] = [];
    
    // For async tests
    const asyncOutput: string[] = [];
    const asyncErrors: string[] = [];
    const handleAsyncOutput = (output: string, isError = false) => {
        const trimmed = output.trim();
        if (trimmed) {
            if (isError) {
                asyncErrors.push(trimmed);
            } else {
                asyncOutput.push(trimmed);
            }
        }
    };

    try {
        const runOptions = { 
            stopSignal, 
            historyManager,
            commandHistory,
            parse: Yield.parse,
            onAsyncOutput: handleAsyncOutput
        };
        
        // This block runs the actual test code.
        if (testCase.replCode) {
            const commands = Array.isArray(testCase.replCode) ? testCase.replCode : [testCase.replCode];
            for (const command of commands) {
                if (!command.trim() || stopSignal.stopped) continue;
                commandHistory.push(command);
                const program = Yield.parse(command);
                await Yield.run(program, stack, runOptions);
                const isHistoryCmd = ['undo', 'redo'].includes(command.trim().toLowerCase());
                if (!isHistoryCmd && command.trim().toLowerCase() !== 'again') {
                    const stateAfter = historyManager.createSnapshot(stack, Yield.dictionary);
                    historyManager.add(stateAfter);
                }
            }
        } else if(testCase.code) {
            const program = Yield.parse(Array.isArray(testCase.code) ? testCase.code.join('\n') : testCase.code);
            await Yield.run(program, stack, runOptions);
        }

        if (stopSignal.stopped) return { status: 'failed', errorMessage: 'Test run stopped by user.' };

        // --- Asynchronous Test Assertion ---
        if (testCase.async) {
            return new Promise((resolve) => {
                const doAssert = async () => {
                    let result: TestResult;
                    const dictionaryState = formatDictionaryState(Yield.dictionary);
                    try {
                        if (asyncErrors.length > 0) {
                            result = {
                                status: 'failed',
                                errorMessage: `Async error during test: ${asyncErrors.join('; ')}`,
                                actualOutput: `( ${stack.map(yieldFormatter).join(' ')} )`,
                                dictionaryState,
                            };
                        } else {
                            const assertionPassed = testCase.async.assert(stack, Yield.dictionary, asyncOutput);
                            if (assertionPassed) {
                                result = { status: 'passed' };
                            } else {
                                result = {
                                    status: 'failed',
                                    errorMessage: `Async assertion failed: ${testCase.async.assertDescription || testCase.async.assert.toString()}`,
                                    actualOutput: `( ${stack.map(yieldFormatter).join(' ')} )`,
                                    dictionaryState: dictionaryState,
                                };
                            }
                        }
                    } catch (e) {
                         result = { status: 'failed', errorMessage: `Error during async test: ${e.message}`, dictionaryState: dictionaryState };
                    } finally {
                        await cleanup(); // Cleanup AFTER the async test is done.
                        resolve(result);
                    }
                };

                const assertionTime = audioEngine.getContextTime() + (testCase.async.duration / 1000.0);
                const uniqueAssertId = `test_assert_${Date.now()}_${Math.random()}`;
                
                audioEngine.schedule(uniqueAssertId, assertionTime, doAssert);
            });
        }

        // --- Synchronous Test Assertions ---
        const dictionaryState = formatDictionaryState(Yield.dictionary);
        const lastItem = stack.length > 0 ? stack[stack.length - 1] : null;
        if (lastItem && lastItem.type === 'shader') {
            const compilationResult = compileShaderHeadless(lastItem.code);
            if (!compilationResult.success) {
                const reason = `Shader compilation failed: ${compilationResult.error}\n\n--- GLSL Source ---\n${lastItem.code}`;
                return { status: 'failed', errorMessage: reason, actualOutput: 'N/A', dictionaryState };
            }
        }

        if (testCase.expectedError) {
            return { status: 'failed', errorMessage: 'Expected an error but none was thrown.', actualOutput: `( ${stack.map(yieldFormatter).join(' ')} )`, dictionaryState };
        }
        
        if (testCase.assertString) {
            // eslint-disable-next-line no-eval
            const assertFn = eval(testCase.assertString);
            if (assertFn(stack, Yield.dictionary)) return { status: 'passed' };
            return { status: 'failed', errorMessage: `Assertion failed: ${testCase.assertString}`, actualOutput: `( ${stack.map(yieldFormatter).join(' ')} )`, dictionaryState };
        }

        if (testCase.assert) {
            if (testCase.assert(stack, Yield.dictionary)) return { status: 'passed' };
            return { status: 'failed', errorMessage: `Assertion failed: ${testCase.assert.toString()}`, actualOutput: `( ${stack.map(yieldFormatter).join(' ')} )`, dictionaryState };
        }

        if (testCase.expected !== undefined) {
            if (deepEqual(stack, testCase.expected)) return { status: 'passed' };
            return { status: 'failed', errorMessage: `Stack did not match expected output.`, actualOutput: `( ${stack.map(yieldFormatter).join(' ')} )`, dictionaryState };
        }

        return { status: 'passed' }; // No expectation = pass
    } catch (error) {
        const dictionaryState = formatDictionaryState(Yield.dictionary);
        if (testCase.expectedError) {
            if (error.message.includes(testCase.expectedError)) return { status: 'passed' };
            return { status: 'failed', errorMessage: `Error message mismatch. Expected to find "${testCase.expectedError}"`, actualOutput: error.message, dictionaryState };
        }
        return { status: 'failed', errorMessage: `${error.message}`, actualOutput: 'N/A', dictionaryState };
    } finally {
        // For synchronous tests, cleanup happens here. Async tests clean up inside the promise.
        if (!testCase.async) {
            await cleanup();
        }
    }
};

const loadTestsLogic = (): TestItem[] => {
    const tests: TestItem[] = [];
    let idCounter = 0;
    
    // Load tests from operator modules
    for (const category of Object.values(operatorModules)) {
        for (const opName in category.definitions) {
            const operator = category.definitions[opName];
            if (operator.examples) {
                operator.examples.forEach((testCase, index) => {
                    tests.push({
                        id: `op-${idCounter}`,
                        // FIX: Remove '#' from test description to match user's apparent intent.
                        description: `${idCounter}: ${category.name}: ${opName}`,
                        originalTest: testCase,
                        currentTest: testCase,
                        result: { status: 'idle' },
                        isExpanded: false,
                    });
                    idCounter++;
                });
            }
        }
    }

    // Load tests from tutorial documentation
    for (const section of documentation) {
        for (const cell of section.cells) {
// FIX: Add support for async tests from tutorial documentation.
             if (cell.expected !== undefined || cell.assert !== undefined || cell.expectedError !== undefined || cell.replCode !== undefined || cell.async !== undefined) {
                const testCase: TestCase = {
                    code: Array.isArray(cell.example) ? cell.example.join('\n') : cell.example,
                    replCode: cell.replCode,
                    expected: cell.expected,
                    assert: cell.assert,
                    async: cell.async,
                    expectedDescription: cell.expectedDescription,
                    expectedError: cell.expectedError
                };
                tests.push({
                    id: `doc-${idCounter}`,
                    // FIX: Remove '#' from test description to match user's apparent intent.
                    description: `${idCounter}: Docs: ${section.name}: ${cell.name}`,
                    originalTest: testCase,
                    currentTest: testCase,
                    result: { status: 'idle' },
                    isExpanded: false,
                });
                idCounter++;
            }
        }
    }
    return tests;
};

// FIX: Define getInitialExpectationType to resolve missing name error.
const getInitialExpectationType = (testCase: TestCase): ExpectationType => {
    if (testCase.async) {
        return 'async';
    }
    if (testCase.expectedError) {
        return 'error';
    }
    if (testCase.assert || testCase.assertString) {
        return 'assert';
    }
    return 'stack';
};

// --- Test Case Runner Component ---
const TestCaseRunner = ({ item, onRun, onToggleExpand }) => {
    const codeContent = item.currentTest.replCode 
        ? (Array.isArray(item.currentTest.replCode) ? item.currentTest.replCode.join('\n') : item.currentTest.replCode)
        : (Array.isArray(item.currentTest.code) ? item.currentTest.code.join('\n') : String(item.currentTest.code));

    const [code, setCode] = useState(codeContent);
    const [expectationType, setExpectationType] = useState<ExpectationType>(() => getInitialExpectationType(item.currentTest));
    const [expectedStack, setExpectedStack] = useState(() => expectedToString(item.currentTest.expected));
    const [expectedError, setExpectedError] = useState(() => item.currentTest.expectedError || '');
    const [assertString, setAssertString] = useState(() => item.currentTest.assert?.toString() || item.currentTest.assertString || '');
    const [asyncAssertString, setAsyncAssertString] = useState(() => item.currentTest.async?.assertDescription || item.currentTest.async?.assert.toString() || '');
    const [copyButtonText, setCopyButtonText] = useState('');
    const [copyIssueButtonText, setCopyIssueButtonText] = useState('Copy Issue');

    // Sync local state when the item prop changes from the parent
    useEffect(() => {
        const newCodeContent = item.currentTest.replCode 
            ? (Array.isArray(item.currentTest.replCode) ? item.currentTest.replCode.join('\n') : item.currentTest.replCode)
            : (Array.isArray(item.currentTest.code) ? item.currentTest.code.join('\n') : String(item.currentTest.code));
        setCode(newCodeContent);
        setExpectationType(getInitialExpectationType(item.currentTest));
        setExpectedStack(expectedToString(item.currentTest.expected));
        setExpectedError(item.currentTest.expectedError || '');
        setAssertString(item.currentTest.assert?.toString() || item.currentTest.assertString || '');
        setAsyncAssertString(item.currentTest.async?.assertDescription || item.currentTest.async?.toString() || '');
    }, [item.currentTest]);

    const handleRun = () => {
        const updatedTest: TestCase = {
            ...item.currentTest,
            // Reset all expectation types before setting the one from the UI
            expected: undefined,
            expectedError: undefined,
            assert: undefined,
            assertString: undefined,
            async: undefined,
            expectedDescription: undefined,
            expectedType: undefined,
        };

        if (item.currentTest.replCode) {
            updatedTest.replCode = code;
        } else {
            updatedTest.code = code;
        }
    
        switch (expectationType) {
            case 'stack':
                updatedTest.expected = stringToExpected(expectedStack);
                break;
            case 'error':
                updatedTest.expectedError = expectedError;
                break;
            case 'assert':
                updatedTest.assertString = assertString;
                break;
            case 'async':
                // For now, re-running async tests uses the original assertion logic.
                // A UI for editing async assertions is a future improvement.
                updatedTest.async = item.originalTest.async;
                break;
        }
    
        onRun(item.id, updatedTest);
    };
    
    const handleCopy = (e) => {
        e.stopPropagation();
        
        const codeForDisplay = Array.isArray(item.currentTest.code) 
            ? item.currentTest.code.join('\n') 
            : String(item.currentTest.code);
        
        let expectedOutputStr = '';
        if (item.currentTest.expected !== undefined) {
            expectedOutputStr = `( ${item.currentTest.expected.map(yieldFormatter).join(' ')} )`;
        } else if (item.currentTest.expectedDescription) {
            expectedOutputStr = item.currentTest.expectedDescription;
        } else if (item.currentTest.expectedType) {
            expectedOutputStr = `A value of type: ${item.currentTest.expectedType}`;
        } else if (item.currentTest.assertString) {
             expectedOutputStr = `Custom assertion: ${item.currentTest.assertString}`;
        } else if (item.currentTest.assert) {
            expectedOutputStr = `Custom assertion: ${item.currentTest.assert.toString()}`;
        }

        const textToCopy = `Implement this test for ${item.description}

Code:
${codeForDisplay}

Expected:
${expectedOutputStr}`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopyButtonText('Copied!');
            setTimeout(() => setCopyButtonText(''), 2000);
        });
    };
    
    const handleCopyIssue = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(formatFailedTest(item)).then(() => {
            setCopyIssueButtonText('Copied!');
            setTimeout(() => setCopyIssueButtonText('Copy Issue'), 2000);
        });
    };
    
    const statusClasses = {
        passed: {
            border: 'border-green-200',
            bg: 'bg-green-50/50',
            headerBg: 'hover:bg-green-100',
            text: 'text-green-500',
            title: 'text-gray-700',
        },
        failed: {
            border: 'border-red-200',
            bg: 'bg-red-50',
            headerBg: 'hover:bg-red-100',
            text: 'text-red-500',
            title: 'text-gray-800',
        },
        idle: {
            border: 'border-gray-200',
            bg: 'bg-white',
            headerBg: 'hover:bg-gray-100',
            text: 'text-gray-400',
            title: 'text-gray-600',
        },
    };
    
    const classes = statusClasses[item.result.status];

    return (
        <div className={`test-case-runner p-3 rounded-md border ${classes.border} ${classes.bg}`}>
            <div className={`flex items-center cursor-pointer p-1 -m-1 rounded ${classes.headerBg}`} onClick={onToggleExpand}>
                <div className="flex-shrink-0 w-6">
                    {item.isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </div>
                <span className={`${classes.text} font-bold mr-3 uppercase text-sm`}>[{item.result.status}]</span>
                <p className={`${classes.title} flex-grow`}>{item.description}</p>
                <button onClick={handleCopy} className="repl-btn text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 p-1.5 h-auto rounded-md" title="Copy Code">
                    {copyButtonText ? copyButtonText : <CopyIcon />}
                </button>
            </div>

            {item.isExpanded && (
                <div className="mt-3 pt-3 border-t pl-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Code:</label>
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full p-2 rounded text-sm fira-code border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-gray-100"
                                rows={Math.max(3, code.split('\n').length)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Expectation Type:</label>
                            <div className="flex space-x-4 mb-2">
                                <label className="flex items-center text-sm">
                                    <input type="radio" value="stack" checked={expectationType === 'stack'} onChange={() => setExpectationType('stack')} className="mr-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"/>
                                    Stack
                                </label>
                                <label className="flex items-center text-sm">
                                    <input type="radio" value="error" checked={expectationType === 'error'} onChange={() => setExpectationType('error')} className="mr-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"/>
                                    Error
                                </label>
                                <label className="flex items-center text-sm">
                                    <input type="radio" value="assert" checked={expectationType === 'assert'} onChange={() => setExpectationType('assert')} className="mr-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    Assert
                                </label>
                                <label className="flex items-center text-sm">
                                    <input type="radio" value="async" checked={expectationType === 'async'} onChange={() => setExpectationType('async')} className="mr-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                    Async
                                </label>
                            </div>
                            
                            {expectationType === 'stack' && (
                                 <input
                                    type="text"
                                    value={expectedStack}
                                    onChange={(e) => setExpectedStack(e.target.value)}
                                    placeholder={'e.g., 10 "hello"'}
                                    className="w-full p-2 rounded text-sm fira-code border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-gray-100"
                                />
                            )}
                             {expectationType === 'error' && (
                                <input
                                    type="text"
                                    value={expectedError}
                                    onChange={(e) => setExpectedError(e.target.value)}
                                    placeholder={'e.g., Stack underflow'}
                                    className="w-full p-2 rounded text-sm fira-code border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-gray-100"
                                />
                            )}
                            {expectationType === 'assert' && (
                                <textarea
                                    value={assertString}
                                    onChange={(e) => setAssertString(e.target.value)}
                                    placeholder="for example: s => s.length === 1"
                                    className="w-full p-2 rounded text-sm fira-code border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-gray-100"
                                    rows={3}
                                />
                            )}
                             {expectationType === 'async' && (
                                <textarea
                                    value={asyncAssertString}
                                    readOnly
                                    className="w-full p-2 rounded text-sm fira-code border border-gray-400 bg-gray-700 text-gray-300 cursor-not-allowed"
                                    rows={3}
                                />
                            )}
                           
                            {item.result.status !== 'passed' && item.result.status !== 'idle' && (
                                <div className="mt-2 text-sm">
                                    <p className="fira-code text-gray-700 whitespace-pre-wrap">
                                        <span className="font-semibold">Reason:</span> {item.result.errorMessage}
                                    </p>
                                    <p className={`fira-code ${classes.text}`}>
                                        <span className="font-semibold">Actual:</span> {item.result.actualOutput || 'N/A'}
                                    </p>
                                    {item.result.dictionaryState && (
                                        <pre className={`fira-code text-gray-500 mt-2 p-2 bg-gray-900 text-xs rounded whitespace-pre-wrap`}>
                                            {item.result.dictionaryState}
                                        </pre>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end items-center space-x-2">
                        {item.result.status === 'failed' && (
                            <button onClick={handleCopyIssue} className="repl-btn bg-amber-500 hover:bg-amber-600 text-white text-sm flex items-center space-x-2">
                                <WarningIcon />
                                <span>{copyIssueButtonText}</span>
                            </button>
                        )}
                        <button onClick={handleRun} className="repl-btn repl-btn-primary text-sm flex items-center space-x-2">
                             <PlayIcon />
                            <span>Re-run This Test</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export const TestRunner = () => {
    const [testItems, setTestItems] = useState<TestItem[]>(cachedTestItems);
    const [isRunning, setIsRunning] = useState(false);
    const [summaryStatus, setSummaryStatus] = useState<SummaryStatus>(cachedSummaryStatus);
    const [filter, setFilter] = useState<'all' | 'passed' | 'failed' | 'idle'>('all');
    const [progress, setProgress] = useState({ completed: 0, total: 0 });
    const [copyAllFailedText, setCopyAllFailedText] = useState('Copy Issues');
    const stopSignal = useRef({ stopped: false });

    const runTest = useCallback(async (testCase: TestCase): Promise<TestResult> => {
        return runTestLogic(testCase, stopSignal.current);
    }, []);

    const handleRunAll = useCallback(async () => {
        setIsRunning(true);
        setSummaryStatus('running');
        stopSignal.current.stopped = false;
        
        resetUntilCounter(); // Ensure isolated test runs for 'until' operator

        const testsToRun = loadTestsLogic();
        setTestItems(testsToRun);
        setProgress({ completed: 0, total: testsToRun.length });
        
        let allPassed = true;
        const updatedItems = [...testsToRun];

        for (let i = 0; i < updatedItems.length; i++) {
            if (stopSignal.current.stopped) break;

            const item = updatedItems[i];
            const result = await runTest(item.currentTest);
            
            if (result.status === 'failed') {
                allPassed = false;
            }
            
            updatedItems[i] = { ...item, result, isExpanded: result.status === 'failed' };
            setProgress({ completed: i + 1, total: updatedItems.length });

            // Batch state updates to keep UI responsive
            if (i % 5 === 0 || i === updatedItems.length - 1) {
                setTestItems([...updatedItems]);
                await new Promise(resolve => setTimeout(resolve, 0)); // Yield to main thread
            }
        }
        
        // Sort failed tests to the top
        updatedItems.sort((a, b) => {
            if (a.result.status === 'failed' && b.result.status !== 'failed') return -1;
            if (a.result.status !== 'failed' && b.result.status === 'failed') return 1;
            return 0;
        });

        setTestItems(updatedItems);
        cachedTestItems = updatedItems;
        setSummaryStatus(allPassed ? 'success' : 'failure');
        cachedSummaryStatus = allPassed ? 'success' : 'failure';
        setIsRunning(false);
        hasRunOnce = true;

    }, [runTest]);
    
    useEffect(() => {
        // This effect manages the initial automatic test run, ensuring the audio engine is ready.
        const runTestsOnReady = () => {
            if (!hasRunOnce) {
                handleRunAll();
            }
        };
    
        // If audio is already ready (e.g., user navigated from another page), run tests.
        if (audioEngine.isReady()) {
            runTestsOnReady();
            return;
        }
    
        // If audio is not ready, load the test list so the UI isn't empty and shows "idle" status.
        if (!hasRunOnce) {
            const initialTests = loadTestsLogic();
            setTestItems(initialTests);
            setProgress({ completed: 0, total: initialTests.length });
        } else {
            // On subsequent mounts (less likely for this page), just show cached results.
            setTestItems(cachedTestItems);
            setSummaryStatus(cachedSummaryStatus);
        }
        
        // Subscribe to the audio engine's ready event. The global listener in index.tsx
        // will call audioEngine.init() on the first user interaction, which will trigger this callback.
        audioEngine.onReady(runTestsOnReady);
    
        // Cleanup: remove the listener if the component unmounts before the engine is ready.
        return () => {
            audioEngine.offReady(runTestsOnReady);
        };
    }, [handleRunAll]);

    const handleRunSingleTest = useCallback(async (id: string, testToRun: TestCase) => {
        resetUntilCounter(); // Ensure isolated test runs for 'until' operator

        const itemIndex = testItems.findIndex(item => item.id === id);
        if (itemIndex === -1) return;

        const result = await runTestLogic(testToRun, { stopped: false });
        
        setTestItems(prev => {
            const newItems = [...prev];
            newItems[itemIndex] = { ...newItems[itemIndex], currentTest: testToRun, result };
            cachedTestItems = newItems;
            return newItems;
        });
        
    }, [testItems]);

    const handleCopyAllFailed = () => {
        const failedTests = testItems.filter(item => item.result.status === 'failed');
        if (failedTests.length === 0) return;
    
        const allIssues = failedTests.map(formatFailedTest).join('\n\n\n');
    
        navigator.clipboard.writeText(allIssues).then(() => {
            setCopyAllFailedText('Copied!');
            setTimeout(() => setCopyAllFailedText('Copy Issues'), 2000);
        });
    };
    
    const handleToggleExpand = (id: string) => {
        setTestItems(prev => {
            const newItems = prev.map(item =>
                item.id === id ? { ...item, isExpanded: !item.isExpanded } : item
            );
            cachedTestItems = newItems;
            return newItems;
        });
    };

    const handleStop = () => {
        stopSignal.current.stopped = true;
        setIsRunning(false);
    };
    
    const filteredItems = testItems.filter(item => {
        if (filter === 'all') return true;
        return item.result.status === filter;
    });

    const passedCount = testItems.filter(item => item.result.status === 'passed').length;
    const failedCount = testItems.filter(item => item.result.status === 'failed').length;
    const idleCount = testItems.filter(item => item.result.status === 'idle').length;

    return (
        <div className="test-runner-container bg-gray-50 p-4 rounded-lg shadow-inner">
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 py-3">
                <div className="flex items-center space-x-4">
                     {isRunning ? (
                         <button onClick={handleStop} className="repl-btn bg-red-500 hover:bg-red-600 text-white">Stop</button>
                     ) : (
                         <button onClick={handleRunAll} disabled={isRunning} className="repl-btn repl-btn-primary">Run All Tests</button>
                     )}
                     {failedCount > 0 && !isRunning && (
                        <button onClick={handleCopyAllFailed} className="repl-btn bg-amber-500 hover:bg-amber-600 text-white flex items-center space-x-2">
                            <WarningIcon />
                            <span>{copyAllFailedText}</span>
                        </button>
                     )}
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                    <button onClick={() => setFilter('all')} className={`px-2 py-1 rounded ${filter === 'all' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}>All ({testItems.length})</button>
                    <button onClick={() => setFilter('passed')} className={`px-2 py-1 rounded ${filter === 'passed' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}>Passed ({passedCount})</button>
                    <button onClick={() => setFilter('failed')} className={`px-2 py-1 rounded ${filter === 'failed' ? 'bg-red-100 text-red-700' : 'text-gray-600'}`}>Failed ({failedCount})</button>
                    {idleCount > 0 && <button onClick={() => setFilter('idle')} className={`px-2 py-1 rounded ${filter === 'idle' ? 'bg-gray-200 text-gray-700' : 'text-gray-600'}`}>Idle ({idleCount})</button>}
                </div>

                <div className={`summary-status text-lg font-bold ${
                    summaryStatus === 'running' ? 'text-gray-500' :
                    summaryStatus === 'success' ? 'text-green-500' :
                    summaryStatus === 'failure' ? 'text-red-500' : 'text-gray-700'
                }`}>
                    {isRunning && <span className="animate-pulse">Running... ({progress.completed} / {progress.total || testItems.length})</span>}
                    {!isRunning && summaryStatus === 'success' && 'All Tests Passed!'}
                    {!isRunning && summaryStatus === 'failure' && `${failedCount} / ${testItems.length} Tests Failed`}
                    {!isRunning && summaryStatus === 'idle' && 'Ready to run tests.'}
                </div>
            </div>
            
            <div className="space-y-2">
                {filteredItems.map(item => (
                    <TestCaseRunner
                        key={item.id}
                        item={item}
                        onRun={handleRunSingleTest}
                        onToggleExpand={() => handleToggleExpand(item.id)}
                    />
                ))}
            </div>
        </div>
    );
};