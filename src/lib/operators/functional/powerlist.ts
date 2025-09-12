import type { Operator } from '../../types';
import { deepEqual } from '../../utils';

// Recursive helper to generate the powerlist/powerset
const generatePowerlist = (agg: any[] | string): any[] => {
    const items = agg;

    if (items.length === 0) {
        if (typeof agg === 'string') return [""];
        return [[]];
    }

    const first = items[0];
    const restItems = items.slice(1);
    
    const subPowerlist = generatePowerlist(restItems);
    
    const withFirst = subPowerlist.map(sub => {
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
            if (Array.isArray(agg) || typeof agg === 'string') {
                s.push(generatePowerlist(agg));
            } else {
                throw new Error('powerlist expects a list or string.');
            }
        },
        description: 'For an aggregate of size N, produces a list of all 2^N subaggregates (sublists or subsequences of characters).',
        effect: '[A] -> [[A1, A2, ...]]'
    },
    examples: [
        {
            code: '(1 2) powerlist',
            assert: (s) => {
                const result = s[0];
                const expected = [[1, 2], [1], [2], []];
                // Check if all expected items are in the result and vice-versa
                return result.length === expected.length && expected.every(e => result.some(r => deepEqual(e, r)));
            },
            expectedDescription: 'A list containing [[1,2], [1], [2], []] (order may vary)'
        },
        {
            code: '"ab" powerlist',
            assert: (s) => {
                const result = s[0].sort();
                const expected = ["ab", "a", "b", ""].sort();
                return deepEqual(result, expected);
            },
            expectedDescription: `A list containing ["ab", "a", "b", ""] (order may vary)`
        },
        {
            code: '() powerlist',
            expected: [[[]]]
        },
        {
            code: '"" powerlist',
            expected: [[""]]
        },
        {
            code: '(1 1) powerlist',
             assert: (s) => {
                const result = s[0];
                const expected = [[1, 1], [1], [1], []];
                return result.length === expected.length && expected.every(e => result.some(r => deepEqual(e, r)));
            },
            expectedDescription: `A list containing [[1,1], [1], [1], []] (order may vary)`
        },
        {
            code: '(1 2) powerlist (size) map',
            assert: (s) => {
                const result = s[0].sort((a,b) => a-b);
                const expected = [0, 1, 1, 2];
                return deepEqual(result, expected);
            },
            expectedDescription: 'A list of the sizes of each sublist: [0, 1, 1, 2] (order may vary)'
        }
    ]
};
