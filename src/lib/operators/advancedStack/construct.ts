import type { Operator, EvaluateFn } from '../../types';

export const construct: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const constructors = s.pop();
            const setup = s.pop();
            if (!Array.isArray(constructors) || !Array.isArray(setup)) {
                throw new Error('construct expects two lists on top of the stack.');
            }
            
            const savedStack = [...s];
            
            // Execute setup on a copy, its results are discarded.
            const setupStack = [...s];
            yield* evaluate(setup, setupStack, options);

            const allResults = [];
            // Run each constructor on a fresh copy of the saved stack
            // and collect only the top of the stack as the result.
            for (const program of constructors) {
                const tempStack = [...savedStack];
                yield* evaluate(program, tempStack, options);
                if (tempStack.length > 0) {
                    allResults.push(tempStack[tempStack.length - 1]);
                }
            }
            // Push all collected results at the end.
            s.push(...allResults);
        },
        description: 'Saves the stack, executes a setup program [P], then executes each program in a list of constructor programs [[P1] [P2]..] on the saved stack, collecting the single result from each.',
        effect: '[S [P] [[P1]..]] -> [S R1 R2 ..]'
    },
    examples: [
        { code: `10 20 [pop] [[dup] [succ]] construct`, expected: [10, 20, 20, 21] }
    ]
};