import type { Operator } from '../../types';

export const undo: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            if (!options.historyManager) return;
            const snapshot = options.historyManager.undo();
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
        description: 'Reverts the stack and all user-defined words to their state before the last operation. Can be called multiple times.',
        effect: '[...] -> [...]'
    },
    // FIX: Renamed `testCases` to `examples` to match the Operator type.
    examples: [
        { code: '1 2 + undo', assert: s => s.length === 2 && s[0] === 1 && s[1] === 2 }
    ]
};