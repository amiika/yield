import { trueOp } from './true';
import { falseOp } from './false';
import { maxint } from './maxint';
import { stack } from './stack';
import { clock } from './clock';
import { rand } from './rand';
import { clearall } from './clearall';
import type { Category } from '../../types';

export const literals: Category = {
    name: "System & Environment",
    description: "Pushing constants and interacting with the environment.",
    definitions: {
        'true': trueOp,
        'false': falseOp,
        maxint,
        stack,
        clock,
        rand,
        clearall,
    }
};