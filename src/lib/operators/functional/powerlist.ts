import type { Operator } from '../../types';
import { deepEqual } from '../../utils';

// Recursive helper to generate the powerlist/powerset
const generatePowerlist = (agg: any[] | Set<any> | string): any[] => {
    const items = Array.isArray(agg) || typeof agg === 'string' ? agg : [...agg];

    if (items.length === 0) {
        if (agg instanceof Set) return [new Set()];
        if (typeof agg === 'string') return [""];
        return [[]];
    }

    const first = items[0];
    const restItems = items.slice(1);
    
    // The type of the rest needs to match the original aggregate for the recursive call
    let restAgg;
    if (agg instanceof Set) restAgg = new Set(restItems);
    // FIX: When `restItems` is a string (from `string.slice`), it doesn't have a `join` method. It's already the correct string type for the recursive call.
    else if (typeof agg === 'string') restAgg = restItems;
    else restAgg = restItems;

    const subPowerlist = generatePowerlist(restAgg);
    
    const withFirst = subPowerlist.map(sub => {
        if (agg instanceof Set) {
            return new Set([first, ...sub]);
        }
        if (typeof agg === 'string') {
            return first + sub;
        }
        return [first, ...sub];
    });

    return [...withFirst, ...subPowerlist];
};


export const powerlist: Operator = {
    definition: {
        exec: function*(s) {
            const agg = s.pop();
            if (Array.isArray(agg) || typeof agg === 'string' || agg instanceof Set) {
                s.push(generatePowerlist(agg));
            } else {
                throw new Error('powerlist expects a list, string, or set.');
            }
        },
        description: 'For an aggregate of size N, produces a list of all 2^N subaggregates (sublists, subsequences of characters, or subsets).',
        effect: '[A] -> [[A1, A2, ...]]'
    },
    // FIX: Renamed `testCases` to `examples` to match the Operator type.
    examples: [
        {
            code: '[1 2 3] powerlist',
            expected: [
                [ [1, 2, 3], [1, 2], [1, 3], [1], [2, 3], [2], [3], [] ]
            ]
        },
        {
            code: `"abcde" powerlist [size 3 >] filter`,
            assert: (s) => {
                const result = s[0].sort();
                const expected = [ "abcde", "abcd", "abce", "abde", "acde", "bcde" ].sort();
                return deepEqual(result, expected);
            },
            expectedDescription: `[ "abcde", "abcd", "abce", "abde", "acde", "bcde" ] (order may vary)`
        },
        {
            code: '{1 2 3 4} powerlist [size 3 ==] filter',
            assert: (s) => {
                const result = s[0];
                const expected = [ new Set([1,2,3]), new Set([1,2,4]), new Set([1,3,4]), new Set([2,3,4]) ];
                if (result.length !== expected.length) return false;
                // Since order of lists doesn't matter, check if every expected set is in the result.
                return expected.every(expectedSet => 
                    result.some(resultSet => deepEqual([...expectedSet].sort(), [...resultSet].sort()))
                );
            },
            expectedDescription: `A list containing all 4 subsets of size 3.`
        },
        {
            code: '{1 2 3 4 5} powerlist [size 3 ==] filter [sum] map',
            assert: (s) => {
                const sums = s[0].sort((a,b) => a-b);
                const expected = [6, 7, 8, 8, 9, 9, 10, 10, 11, 12];
                return deepEqual(sums, expected);
            },
            expectedDescription: `[6, 7, 8, 8, 9, 9, 10, 10, 11, 12]`
        },
        {
            code: '[] powerlist',
            expected: [[[]]]
        },
        {
            code: '"" powerlist',
            expected: [['']]
        },
        {
            code: '{} powerlist',
            expected: [[new Set()]]
        }
    ]
};