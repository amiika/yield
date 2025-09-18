
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
    throw new Error(`Invalid duration token: ${token}`);
};

const isNoteLike = (token: any): boolean => {
    return Number.isInteger(token) || (typeof token === 'symbol' && (Symbol.keyFor(token) === 'r' || Symbol.keyFor(token) === 'z'));
};

const parsePhrase = (quotation: any[]): any[] => {
    const results: any[] = [];
    let i = 0;

    const subdivide = (noteOrGroup: any, totalDuration: number, lyric: string | undefined): any[] => {
        if (isNoteLike(noteOrGroup)) {
            const noteValue = (typeof noteOrGroup === 'symbol') ? null : noteOrGroup;
            const resultTuple: any[] = [noteValue, totalDuration];
            if (lyric !== undefined && lyric !== "") {
                resultTuple.push(lyric);
            }
            return [resultTuple];
        }
        
        if (Array.isArray(noteOrGroup)) {
            const itemsToSubdivide = noteOrGroup.filter(item => isNoteLike(item) || Array.isArray(item));
            if (itemsToSubdivide.length === 0) return [];
            
            const durationPerItem = totalDuration / itemsToSubdivide.length;
            
            let subResults: any[] = [];
            for (const item of itemsToSubdivide) {
                // Lyrics are not inherited by sub-group items
                subResults.push(...subdivide(item, durationPerItem, undefined));
            }
            
            // If a lyric was provided for the group, attach it to the first note.
            if (lyric && subResults.length > 0) {
                const firstNoteTuple = subResults[0];
                if(firstNoteTuple.length === 2) {
                    firstNoteTuple.push(lyric);
                } else if(firstNoteTuple.length === 3) {
                    firstNoteTuple[2] = lyric;
                }
            }
            return subResults;
        }
        return [];
    };

    while (i < quotation.length) {
        const currentToken = quotation[i];

        if (isNoteLike(currentToken) || Array.isArray(currentToken)) {
            i++;
            
            if (i >= quotation.length || !isDurationToken(quotation[i])) {
                throw new Error(`Music notation syntax error: note or group '${JSON.stringify(currentToken)}' must be followed by a duration token.`);
            }
            const duration = getDurationValue(quotation[i]);
            i++;

            let lyric: string | undefined = undefined;
            if (i < quotation.length && typeof quotation[i] === 'string' && !durationMap.has(quotation[i])) {
                lyric = quotation[i];
                i++;
            }
            results.push(...subdivide(currentToken, duration, lyric));
        } else {
            i++;
        }
    }
    
    // Return a final list where tuples without lyrics have only 2 elements.
    const finalResult = results.map(tuple => {
        if(tuple.length === 2) return tuple;
        if(tuple.length === 3 && tuple[2] !== undefined) return tuple;
        return [tuple[0], tuple[1]];
    });

    return finalResult;
};

export const dur: Operator = {
    definition: {
        exec: function*(s) {
            const quotation = s.pop();
            if (!Array.isArray(quotation)) {
                throw new Error('dur expects a quotation.');
            }

            if (quotation.length === 0) {
                s.push([]);
                return;
            }
            
            const isMultiRow = quotation.every(item => Array.isArray(item));

            if (isMultiRow) {
                const matrixResult = quotation.map(phrase => {
                    if (!Array.isArray(phrase)) {
                         throw new Error('Inconsistent multi-row input for dur: expected all top-level elements to be lists (phrases).');
                    }
                    return parsePhrase(phrase);
                });
                s.push(matrixResult);
            } else {
                s.push(parsePhrase(quotation));
            }
        },
        description: `Parses a music notation quotation into a structured list of [value, duration, lyric] tuples. The syntax is a sequence of 'note duration [lyric]' triplets.
- A 'note' can be a number (MIDI, etc.), a rest (:r), or a sub-group '(...)' for subdivision.
- A 'duration' is required and can be a decimal number (in beats) or a character (q, h, e, etc.).
- A 'lyric' is an optional string that follows a duration.
For sub-groups, the duration is divided equally among its members.`,
        effect: '[quotation] -> [list_of_tuples]'
    },
    examples: [
        {
            code: '(60 q "Row," 60 q "row," (60 62) q "your" 64 h "boat,") dur',
            assert: s => s[0].length === 5 && s[0][2].length === 3 && s[0][2][2] === "your",
            expectedDescription: 'A sequence with lyrics and durations.'
        },
        {
            code: '(60 q 62 q 64 h 65 h) dur',
            expected: [ [[60, 0.25], [62, 0.25], [64, 0.5], [65, 0.5]] ]
        },
        {
            code: '((60 62) q) dur',
            expected: [ [[60, 0.125], [62, 0.125]] ],
            expectedDescription: 'Applies `q` (0.25) to the group, subdividing it.'
        },
        {
            code: '(((60 (70 59)) 80) h) dur',
            assert: s => JSON.stringify(s[0]) === JSON.stringify([[60,0.125],[70,0.0625],[59,0.0625],[80,0.25]]),
            expectedDescription: 'Recursively subdivides the duration 0.5 among the nested structure.'
        },
        {
            code: '(60 q :r q 64 q) dur',
            expected: [ [[60, 0.25], [null, 0.25], [64, 0.25]] ]
        },
        {
            code: '() dur',
            expected: [[]]
        },
        {
            code: '(60 62) dur',
            expectedError: "must be followed by a duration token"
        }
    ]
};