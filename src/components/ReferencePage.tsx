import React, { useState, useMemo, useEffect } from 'react';
import { operatorModules } from '../lib/operators';
import { Yield } from '../lib/yield-interpreter';
import { simpleFormatter } from '../lib/utils';

const PlayIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
);

const OperatorCard = ({ operator }) => {
    const [code, setCode] = useState(operator.example);
    const [result, setResult] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const firstTest = operator.testCases?.[0];
        let initialResult = null;
        if (firstTest) {
            if (firstTest.expected !== undefined) {
                initialResult = `[ ${firstTest.expected.map(simpleFormatter).join(' ')} ]`;
            } else if (firstTest.expectedDescription) {
                initialResult = firstTest.expectedDescription;
            } else if (firstTest.expectedType) {
                initialResult = `A value of type: ${firstTest.expectedType}`;
            } else if (firstTest.assert) {
                initialResult = '(Custom assertion logic)';
            }
        }
        setResult(initialResult);
        setError(null);
        setCode(operator.example);
    }, [operator]);

    const handleRun = async () => {
        setIsRunning(true);
        setError(null);
        try {
            Yield.reset();
            const stack = [];
            const program = Yield.parse(code);
            await Yield.run(program, stack);
            const output = `[ ${stack.map(simpleFormatter).join(' ')} ]`;
            setResult(output);
        } catch (e) {
            setError(e.message);
            setResult(null);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200">
            <div className="flex justify-between items-baseline flex-wrap gap-2">
                <h3 className="text-xl font-bold font-mono text-indigo-600">{operator.name}</h3>
                <span className="font-mono text-sm bg-gray-100 p-1 rounded whitespace-nowrap">{operator.effect}</span>
            </div>
            <p className="mt-2 text-gray-700">{operator.description}</p>
            <div className="mt-3 bg-gray-50 p-2 rounded-md border">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm text-gray-500">Example:</p>
                    <button
                        onClick={handleRun}
                        disabled={isRunning}
                        className="control-btn p-1 rounded-full hover:bg-gray-200 text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                        aria-label="Run example"
                        title="Run example"
                    >
                        {isRunning ? <span className="text-xs px-1">...</span> : <PlayIcon />}
                    </button>
                </div>
                <pre className="fira-code whitespace-pre-wrap text-sm">
                    <code
                        contentEditable={!isRunning}
                        onBlur={(e) => setCode(e.currentTarget.innerText)}
                        suppressContentEditableWarning={true}
                        className="block"
                    >
                        {code}
                    </code>
                </pre>
            </div>
            {(result || error) && (
                 <div className={`output mt-2 p-2 rounded-md fira-code whitespace-pre-wrap text-sm ${error ? 'text-red-600 bg-red-100' : 'bg-gray-800 text-white'}`}>
                    <p className={`text-sm mb-1 font-semibold ${error ? 'text-red-700' : 'text-gray-400'}`}>{error ? 'Error:' : 'Result:'}</p>
                    <pre>{error ? error : result}</pre>
                </div>
            )}
        </div>
    );
};

export const ReferencePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategories, setActiveCategories] = useState(new Set(['all']));

    const allOperators = useMemo(() => {
        const operatorsList = [];
        for (const [catKey, category] of Object.entries(operatorModules)) {
            for (const [opName, operator] of Object.entries(category.definitions)) {
                operatorsList.push({
                    name: opName,
                    category: catKey,
                    ...operator.definition,
                    testCases: operator.testCases
                });
            }
        }
        return operatorsList.sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    const filteredOperators = useMemo(() => {
        return allOperators.filter(op => {
            const categoryMatch = activeCategories.has('all') || activeCategories.has(op.category);
            const searchMatch = op.name.toLowerCase().includes(searchTerm.toLowerCase());
            return categoryMatch && searchMatch;
        });
    }, [allOperators, searchTerm, activeCategories]);

    const categories = useMemo(() => {
        return ['all', ...Object.keys(operatorModules)];
    }, []);

    const handleCategoryClick = (catKey: string) => {
        setActiveCategories(prev => {
            const newCategories = new Set(prev);

            if (catKey === 'all') {
                return new Set(['all']);
            }

            newCategories.delete('all');

            if (newCategories.has(catKey)) {
                newCategories.delete(catKey);
            } else {
                newCategories.add(catKey);
            }

            if (newCategories.size === 0) {
                return new Set(['all']);
            }
            
            return newCategories;
        });
    };
    
    return (
        <div id="reference-container">
            <div className="sticky top-0 bg-gray-100/80 backdrop-blur-sm z-10 py-4 mb-6">
                <input
                    type="text"
                    placeholder="Search for an operator..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 mb-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                    aria-label="Search operators"
                />
                <div className="flex flex-wrap gap-2">
                    {categories.map(catKey => (
                        <button
                            key={catKey}
                            onClick={() => handleCategoryClick(catKey)}
                            className={`repl-btn text-sm capitalize ${activeCategories.has(catKey) ? 'repl-btn-primary' : 'bg-white text-gray-700 hover:bg-gray-200 border-gray-300 border'}`}
                        >
                            {catKey.replace(/([A-Z])/g, ' $1')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="operator-list">
                {filteredOperators.length > 0 ? (
                    filteredOperators.map(op => <OperatorCard key={op.name} operator={op} />)
                ) : (
                    <p className="text-center text-gray-500 mt-8">No operators found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};