import { unitlist } from './unitlist';
import { second } from './second';
import { third } from './third';
import { shunt } from './shunt';
import { reverse } from './reverse';
import { dip2 } from './dip2';
import { dip3 } from './dip3';
import { enjoin } from './enjoin';
import type { Category } from '../../types';

export const utils: Category = {
    name: "Utility Operators",
    description: "General-purpose helper operators.",
    definitions: {
        unitlist,
        second,
        third,
        shunt,
        reverse,
        dip2,
        dip3,
        enjoin,
    }
};
