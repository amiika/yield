import type { Operator } from '../../types';

export const clearhistory: Operator = {
    definition: {
        // FIX: The `exec` function signature has been updated to include the `evaluate` and `dictionary` parameters,
        // aligning it with the `OperatorDefinition` type. This resolves an error where `dictionary`
        // was incorrectly accessed from `options`.
        exec: function*(s, options, evaluate, dictionary) {
            if (options.historyManager) {
                // We keep the *current* state as the new initial state.
                const currentState = options.historyManager.createSnapshot(s, dictionary);
                options.historyManager.clear();
                options.historyManager.add(currentState);
            }
        },
        description: 'Clears the undo/redo history. The current state becomes the new initial state.',
        effect: '[] -> []'
    },
    // FIX: Renamed `testCases` to `examples` to match the Operator type.
    examples: [
        { code: '1 2 clearhistory', expected: [1, 2] }
    ]
};