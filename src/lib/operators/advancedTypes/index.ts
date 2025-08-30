import { stringOp } from './toString';
import { toNumber } from './toNumber';
import { toBool } from './toBool';
import { regtest } from './regtest';
import { regsub } from './regsub';
import { regsubg } from './regsubg';
import type { Category } from '../../types';

export const advancedTypes: Category = {
    name: "Advanced Types & Regex",
    description: "Operators for type casting, regular expression validation, and string replacement.",
    definitions: {
        'string': stringOp,
        toNumber,
        toBool,
        regtest,
        regsub,
        regsubg,
    }
};