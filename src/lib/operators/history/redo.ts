import type { Operator } from '../../types';

export const redo: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            if (!options.historyManager) return;
            const snapshot = options.historyManager.redo();
            if (snapshot) {
                // Restore stack
                s.length = 0;
                s.push(...snapshot.stack);

                // Restore dictionary
                // 1. Clear current user dictionary
                for (const key in dictionary) {
                    if (!('exec' in dictionary[key])) {
                        delete dictionary[key];
                    }
                }
                // 2. Add definitions from snapshot
                Object.assign(dictionary, snapshot.userDictionary);
            }
        },
        description: 'Re-applies an operation that was undone. Can only be used after `undo`.',
        example: '1 2 + undo redo',
        effect: '[...] -> [...]'
    },
    testCases: [
        { 
            code: ['1 2 +', 'undo', 'redo'], 
            expected: [3]
        },
        {
            code: ['1 2 +', 'undo', '3 4 +', 'redo'], // redo should do nothing here as history was truncated
            expected: [7]
        }
    ]
};
