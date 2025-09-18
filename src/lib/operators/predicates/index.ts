
import { greaterThanOrEqual } from './greaterThanOrEqual';
import { greaterThan } from './greaterThan';
import { lessThanOrEqual } from './lessThanOrEqual';
import { lessThan } from './lessThan';
import { notEqual } from './notEqual';
import { equal } from './equal';
import { nullPredicate } from './nullPredicate';
import { small } from './small';
import { has } from './has';
import { inOp } from './in';
import { integerPredicate } from './integerPredicate';
import { charPredicate } from './charPredicate';
import { logicalPredicate } from './logicalPredicate';
import { stringPredicate } from './stringPredicate';
import { listPredicate } from './listPredicate';
import { setPredicate } from './setPredicate';
import { nanPredicate } from './nanPredicate';
import { infinitePredicate } from './infinitePredicate';
import type { Category } from '../../types';

export const predicates: Category = {
    name: "Predicates",
    description: "Operators that test values and return a boolean.",
    definitions: {
        '>=': greaterThanOrEqual,
        '>': greaterThan,
        '<=': lessThanOrEqual,
        '<': lessThan,
        '!=': notEqual,
        '==': equal,
        'null?': nullPredicate,
        small,
        has,
        'in': inOp,
        'integer?': integerPredicate,
        'char?': charPredicate,
        'logical?': logicalPredicate,
        'string?': stringPredicate,
        'list?': listPredicate,
        'set?': setPredicate,
        'nan?': nanPredicate,
        'infinite?': infinitePredicate,
    }
};