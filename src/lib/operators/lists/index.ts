import { cons } from './cons';
import { append } from './append';
import { uncons } from './uncons';
import { first } from './first';
import { spread } from './spread';
import { rest } from './rest';
import { size } from './size';
import { at } from './at';
import { of } from './of';
import { drop } from './drop';
import { take } from './take';
import { concat } from './concat';
import { join } from './join';
import type { Category } from '../../types';

export const lists: Category = {
    name: "Aggregate (List) Operators",
    description: "Operators for creating, deconstructing, and manipulating lists.",
    definitions: {
        cons,
        append,
        uncons,
        first,
        spread,
        rest,
        size,
        at,
        of,
        drop,
        take,
        concat,
        join,
    }
};