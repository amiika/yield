
import type { Operator, StackValue } from '../../types';

export const scala: Operator = {
    definition: {
        exec: function*(s) {
            const quotation = s.pop();
            if (!Array.isArray(quotation)) {
                throw new Error('scala operator expects a quotation.');
            }

            const tempStack: number[] = [];
            for (const token of quotation) {
                if (typeof token === 'number') {
                    tempStack.push(token);
                } else if (token === 'rat') {
                    if (tempStack.length < 2) {
                        throw new Error('rat requires two numbers (numerator denominator) on the stack within a scala quotation.');
                    }
                    const denominator = tempStack.pop() as number;
                    const numerator = tempStack.pop() as number;
                    if (denominator === 0) {
                        throw new Error('Ratio denominator cannot be zero.');
                    }
                    const cents = 1200 * Math.log2(numerator / denominator);
                    tempStack.push(cents);
                } else if (token === 'edo') {
                    if (tempStack.length < 2) {
                        throw new Error('edo requires two numbers (step divisions) on the stack within a scala quotation.');
                    }
                    const divisions = tempStack.pop() as number;
                    const step = tempStack.pop() as number;
                    if (divisions === 0) {
                        throw new Error('EDO divisions cannot be zero.');
                    }
                    const cents = (step / divisions) * 1200;
                    tempStack.push(cents);
                } else {
                    throw new Error(`Invalid token in scala quotation: '${token}'. Only numbers, 'rat', and 'edo' are allowed.`);
                }
            }
            s.push(tempStack);
        },
        description: `Parses a musical scale definition written in postfix notation inside a quotation. The quotation can contain numbers (interpreted as cents), or pairs of numbers followed by 'rat' (for fractional ratios) or 'edo' (for equal divisions of the octave). The result is a list of scale degrees in cents.`,
        effect: `[quotation] -> [list_of_cents]`
    },
    examples: [
        {
            code: '(200.0 400. 500. 700. 900. 1000. 1200.) scala',
            expected: [[200.0, 400, 500, 700, 900, 1000, 1200]]
        },
        {
            code: '(9 8 rat 5 4 rat 3 2 rat) scala',
            assert: s => {
                const res = s[0];
                return Array.isArray(res) &&
                       Math.abs(res[0] - 203.91) < 1e-2 &&
                       Math.abs(res[1] - 386.31) < 1e-2 &&
                       Math.abs(res[2] - 701.95) < 1e-2;
            },
            expectedDescription: 'A just intonation major scale in cents: [203.91, 386.31, 701.95, ...]'
        },
        {
            code: '(1 12 edo 2 12 edo 3 12 edo) scala',
            expected: [[100, 200, 300]]
        },
        {
            code: '(200. 9 8 rat 4 12 edo) scala',
            assert: s => {
                 const res = s[0];
                return Array.isArray(res) &&
                       res[0] === 200.0 &&
                       Math.abs(res[1] - 203.91) < 1e-2 &&
                       res[2] === 400;
            },
            expectedDescription: 'A mixed scale: [200.0, 203.91..., 400.0]'
        },
        {
            code: '(1 4 rat 3 4 rat) scala',
            assert: s => {
                const res = s[0];
                return Array.isArray(res) &&
                       Math.abs(res[0] - (-2400)) < 1e-2 && // 1/4 is two octaves down
                       Math.abs(res[1] - (-498.04)) < 1e-2; // 3/4 is a major third down
            },
            expectedDescription: 'A scale with descending intervals.'
        }
    ]
};
