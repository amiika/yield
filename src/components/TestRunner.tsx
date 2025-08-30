import React, { useState, useEffect, useCallback } from 'react';
import { Yield } from '../lib/yield-interpreter';
import { simpleFormatter, deepEqual } from '../lib/utils';
import { operatorModules } from '../lib/operators';
import { HistoryManager } from '../lib/HistoryManager';
import type { TestCase } from '../lib/types';

// --- Helper Functions & Components ---

const expectedToString = (expected: any[] | undefined): string => {
    if (expected === undefined) return '';
    return expected.map(simpleFormatter).join(' ').replace(/^"(.*)"$/, '$1').replace(/^\[(.*)\]$/, '$1');
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
    status: 'passed' | 'failed' | 'error';
    actualOutput?: string;
    errorMessage?: string;
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

// --- Test Case Runner Component ---
// FIX: Removed unused `onUpdate` prop to resolve type error as it's not passed down.
const TestCaseRunner = ({ item, onRun, onToggleExpand }) => {
    const [code, setCode] = useState(Array.isArray(item.currentTest.code) ? item.currentTest.code.join('\n') : item.currentTest.code);
    const [expected, setExpected] = useState(expectedToString(item.currentTest.expected));
    const [copyButtonText, setCopyButtonText] = useState('');
    const [copyIssueButtonText, setCopyIssueButtonText] = useState('Copy Issue');

    const isAssertTest = !!item.originalTest.assert;

    const handleRun = () => {
        onRun(item.id, { ...item.currentTest, code, expected: stringToExpected(expected) });
    };
    
    const handleCopy = (e) => {
        e.stopPropagation();
        
        const codeForDisplay = Array.isArray(item.currentTest.code) 
            ? item.currentTest.code.join('\n') 
            : item.currentTest.code;
        
        let expectedOutputStr = '';
        if (item.currentTest.expected !== undefined) {
            expectedOutputStr = `[ ${item.currentTest.expected.map(simpleFormatter).join(' ')} ]`;
        } else if (item.currentTest.expectedDescription) {
            expectedOutputStr = item.currentTest.expectedDescription;
        } else if (item.currentTest.expectedType) {
            expectedOutputStr = `A value of type: ${item.currentTest.expectedType}`;
        } else if (item.currentTest.assert) {
            expectedOutputStr = 'Custom assertion logic';
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

        const codeForDisplay = Array.isArray(item.currentTest.code) 
            ? item.currentTest.code.join('\n') 
            : item.currentTest.code;

        let expectedOutputStr = '';
        if (item.currentTest.expected !== undefined) {
            expectedOutputStr = `[ ${expectedToString(item.currentTest.expected)} ]`;
        } else if (item.currentTest.expectedDescription) {
            expectedOutputStr = item.currentTest.expectedDescription;
        } else if (item.currentTest.expectedType) {
            expectedOutputStr = `A value of type: ${item.currentTest.expectedType}`;
        } else if (item.currentTest.assert) {
            expectedOutputStr = 'Custom assertion logic';
        }
        
        const textToCopy = `--- Yield Test Failure ---

Operator: ${item.description}

Code:
${codeForDisplay}

Expected:
${expectedOutputStr}

Failure Reason:
${item.result.errorMessage || 'N/A'}

Actual Output:
${item.result.actualOutput || 'N/A'}`;

        navigator.clipboard.writeText(textToCopy).then(() => {
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
        error: {
            border: 'border-yellow-300',
            bg: 'bg-yellow-50',
            headerBg: 'hover:bg-yellow-100',
            text: 'text-yellow-600',
            title: 'text-gray-800',
        }
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
                                className="w-full p-2 rounded text-sm fira-code border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                rows={Math.max(3, code.split('\n').length)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Expected Stack:</label>
                            <input
                                type="text"
                                value={isAssertTest ? '' : expected}
                                onChange={(e) => setExpected(e.target.value)}
                                disabled={isAssertTest}
                                placeholder={isAssertTest ? 'Custom assertion in code' : 'e.g., 10 "hello"'}
                                className="w-full p-2 rounded text-sm fira-code border border-gray-300 disabled:bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {item.result.status !== 'passed' && (
                                <div className="mt-2 text-sm">
                                    <p className="fira-code text-gray-700">
                                        <span className="font-semibold">Reason:</span> {item.result.errorMessage}
                                    </p>
                                    <p className={`fira-code ${classes.text}`}>
                                        <span className="font-semibold">Actual:</span> {item.result.actualOutput || 'N/A'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end items-center space-x-2">
                        {item.result.status !== 'passed' && (
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
    const [testItems, setTestItems] = useState<TestItem[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [summaryStatus, setSummaryStatus] = useState<SummaryStatus>('idle');
    const [copyButtonText, setCopyButtonText] = useState('Copy Failed Tests');

    const runTest = useCallback(async (testCase: TestCase): Promise<TestResult> => {
        const { code, assert, expected, expectedType, expectedDescription } = testCase;
        
        try {
            Yield.reset();
            const stack = [];
            const commands = Array.isArray(code) ? code : [code];
            const historyManager = new HistoryManager(Yield.builtInKeys);
            historyManager.add(historyManager.createSnapshot(stack, Yield.dictionary));
            const commandHistory: string[] = [];
            
            for (const command of commands) {
                commandHistory.push(command);
                const program = Yield.parse(command);
                await Yield.run(program, stack, { historyManager, commandHistory });
                const processedCmd = command.trim().toLowerCase();
                if (processedCmd !== 'undo' && processedCmd !== 'redo' && processedCmd !== 'again') {
                     const stateAfter = historyManager.createSnapshot(stack, Yield.dictionary);
                     historyManager.add(stateAfter);
                }
            }

            let passed = true;
            if (expected !== undefined) {
                passed = deepEqual(stack, expected);
            } else if (assert) {
                passed = assert(stack);
            }

            if (passed) {
                return { status: 'passed' };
            } else {
                const actualOutput = `[ ${stack.map(simpleFormatter).join(' ')} ]`;
                let expectedOutputStr: string | undefined;
                if (expected !== undefined) expectedOutputStr = `[ ${expected.map(simpleFormatter).join(' ')} ]`;
                else if (expectedDescription) expectedOutputStr = expectedDescription;
                else if (expectedType) expectedOutputStr = `A value of type: ${expectedType}`;

                const failureReason = assert ? 'Assertion failed.' : 'Output does not match expected value.';
                return { status: 'failed', actualOutput, errorMessage: failureReason };
            }
        } catch (e) {
            return { status: 'error', errorMessage: e.message };
        }
    }, []);

    const runAllTests = useCallback(async () => {
        setIsRunning(true);
        setTestItems([]);
        setSummaryStatus('running');

        const allTestCases = Object.values(operatorModules).flatMap((category, catIndex) =>
            Object.entries(category.definitions).flatMap(([opName, op]) =>
                op.testCases.map((testCase: TestCase, testIndex: number) => ({
                    id: `${category.name}-${opName}-${testIndex}`,
                    description: `${category.name}: ${opName}`,
                    originalTest: testCase,
                    currentTest: { ...testCase },
                }))
            )
        );

        const finalTestItems = [];
        for (const item of allTestCases) {
            const result = await runTest(item.currentTest);
            finalTestItems.push({
                ...item,
                result: result,
                isExpanded: result.status !== 'passed',
            });
        }

        setTestItems(finalTestItems);
        setIsRunning(false);
        setSummaryStatus(finalTestItems.some(item => item.result.status !== 'passed') ? 'failure' : 'success');
    }, [runTest]);
    
    useEffect(() => {
        runAllTests();
    }, [runAllTests]);

    const runSingleTest = async (itemId: string, updatedTest: TestCase) => {
        const result = await runTest(updatedTest);
        setTestItems(prevItems => prevItems.map(item => 
            item.id === itemId 
                ? { ...item, currentTest: updatedTest, result, isExpanded: true } // Always expand after running
                : item
        ));
    };
    
    const handleToggleExpand = (itemId: string) => {
        setTestItems(prevItems => prevItems.map(item => 
            item.id === itemId ? { ...item, isExpanded: !item.isExpanded } : item
        ));
    };

    const passedTests = testItems.filter(i => i.result.status === 'passed');
    const failedTests = testItems.filter(i => i.result.status !== 'passed');
    
    const summaryBgColor = { idle: 'bg-gray-50', running: 'bg-blue-50', success: 'bg-green-50', failure: 'bg-red-50' }[summaryStatus];

    const handleCopyFailedTests = () => {
        const failedCode = failedTests.map(item => {
const codeForDisplay = Array.isArray(item.currentTest.code) ? item.currentTest.code.join('\n') : item.currentTest.code;
const expectedOutputStr = `[ ${expectedToString(item.currentTest.expected)} ]`;
return `# --- TEST FAILED: ${item.description} ---
# Reason: ${item.result.errorMessage}
# Expected: ${expectedOutputStr || 'N/A'}
# Got:   ${item.result.actualOutput || 'N/A'}
${codeForDisplay}`
        }).join('\n\n');

        navigator.clipboard.writeText(failedCode).then(() => {
            setCopyButtonText('Copied!');
            setTimeout(() => setCopyButtonText('Copy Failed Tests'), 2000);
        }).catch(err => console.error('Failed to copy tests:', err));
    };

    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-800">Test Suite</h2>
                <button onClick={runAllTests} disabled={isRunning} className="repl-btn repl-btn-primary">
                    {isRunning ? 'Running...' : 'Re-run All Tests'}
                </button>
            </div>
            
            {(testItems.length > 0 || isRunning) && (
                 <div className={`mb-6 p-4 rounded-lg border ${summaryBgColor}`}>
                    <h3 className="text-xl font-semibold mb-2">Summary</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div><p className="text-3xl font-bold text-green-600">{passedTests.length}</p><p className="text-sm text-gray-600">Passed</p></div>
                        <div><p className={`text-3xl font-bold ${failedTests.length > 0 ? 'text-red-600' : 'text-gray-700'}`}>{failedTests.length}</p><p className="text-sm text-gray-600">Failed</p></div>
                        <div><p className="text-3xl font-bold text-gray-700">{testItems.length}</p><p className="text-sm text-gray-600">Total</p></div>
                    </div>
                </div>
            )}

            {failedTests.length > 0 && (
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                        <h3 className="text-2xl font-semibold text-red-700">Failed Tests ({failedTests.length})</h3>
                        <button onClick={handleCopyFailedTests} className="repl-btn text-sm bg-gray-200 text-gray-700 hover:bg-gray-300">
                            {copyButtonText}
                        </button>
                    </div>
                    <div className="space-y-4">
                        {failedTests.map(item => (
                            <TestCaseRunner key={item.id} item={item} onRun={runSingleTest} onToggleExpand={() => handleToggleExpand(item.id)} />
                        ))}
                    </div>
                </div>
            )}
            
            {passedTests.length > 0 && (
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-green-700 border-b pb-2">Passed Tests ({passedTests.length})</h3>
                    <div className="space-y-2">
                         {passedTests.map(item => (
                            <TestCaseRunner key={item.id} item={item} onRun={runSingleTest} onToggleExpand={() => handleToggleExpand(item.id)} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};