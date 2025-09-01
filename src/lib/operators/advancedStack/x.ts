import type { Operator, EvaluateFn } from '../../types';

export const x: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            if (s.length < 1) throw new Error('x expects a quotation on the stack.');
            const program = s[s.length - 1]; // Peek
            if (!Array.isArray(program)) throw new Error('x expects a quotation on top of the stack.');
            
            const originalStack = [...s];
            
            // Pop the program and execute it on the rest of the stack
            s.pop();
            yield* evaluate(program, s, options);
            const results = [...s]; // The modified stack contains the results

            // Restore the stack to its original state and push the results
            s.length = 0;
            s.push(...originalStack);
            s.push(...results);
        },
        description: 'Executes the quotation on top of the stack without popping it. The quotation is applied to the stack below it, and the results are pushed on top.',
        effect: '[X [P]] -> [X [P] R]'
    },
    examples: [
        { code: '10 [1 +] x', expected: [10, [1, '+'], 11] }
    ]
};