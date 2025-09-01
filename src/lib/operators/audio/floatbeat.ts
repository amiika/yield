import type { Operator, StackValue } from '../../types';

const opMap = {
    // Math
    '+': (b, a) => `(${a} + ${b})`,
    '-': (b, a) => `(${a} - ${b})`,
    '*': (b, a) => `(${a} * ${b})`,
    '/': (b, a) => `(${a} / ${b})`,
    '%': (b, a) => `(${a} % ${b})`,
    // Bitwise
    '>>': (b, a) => `(${a} >> ${b})`,
    '<<': (b, a) => `(${a} << ${b})`,
    '&': (b, a) => `(${a} & ${b})`,
    '|': (b, a) => `(${a} | ${b})`,
    '^': (b, a) => `(${a} ^ ${b})`,
    '~': (a) => `(~${a})`,
    // JS Math
    'sin': (a) => `Math.sin(${a})`,
    'cos': (a) => `Math.cos(${a})`,
    'tan': (a) => `Math.tan(${a})`,
    'pow': (b, a) => `Math.pow(${a}, ${b})`,
    'sqrt': (a) => `Math.sqrt(${a})`,
    'abs': (a) => `Math.abs(${a})`,
    'floor': (a) => `Math.floor(${a})`,
    'ceil': (a) => `Math.ceil(${a})`,
    'round': (a) => `Math.round(${a})`,
    // Relational (return 1 or 0)
    '>': (b, a) => `((${a} > ${b}) ? 1 : 0)`,
    '<': (b, a) => `((${a} < ${b}) ? 1 : 0)`,
    '>=': (b, a) => `((${a} >= ${b}) ? 1 : 0)`,
    '<=': (b, a) => `((${a} <= ${b}) ? 1 : 0)`,
    '==': (b, a) => `((${a} === ${b}) ? 1 : 0)`,
    '!=': (b, a) => `((${a} !== ${b}) ? 1 : 0)`,
};

const arityMap = {
    // Math
    '+': 2, '-': 2, '*': 2, '/': 2, '%': 2,
    // Bitwise
    '>>': 2, '<<': 2, '&': 2, '|': 2, '^': 2,
    '~': 1,
    // JS Math
    'sin': 1, 'cos': 1, 'tan': 1, 'pow': 2, 'sqrt': 1, 'abs': 1,
    'floor': 1, 'ceil': 1, 'round': 1,
    // Relational
    '>': 2, '<': 2, '>=': 2, '<=': 2, '==': 2, '!=': 2,
};

function transpile(quotation: StackValue[]): string {
    const stack: string[] = [];
    for (const token of quotation) {
        if (typeof token === 'number') {
            stack.push(String(token));
        } else if (typeof token === 'string') {
            if (token === 't') {
                stack.push('t');
            } else if (opMap[token]) {
                const arity = arityMap[token];
                if (stack.length < arity) {
                    throw new Error(`Stack underflow during floatbeat transpilation for operator '${token}'.`);
                }
                const args = stack.splice(stack.length - arity, arity);
                const jsExpr = opMap[token](...args.reverse()); // Reverse args for correct order
                stack.push(jsExpr);
            } else {
                 throw new Error(`Unsupported operator in floatbeat quotation: '${token}'. Only basic math, bitwise, and some JS Math operators are supported.`);
            }
        } else {
            throw new Error(`Unsupported token type in floatbeat quotation: ${typeof token}`);
        }
    }

    if (stack.length === 0) {
        throw new Error('Floatbeat quotation must result in a value on the stack.');
    }
    
    // Be lenient: if there are multiple values, just use the top one.
    // This handles cases where a formula inadvertently leaves extra values on the stack.
    return stack[stack.length - 1];
}


export const floatbeat: Operator = {
    definition: {
        exec: function*(s) {
            const quotation = s.pop() as StackValue[];
            if (!Array.isArray(quotation)) throw new Error('floatbeat expects a quotation (list).');
            
            const jsCode = transpile(quotation);
            s.push(['floatbeat', jsCode]);
        },
        description: 'Floatbeat node. Consumes a quotation which is a stack-based formula that is transpiled into a high-performance JavaScript expression. This expression is evaluated for every audio sample. The special operator `t` is implicitly available in the quotation and represents the current time in samples. The float result is used directly as an audio sample and should be in the -1 to 1 range. Supported operators: `+ - * / % >> << & | ^ ~ sin cos tan pow sqrt abs floor ceil round > < >= <= == !=`. Relational operators return 1 for true and 0 for false.',
        effect: '[[Quotation]] -> [L_graph]'
    },
    // FIX: Renamed `testCases` to `examples` to match the Operator type.
    examples: [
        { 
            code: `[t 44100 / 440 * 2 * 3.14159 * sin] floatbeat`, 
            expected: [['floatbeat', 'Math.sin(((((t / 44100) * 440) * 2) * 3.14159))']] 
        },
    ]
};