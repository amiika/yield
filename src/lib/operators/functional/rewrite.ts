
import type { Operator, EvaluateFn, StackValue } from '../../types';
import { yieldFormatter } from '../../utils';

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const rewrite: Operator = {
    definition: {
        exec: function*(s, options, evaluate, dictionary) {
            const iterations = s.pop() as number;
            const axiom = s.pop() as string;

            if (typeof axiom !== 'string') {
                throw new Error('rewrite expects an axiom string.');
            }
            if (typeof iterations !== 'number' || !Number.isInteger(iterations) || iterations < 0) {
                throw new Error('rewrite expects a non-negative integer for iterations.');
            }

            let currentString = axiom;

            const ruleKeys = Object.keys(dictionary)
                .filter(key => !options.builtInKeys.has(key))
                .sort((a, b) => b.length - a.length); // Longest key first for greedy matching

            const rules: { key: string, regex: RegExp }[] = [];
            for (const key of ruleKeys) {
                try {
                    // Attempt to compile the key as a regex. If it has special chars, it's a regex rule.
                    // Otherwise it's a literal.
                    const isLiteral = !/[\\^$.*+?()[\]{}|]/.test(key);
                    const pattern = isLiteral ? escapeRegex(key) : key;
                    rules.push({ key, regex: new RegExp(`^${pattern}`) });
                } catch (e) {
                    // Not a valid regex, treat as literal.
                    const pattern = escapeRegex(key);
                    rules.push({ key, regex: new RegExp(`^${pattern}`) });
                }
            }

            for (let i = 0; i < iterations; i++) {
                 if (options?.stopSignal?.stopped) return; // Check for stop signal
                if (currentString.length > 500000) { // Safety break for extremely long strings
                    if (options.onAsyncOutput) options.onAsyncOutput(`Rewrite aborted after string exceeded 500,000 characters.`, true);
                    break;
                }

                let newString = '';
                let searchIndex = 0;

                while (searchIndex < currentString.length) {
                    let matchInfo: { key: string, match: RegExpMatchArray } | null = null;
                    
                    for (const rule of rules) {
                        const match = currentString.substring(searchIndex).match(rule.regex);
                        if (match) {
                            matchInfo = { key: rule.key, match };
                            break;
                        }
                    }

                    if (matchInfo) {
                        const { key, match } = matchInfo;
                        const fullMatch = match[0];
                        
                        const ruleDef = dictionary[key];
                        let replacement: StackValue;

                        if (ruleDef && 'body' in ruleDef) {
                            const body = ruleDef.body;
                            if (Array.isArray(body) && body[body.length - 1] === 'iterate') {
                                // Function. Pass capture groups.
                                const args = match.slice(1);
                                const tempStack: StackValue[] = args.map(arg => String(arg)); // Ensure args are strings
                                yield* evaluate(body, tempStack, options);
                                replacement = tempStack; // Result is now the entire stack
                            } else {
                                replacement = ruleDef.body;
                            }
                        } else {
                            replacement = fullMatch;
                        }

                        let replacementString: string;
                        if (Array.isArray(replacement)) {
                            replacementString = replacement.map(v => {
                                 if (typeof v === 'string' && v.startsWith('\0')) return v.slice(1);
                                 const formatted = yieldFormatter(v);
                                 // Remove outer parens for lists so they don't get nested in the string
                                 if (Array.isArray(v)) {
                                    return formatted.slice(1, -1);
                                 }
                                 return formatted;
                            }).join(''); // FIX: Join without spaces
                        } else if (typeof replacement === 'string' && replacement.startsWith('\0')) {
                             replacementString = replacement.slice(1);
                        } else {
                            replacementString = String(replacement);
                        }
                        
                        newString += replacementString;
                        searchIndex += fullMatch.length;

                    } else {
                        newString += currentString[searchIndex];
                        searchIndex++;
                    }
                }
                currentString = newString;
                yield; // Make it non-blocking
            }

            s.push(currentString);
        },
        description: `Performs rule-based string rewriting (L-System). It uses user-defined words in the dictionary as rules. Keys are matched (longest first); if a key contains special characters and is a valid regex, it's used as such. If a rule is data (from '='), it's substituted. If it's a function (from '=>'), it's executed with the match (or capture groups) on the stack, and the resulting stack is substituted. This process is non-blocking to handle complex systems.`,
        effect: `[S_axiom N_iterations] -> [S_result]`
    },
    examples: [
        {
            replCode: `"AB" A = "A" B = "A" 5 rewrite`,
            expected: ["ABAABABAABAAB"],
            expectedDescription: "A classic L-System for algae growth."
        },
        {
            replCode: `
# A rule that matches any number and processes it.
# The key is a regex pattern. The value is a function.
(toNumber dup * 2 +) "([0-9]+)" =>

# The axiom contains multiple numbers.
"1 2 3" 1 rewrite`,
            expected: ["3 6 11"],
            expectedDescription: "Each number is squared and incremented by 2, for one generation."
        },
        {
            replCode: `
# Rules with capture groups for reordering.
# The key is a regex that captures two adjacent letters.
(swap) "([a-z])([a-z])" =>

# The rewrite will swap every pair of letters.
"abcdef" 1 rewrite`,
            expected: ["badcfe"]
        },
        {
            replCode: `
# The Koch curve fractal.
"F-F++F-F" F =

# Start with "F" and iterate 2 times.
"F" 2 rewrite`,
            expected: ["F-F++F-F-F-F++F-F++F-F++F-F-F-F++F-F"]
        },
        {
            replCode: `
# Rules with capture groups for reordering.
# The key is a regex that captures two adjacent letters.
(swap) "([a-z])([a-z])" =>

# The rewrite will swap every pair of letters.
"abcdef" 1 rewrite`,
            expected: ["badcfe"]
        }
    ]
};