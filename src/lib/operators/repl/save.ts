

import type { Operator } from '../../types';

const getUserDictionary = (dictionary: { [key: string]: any }, builtInKeys: Set<string>): { [key: string]: any } => {
    const userDict = {};
    for (const key in dictionary) {
        if (!builtInKeys.has(key)) {
            userDict[key] = dictionary[key];
        }
    }
    return userDict;
};

export const save: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const name = s.pop() as string;
            if (typeof name !== 'string' || !name) {
                throw new Error(`'save' expects a non-empty string name on the stack.`);
            }

            try {
                const stateToSave = {
                    stack: s,
                    userDictionary: getUserDictionary(dictionary, options.builtInKeys)
                };

                const replacer = (key, value) => {
                    if (typeof value === 'symbol') {
                        const keyFor = Symbol.keyFor(value);
                        if (keyFor) {
                             return { __type: 'Symbol', key: keyFor };
                        }
                        // Non-global symbols cannot be serialized/deserialized reliably.
                        // We will omit them to prevent errors.
                        return undefined; 
                    }
                    return value;
                };

                const serializedState = JSON.stringify(stateToSave, replacer);
                localStorage.setItem(name, serializedState);
                
                if (options.onOutput) {
                    options.onOutput(`State saved to '${name}'.`);
                }

            } catch (e) {
                throw new Error(`Failed to save state to '${name}': ${e.message}`);
            }
        },
        description: 'Saves the current stack and user-defined dictionary to localStorage under the given name.',
        effect: '[... S_name] -> [...]'
    },
    examples: [
        {
            code: [
                '1 2 3',
                '(dup *) sq =>',
                '"test-save" save'
            ],
            assert: (s) => {
                const saved = localStorage.getItem('test-save');
                if (!saved) return false;
                const data = JSON.parse(saved);
                const sqBody = data.userDictionary.sq.body;
                return data.stack.length === 3 && Array.isArray(sqBody) && sqBody[1] === 'iterate';
            },
            expected: [1, 2, 3] // The stack remains unchanged after save pops its arg
        }
    ]
};
