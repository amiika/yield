
import { ord } from './ord';
import { chr } from './chr';
import { set } from './set';
import { degrees } from './degrees';
import { turns } from './turns';
import { toPolar } from './toPolar';
import { fromPolar } from './fromPolar';
import type { Category } from '../../types';

export const types: Category = {
    name: "Type & Conversion",
    description: "Operators for converting between data types.",
    definitions: {
        ord,
        chr,
        set,
        degrees,
        turns,
        toPolar,
        fromPolar,
    }
};