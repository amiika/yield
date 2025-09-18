
import type { Operator } from '../../types';
import { DEFAULT_DURS } from './defaults';

const durationMap = new Map<string, number>(Object.entries(DEFAULT_DURS));

const isDurationToken = (token: any): boolean => {
    if (typeof token === 'string' && durationMap.has(token)) return true;
    if (typeof token === 'number' && !Number.isInteger(token)) return true;
    return false;
};

const getDurationValue = (token: any): number => {
    if (typeof token === 'string' && durationMap.has(token)) {
        return durationMap.get(token)!;
    }
    if (typeof token === 'number' && !Number.isInteger(token)) {
        return token;
    }
    return 0.25; // Fallback, should not be hit if logic is correct
};

const isNoteLike = (token: any): boolean => {
    return Number.isInteger(token) || Array.isArray(token) || (typeof token === 'symbol' && (Symbol.keyFor(token) === 'r' || Symbol.keyFor(token) === 'z'));
};

const subdivide = (items: any[], totalDuration: number): (readonly [number | null, number])[] => {
    const noteLikeItems = items.filter(isNoteLike);
    const count = noteLikeItems.length;
    if (count === 0) return [];
    
    const durationPerItem = totalDuration / count;
    const results: (readonly [number | null, number])[] = [];

    for (const item of noteLikeItems) {
        if (Number.isInteger(item)) {
            results.push([item, durationPerItem]);
        } else if (typeof item === 'symbol') { // Handle rests
            results.push([null, durationPerItem]);
        } else if (Array.isArray(item)) {
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

            const results: (readonly [number | null, number])[] = [];
            let currentItems: any[] = [];

            for (const token of quotation) {
                if (isDurationToken(token)) {
                    const duration = getDurationValue(token);
                    if (currentItems.length > 0) {
                        results.push(...subdivide(currentItems, duration));
                        currentItems = [];
                    }
                } else {
                    currentItems.push(token);
                }
            }

            if (currentItems.length > 0) {
                results.push(...subdivide(currentItems, 0.25));
            }

            s.push(results);
        },
        description: `Parses a quotation into a structured list of [note, duration] pairs. The operator processes the quotation in chunks: it gathers notes (integers), rests (:r, :z), and sub-groups until it finds a duration (a decimal number or a duration character like 'q', 'h', etc.). That duration is then applied to the entire preceding chunk, subdividing recursively for any nested groups. Any notes at the end of the quotation without an explicit duration are given a default total duration of a quarter note (0.25).`,
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
            code: '(60 :r 64 q) noteseq',
            expected: [[[60, 0.25/3], [null, 0.25/3], [64, 0.25/3]]]
        },
        {
            code: '() noteseq',
            expected: [[]]
        }
    ]
};