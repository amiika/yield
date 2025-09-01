import React, { useState, useMemo } from 'react';
import { operatorModules } from '../lib/operators';
import { NotebookCell } from './NotebookCell';

export const ReferencePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategories, setActiveCategories] = useState(new Set(['all']));

    const allOperators = useMemo(() => {
        const operatorsList = [];
        for (const [catKey, category] of Object.entries(operatorModules)) {
            for (const [opName, operator] of Object.entries(category.definitions)) {
                // Prepare cellData directly for the NotebookCell
                const exampleCode = operator.examples[0].code;
                operatorsList.push({
                    name: opName,
                    category: catKey,
                    description: operator.definition.description,
                    effect: operator.definition.effect,
                    // Pass the example code as a single string
                    example: Array.isArray(exampleCode) ? exampleCode.join('\n') : exampleCode
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
                    filteredOperators.map(op => <NotebookCell key={op.name} cellData={op} />)
                ) : (
                    <p className="text-center text-gray-500 mt-8">No operators found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};
