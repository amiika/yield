import { add } from './add';
import { subtract } from './subtract';
import { multiply } from './multiply';
import { divide } from './divide';
import { modulo } from './modulo';
import { div } from './div';
import { succ } from './succ';
import { pred } from './pred';
import { max } from './max';
import { min } from './min';
import { sum } from './sum';
import { neg } from './neg';
import { abs } from './abs';
import { sign } from './sign';
import { bitwiseAnd } from './bitwiseAnd';
import { bitwiseOr } from './bitwiseOr';
import { bitwiseXor } from './bitwiseXor';
import { bitwiseNot } from './bitwiseNot';
import { leftShift } from './leftShift';
import { rightShift } from './rightShift';
import { average } from './average';
import type { Category } from '../../types';

export const math: Category = {
    name: "Mathematical & Bitwise Operators",
    description: "Performing arithmetic and bitwise operations.",
    definitions: {
        '+': add,
        '-': subtract,
        '*': multiply,
        '/': divide,
        '%': modulo,
        div,
        succ,
        pred,
        max,
        min,
        sum,
        neg,
        abs,
        sign,
        average,
        '&': bitwiseAnd,
        '|': bitwiseOr,
        '^': bitwiseXor,
        '~': bitwiseNot,
        '<<': leftShift,
        '>>': rightShift
    }
};
