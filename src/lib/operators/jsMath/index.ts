import { acos } from './acos';
import { asin } from './asin';
import { atan } from './atan';
import { atan2 } from './atan2';
import { ceil } from './ceil';
import { cos } from './cos';
import { cosh } from './cosh';
import { exp } from './exp';
import { floor } from './floor';
import { ln } from './log';
import { log10 } from './log10';
import { pow } from './pow';
import { sin } from './sin';
import { sinh } from './sinh';
import { sqrt } from './sqrt';
import { tan } from './tan';
import { tanh } from './tanh';
import { trunc } from './trunc';
import type { Category } from '../../types';

export const jsMath: Category = {
    name: "JS Math Bridge",
    description: "Operators from the JavaScript Math object.",
    definitions: {
        acos,
        asin,
        atan,
        atan2,
        ceil,
        cos,
        cosh,
        exp,
        floor,
        ln,
        log10,
        pow,
        sin,
        sinh,
        sqrt,
        tan,
        tanh,
        trunc,
    }
};
