import type { Operator } from '../../types';
import { yieldFormatter } from '../../utils';

const formatDictionary = (dict: { [key: string]: any }): string => {
    const keys = Object.keys(dict);
    if (keys.length === 0) {
        return 'No user-defined words found.';
    }
    return 'User-defined words:\n' + keys.map(key => {
        const body = dict[key]?.body;
        const formattedBody = Array.isArray(body) ? `( ${body.map(yieldFormatter).join(' ')} )` : yieldFormatter(body);
        return `* ${formattedBody} ${key} = `;
    }).join('\n');
};

export const lurk: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const name = s.pop() as string;
            if (typeof name !== 'string' || !name) {
                throw new Error(`'lurk' expects a non-empty string name (e.g., "this") on the stack.`);
            }

            let output: string;
            if (name === 'this') {
                const userDict = {};
                for (const key in dictionary) {
                    if (!options.builtInKeys.has(key)) {
                        userDict[key] = dictionary[key];
                    }
                }
                output = formatDictionary(userDict);
            } else {
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
                    
                    if (!loadedState || !loadedState.userDictionary) {
                        throw new Error(`Invalid data format for saved state '${name}'.`);
                    }
                    
                    output = formatDictionary(loadedState.userDictionary);

                } catch (e) {
                    throw new Error(`Failed to lurk into '${name}': ${e.message}`);
                }
            }

            if (options.onOutput) {
                options.onOutput(output);
            }
        },
        description: 'Lists user-defined words. With "this", lists words in the current session. With another name, lists words from a saved session.',
        effect: '[S_name] -> []'
    },
    examples: [
        {
            code: [
                '(dup *) sq =>',
                '"this" lurk'
            ],
            assert: (s) => s.length === 0,
            expectedDescription: 'Stack should be empty.'
        },
        {
            code: [
                '1 2 3 (dup *) sq => "test-lurk" save',
                'clearall',
                '"test-lurk" lurk'
            ],
            assert: (s) => s.length === 0,
            expectedDescription: 'Stack should be empty.'
        }
    ]
};
