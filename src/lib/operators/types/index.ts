import { ord } from './ord';
import { chr } from './chr';
import { set } from './set';
import type { Category } from '../../types';

export const types: Category = {
    name: "Type & Conversion",
    description: "Operators for converting between data types.",
    definitions: {
        ord,
        chr,
        set,
    }
};