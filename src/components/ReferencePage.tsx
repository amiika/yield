
import React, { useState, useMemo } from 'react';
import { operatorModules } from '../lib/operators';
import { NotebookCell } from './NotebookCell';
import { Yield } from '../lib/yield-interpreter';

export const ReferencePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategories, setActiveCategories] = useState(new Set(['all']));

    const allOperators = useMemo(() => {
        // Create a reverse mapping of "hard" aliases from the interpreter
        const reverseAliases = new Map<string, string[]>();
        // FIX: Add type check for Yield.aliases as it might not be available if interpreter fails to load
        if (Yield.aliases) {
            for (const alias in Yield.aliases) {
                const opName = Yield.aliases[alias];
                if (!reverseAliases.has(opName)) {
                    reverseAliases.set(opName, []);
                }
                reverseAliases.get(opName)!.push(alias);
            }
        }

        // Use a map to handle operators that have multiple names (e.g., ifte and ?)
        // The key is the operator object itself to ensure uniqueness.
        const operatorMap = new Map<object, any>();

        for (const [catKey, category] of Object.entries(operatorModules)) {
            for (const [opName, operator] of Object.entries(category.definitions)) {
                if (!operatorMap.has(operator)) {
                    operatorMap.set(operator, {
                        names: [opName],
                        category: catKey,
                        description: operator.definition.description,
                        effect: operator.definition.effect,
                        examples: operator.examples.filter(ex => !ex.expectedError),
                    });
                } else {
                    operatorMap.get(operator).names.push(opName);
                }
            }
        }
        
        const operatorsList = Array.from(operatorMap.values()).map(opData => {
            // Prefer longer name as the primary name, others are aliases.
            opData.names.sort((a, b) => b.length - a.length || a.localeCompare(b));
            const primaryName = opData.names[0];
            const moduleAliases = opData.names.slice(1);
            
            // Combine aliases from the module and from the interpreter's hard alias list
            const hardAliases = reverseAliases.get(primaryName) || [];
            const allAliases = [...new Set([...moduleAliases, ...hardAliases])];

            return {
                name: primaryName,
                aliases: allAliases,
                category: opData.category,
                description: opData.description,
                effect: opData.effect,
                examples: opData.examples,
            };
        });
        
        return operatorsList.sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    const filteredOperators = useMemo(() => {
        return allOperators.filter(op => {
            const categoryMatch = activeCategories.has('all') || activeCategories.has(op.category);
            const term = searchTerm.toLowerCase();
            
            if (!term) return categoryMatch;

            const nameMatch = op.name.toLowerCase().includes(term);
            const aliasMatch = op.aliases.some(alias => alias.toLowerCase().includes(term));
            
            const searchMatch = nameMatch || aliasMatch;
            return categoryMatch && searchMatch;
        });
    }, [allOperators, searchTerm, activeCategories]);

    const categories = useMemo(() => {
        return ['all', ...Object.keys(operatorModules)];
    }, []);

    const handleCategoryClick = (catKey: string, e: React.MouseEvent) => {
        if (e.shiftKey) {
            // Multi-select logic: toggle categories
            setActiveCategories(prev => {
                const newCategories = new Set(prev);

                if (catKey === 'all') {
                    // Shift-clicking 'all' just selects 'all'
                    return new Set(['all']);
                }

                newCategories.delete('all'); // Leave multi-select mode

                if (newCategories.has(catKey)) {
                    newCategories.delete(catKey);
                } else {
                    newCategories.add(catKey);
                }

                // If nothing is selected, default to 'all'
                if (newCategories.size === 0) {
                    return new Set(['all']);
                }
                
                return newCategories;
            });
        } else {
            // Default single-select logic: clicking a tag selects only that tag
            setActiveCategories(new Set([catKey]));
        }
    };
    
    const handleClearFilters = () => {
        setSearchTerm('');
        setActiveCategories(new Set(['all']));
    };
    
    const isCategoryFiltered = !activeCategories.has('all') || activeCategories.size > 1;
    const areFiltersActive = searchTerm !== '' || isCategoryFiltered;

    return (
        <div id="reference-container">
            <div className="sticky top-0 bg-gray-100/80 backdrop-blur-sm z-10 py-4 mb-6">
                <input
                    type="text"
                    placeholder="Search for an operator..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 mb-4 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                    aria-label="Search operators"
                />
                <div className="flex flex-wrap gap-2 items-center">
                    {categories.map(catKey => (
                        <button
                            key={catKey}
                            onClick={(e) => handleCategoryClick(catKey, e)}
                            className={`repl-btn text-sm capitalize ${activeCategories.has(catKey) ? 'repl-btn-primary' : 'bg-white text-gray-700 hover:bg-gray-200 border-gray-300 border'}`}
                        >
                            {catKey.replace(/([A-Z])/g, ' $1')}
                        </button>
                    ))}
                    {areFiltersActive && (
                         <button
                            onClick={handleClearFilters}
                            className="text-sm text-indigo-600 hover:underline ml-auto px-2"
                            aria-label="Clear all filters"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            </div>

            <div className="operator-list">
                {filteredOperators.length > 0 ? (
                    filteredOperators.map(op => <NotebookCell key={op.name} cellData={op} />)
                ) : (
                    <p className="text-center text-gray-500 mt-8">
                        {searchTerm
                            ? (
                                <>
                                    No operators found matching "<strong>{searchTerm}</strong>"
                                    {isCategoryFiltered ? ' in the selected categories' : ''}.
                                </>
                              )
                            : (
                                isCategoryFiltered
                                    ? 'No operators found in the selected categories.'
                                    : 'No operators found matching your criteria.'
                              )
                        }
                    </p>
                )}
            </div>
        </div>
    );
};
