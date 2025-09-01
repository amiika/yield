import type { Operator } from '../../types';

export const replace: Operator = {
    definition: {
        exec: function*(s) { 
            const replacement = String(s.pop());
            const search = String(s.pop());
            const str = String(s.pop());
            // Use replace with a global flag for robustness.
            // Escape special regex characters in the search string.
            const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            s.push(str.replace(new RegExp(escapedSearch, 'g'), replacement));
        },
        description: 'Replaces all occurrences of a search string with a replacement string. `S Search Replace -> S`',
        effect: '[S Search Replace] -> [S\']'
    },
    examples: [
        { code: '"ha ha ha" "a" "o" replace', expected: ["ho ho ho"] },
        { code: '"banana" "na" "no" replace', expected: ["banono"] },
        { code: '"test" "x" "y" replace', expected: ["test"] },
    ]
};