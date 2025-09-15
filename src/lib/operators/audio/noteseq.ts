
import type { Operator } from '../../types';

// prettier-ignore
const durationData = [
  { "character": "m..", "fraction": "14/1" }, { "character": "m.", "fraction": "12/1" },
  { "character": "m", "fraction": "8/1" }, { "character": "l..", "fraction": "7/1" },
  { "character": "l.", "fraction": "6/1" }, { "character": "l", "fraction": "4/1" },
  { "character": "d..", "fraction": "7/2" }, { "character": "d.", "fraction": "3/1" },
  { "character": "n", "fraction": "8/3" }, { "character": "d", "fraction": "2/1" },
  { "character": "w..", "fraction": "7/4" }, { "character": "w.", "fraction": "3/2" },
  { "character": "k", "fraction": "4/3" }, { "character": "w", "fraction": "1/1" },
  { "character": "h..", "fraction": "7/8" }, { "character": "h.", "fraction": "3/4" },
  { "character": "c", "fraction": "2/3" }, { "character": "h", "fraction": "1/2" },
  { "character": "q..", "fraction": "7/16" }, { "character": "q.", "fraction": "3/8" },
  { "character": "p", "fraction": "1/3" }, { "character": "q", "fraction": "1/4" },
  { "character": "e..", "fraction": "7/32" }, { "character": "e.", "fraction": "3/16" },
  { "character": "g", "fraction": "1/6" }, { "character": "e", "fraction": "1/8" },
  { "character": "s..", "fraction": "7/64" }, { "character": "s.", "fraction": "3/32" },
  { "character": "a", "fraction": "1/12" }, { "character": "s", "fraction": "1/16" },
  { "character": "t..", "fraction": "7/128" }, { "character": "t.", "fraction": "3/64" },
  { "character": "f", "fraction": "1/24" }, { "character": "t", "fraction": "1/32" },
  { "character": "u..", "fraction": "7/256" }, { "character": "u.", "fraction": "3/128" },
  { "character": "x", "fraction": "1/48" }, { "character": "u", "fraction": "1/64" },
  { "character": "o..", "fraction": "7/512" }, { "character": "o.", "fraction": "3/256" },
  { "character": "y", "fraction": "1/96" }, { "character": "o", "fraction": "1/128" },
  { "character": "j", "fraction": "1/192" }, { "character": "z", "fraction": "0/1" }
];

const parseFraction = (fraction: string): number => {
  const [num, den] = fraction.split('/').map(Number);
  if (den === 0) return 0;
  return num / den;
};

const durationMap = new Map<string, number>();
durationData.forEach(item => {
    durationMap.set(item.character, parseFraction(item.fraction));
});

// A token is a duration if it's a known char or a non-integer number
const isDurationToken = (token: any): boolean => {
    if (typeof token === 'string' && durationMap.has(token)) {
        return true;
    }
    // Any non-integer number is treated as a decimal duration
    if (typeof token === 'number' && !Number.isInteger(token)) {
        return true;
    }
    return false;
};

// Gets the numeric value of a duration token
const getDurationValue = (token: any): number => {
    if (typeof token === 'string' && durationMap.has(token)) {
        return durationMap.get(token)!;
    }
    if (typeof token === 'number' && !Number.isInteger(token)) {
        return token;
    }
    // This case should ideally not be reached if called after isDurationToken
    return 0.25; 
};

// An item is part of the rhythmic structure if it's a note (integer) or a sub-group (list)
const isNoteLike = (token: any): boolean => {
    return Number.isInteger(token) || Array.isArray(token);
};

// Recursively subdivides a total duration among a list of notes and sub-groups
const subdivide = (items: any[], totalDuration: number): [number, number][] => {
    const noteLikeItems = items.filter(isNoteLike);
    const count = noteLikeItems.length;
    if (count === 0) return [];
    
    const durationPerItem = totalDuration / count;
    const results: [number, number][] = [];

    for (const item of noteLikeItems) {
        if (Number.isInteger(item)) {
            results.push([item, durationPerItem]);
        } else if (Array.isArray(item)) {
            // Recurse for sub-groups
            results.push(...subdivide(item, durationPerItem));
        }
    }
    return results;
};


export const noteseq: Operator = {
    definition: {
        exec: function*(s) {
            const quotation = s.pop();
            if (!Array.isArray(quotation)) {
                throw new Error('noteseq expects a quotation.');
            }

            const results: [number, number][] = [];
            let currentItems: any[] = [];

            for (const token of quotation) {
                if (isDurationToken(token) || durationMap.has(token)) {
                    const duration = getDurationValue(token);
                    if (currentItems.length > 0) {
                        results.push(...subdivide(currentItems, duration));
                        currentItems = [];
                    }
                } else {
                    currentItems.push(token);
                }
            }

            // Handle any remaining items that didn't have an explicit duration
            if (currentItems.length > 0) {
                results.push(...subdivide(currentItems, 0.25)); // Default to a total duration of a quarter note
            }

            s.push(results);
        },
        description: `Converts a quotation into a structured list of [note, duration] pairs. The operator processes the quotation in chunks: it gathers notes and sub-groups until it finds a duration (a decimal number or a duration character like 'q', 'h', etc.). That duration is then applied to the entire preceding chunk, subdividing recursively for any nested groups. Any notes at the end of the quotation without an explicit duration are given a default total duration of a quarter note (0.25).`,
        effect: '[quotation] -> [list_of_pairs]'
    },
    examples: [
        {
            code: '(60 62 q 64 65 h) noteseq',
            expected: [[[60, 0.125], [62, 0.125], [64, 0.25], [65, 0.25]]],
            expectedDescription: 'Applies `q` (0.25) to (60 62), and `h` (0.5) to (64 65).'
        },
        {
            code: '((60 62) (64 65) q) noteseq',
            expected: [[[60, 0.0625], [62, 0.0625], [64, 0.0625], [65, 0.0625]]],
            expectedDescription: 'Applies `q` (0.25) to the whole group, subdividing it.'
        },
        {
            code: '(((60 (70 59)) 80) 0.5) noteseq',
            assert: s => JSON.stringify(s[0]) === JSON.stringify([[60,0.125],[70,0.0625],[59,0.0625],[80,0.25]]),
            expectedDescription: 'Recursively subdivides the duration 0.5 among the nested structure.'
        },
        {
            code: '(60 62 64) noteseq',
            assert: s => s[0].every(pair => Math.abs(pair[1] - 0.25/3) < 1e-9),
            expectedDescription: 'Uses a default total duration of 0.25 for notes without an explicit duration.'
        },
        {
            code: '() noteseq',
            expected: [[]]
        }
    ]
};
