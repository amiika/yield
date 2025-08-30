import type { Operator } from '../../types';

export const clearhistory: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            if (options.historyManager) {
                // We keep the *current* state as the new initial state.
                const currentState = options.historyManager.createSnapshot(s, dictionary);
                options.historyManager.clear();
                options.historyManager.add(currentState);
            }
        },
        description: 'Clears the undo/redo history. The current state becomes the new initial state.',
        example: '1 2 + clearhistory',
        effect: '[] -> []'
    },
    testCases: [
        { code: '1 2 + clearhistory', expected: [3] },
        { code: '1 2 clearhistory', expected: [1, 2] }
    ]
};