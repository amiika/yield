import { i } from './i';
import { dip } from './dip';
import { map } from './map';
import { filter } from './filter';
import { step } from './step';
import { ifte } from './ifte';
import { times } from './times';
import { whileOp } from './while';
import { branch } from './branch';
import { cleave } from './cleave';
import { cond } from './cond';
import { body } from './body';
import { yieldOp } from './evolve';
import type { Category } from '../../types';

export const combinators: Category = {
    name: "Combinators",
    description: "Higher-order functions that control execution flow.",
    definitions: {
        i,
        dip,
        map,
        filter,
        step,
        ifte,
        times,
        'while': whileOp,
        branch,
        cleave,
        cond,
        body,
        'yield': yieldOp,
    }
};
