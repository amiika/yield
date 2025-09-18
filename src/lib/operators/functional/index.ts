
import { swons } from './swons';
import { enconcat } from './enconcat';
import { unswons } from './unswons';
import { leaf } from './leaf';
import { fold } from './fold';
import { split } from './split';
import { some } from './some';
import { all } from './all';
import { powerlist } from './powerlist';
import { swoncat } from './swoncat';
import { always } from './always';
import { compose } from './compose';
import { curry } from './curry';
import { uncurry } from './uncurry';
import { rewrite } from './rewrite';
import type { Category } from '../../types';

export const functional: Category = {
    name: "Functional & Aggregate Operations",
    description: "Higher-order functions for list processing and advanced aggregate manipulation.",
    definitions: {
        swons,
        swoncat,
        enconcat,
        unswons,
        leaf,
        fold,
        split,
        some,
        all,
        powerlist,
        always,
        compose,
        curry,
        uncurry,
        rewrite,
    }
};
