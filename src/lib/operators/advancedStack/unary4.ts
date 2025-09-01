import type { Operator, EvaluateFn } from '../../types';

export const unary4: Operator = {
    definition: {
        exec: function*(s, options, evaluate: EvaluateFn) {
            const p = s.pop();
            const x4 = s.pop();
            const x3 = s.pop();
            const x2 = s.pop();
            const x1 = s.pop();
            
            const tempStack1 = [x1];
            yield* evaluate(p, tempStack1, options);
            
            const tempStack2 = [x2];
            yield* evaluate(p, tempStack2, options);

            const tempStack3 = [x3];
            yield* evaluate(p, tempStack3, options);

            const tempStack4 = [x4];
            yield* evaluate(p, tempStack4, options);

            s.push(...tempStack1, ...tempStack2, ...tempStack3, ...tempStack4);
        },
        description: 'Executes the same program P on four separate values, returning four results.',
        effect: '[X1 X2 X3 X4 [P]] -> [R1 R2 R3 R4]'
    },
    examples: [
        { code: '10 20 30 40 [succ] unary4', expected: [11, 21, 31, 41] }
    ]
};