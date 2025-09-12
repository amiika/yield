

import { iterate } from './iterate';
import { dip } from './dip';
import { dupdip } from './dupdip';
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
import { yieldOp } from './yield';
import type { Category } from '../../types';

export const combinators: Category = {
    name: "Combinators",
    description: "Higher-order functions that control execution flow.",
    definitions: {
        iterate,
        i: iterate,
        dip,
        dupdip,
        map,
        filter,
        step,
        ifte,
        '?': ifte,
        times,
        'while': whileOp,
        branch,
        cleave,
        cond,
        body,
        'yield': yieldOp,
    }
};
