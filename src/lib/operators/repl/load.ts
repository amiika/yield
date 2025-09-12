import type { Operator } from '../../types';

export const load: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const name = s.pop() as string;
            if (typeof name !== 'string' || !name) {
                throw new Error(`'load' expects a non-empty string name on the stack.`);
            }

            try {
                const serializedState = localStorage.getItem(name);
                if (!serializedState) {
                    throw new Error(`No saved state found for '${name}'.`);
                }
                
                const reviver = (key, value) => {
                    if (value && typeof value === 'object' && value.__type === 'Symbol' && value.key) {
                        return Symbol.for(value.key);
                    }
                    return value;
                };

                const loadedState = JSON.parse(serializedState, reviver);

                if (!loadedState || !loadedState.stack || !loadedState.userDictionary) {
                    throw new Error(`Invalid data format for saved state '${name}'.`);
                }

                // Restore state
                // 1. Clear current user dictionary
                for (const key in dictionary) {
                    if (!options.builtInKeys.has(key)) {
                        delete dictionary[key];
                    }
                }
                // 2. Add definitions from loaded state
                Object.assign(dictionary, loadedState.userDictionary);
                
                // 3. Restore stack
                s.length = 0;
                s.push(...loadedState.stack);
                
                if (options.onOutput) {
                    options.onOutput(`State loaded from '${name}'.`);
                }

            } catch (e) {
                throw new Error(`Failed to load state from '${name}': ${e.message}`);
            }
        },
        description: 'Loads a previously saved state (stack and dictionary) from localStorage, replacing the current state.',
        effect: '[S_name] -> [...]'
    },
    examples: [
        {
            code: [
                '1 2 3 (dup *) sq => "test-load" save', // Save a known state
                'clearall', // Clear everything
                '"test-load" load', // Load it back
                '5 sq' // Test if it works
            ],
            expected: [1, 2, 3, 25]
        }
    ]
};
