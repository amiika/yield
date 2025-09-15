
import type { Operator, StackValue } from '../../types';

const PRECEDENCE: { [key: string]: number } = {
    // Higher number = higher precedence.
    // All are treated as left-associative for simplicity.
    'pow': 4,
    'max': 4,
    'min': 4,
    '*': 3, '/': 3, '%': 3,
    '+': 2, '-': 2,
    '>': 1, '<': 1,
    '==': 0,
    '&': -1,
    '|': -2,
};

const isOperator = (token: StackValue): token is string =>
    typeof token === 'string' && PRECEDENCE[token] !== undefined;

const yardRecursive = (tokens: StackValue[]): StackValue[] => {
    const output: StackValue[] = [];
    const ops: string[] = [];

    for (const token of tokens) {
        if (isOperator(token)) {
            while (
                ops.length > 0 &&
                isOperator(ops[ops.length - 1]) &&
                PRECEDENCE[ops[ops.length - 1]] >= PRECEDENCE[token]
            ) {
                output.push(ops.pop()!);
            }
            ops.push(token);
        } else if (Array.isArray(token)) {
            // This is how we handle parentheses.
            // A sub-list is a parenthesized expression.
            output.push(...yardRecursive(token));
        } else {
            // It's an operand (number, word, symbol)
            output.push(token);
        }
    }

    while (ops.length > 0) {
        output.push(ops.pop()!);
    }

    return output;
};

export const yard: Operator = {
    definition: {
        exec: function*(s) {
            const infix = s.pop();
            if (!Array.isArray(infix)) {
                throw new Error('yard operator expects a list (quotation) in infix notation.');
            }
            const postfix = yardRecursive(infix);
            s.push(postfix);
        },
        description: `Implements Dijkstra's Shunting-yard algorithm to convert an infix expression (given as a list) into a postfix (RPN) expression. Supports common arithmetic, relational, and bitwise operators with standard precedence. It handles nested lists as parenthesized sub-expressions.`,
        effect: `[infix_list] -> [postfix_list]`
    },
    examples: [
        {
            code: `(1 + 2) yard`,
            expected: [[1, 2, '+']]
        },
        {
            code: `(3 * 4 + 5) yard`,
            expected: [[3, 4, '*', 5, '+']]
        },
        {
            code: `(3 + 4 * 5) yard`,
            expected: [[3, 4, 5, '*', '+']]
        },
        {
            code: `((2 * 4) / 4) yard`,
            expected: [[2, 4, '*', 4, '/']]
        },
        {
            code: `(foo / bar) yard`,
            expected: [['foo', 'bar', '/']]
        },
        {
            code: `(a + (b * c) + d) yard`,
            expected: [['a', 'b', 'c', '*', '+', 'd', '+']]
        },
        {
            code: `(2 * 3 pow 2) yard`,
            expected: [[2, 3, 2, 'pow', '*']]
        },
        {
            code: `(3 + 4 < 8) yard`,
            expected: [[3, 4, '+', 8, '<']]
        },
        {
            code: `(3 & 5 | 2) yard`,
            expected: [[3, 5, '&', 2, '|']]
        },
        {
            code: `(a max b == c min d) yard`,
            expected: [['a', 'b', 'max', 'c', 'd', 'min', '==']]
        }
    ]
};
