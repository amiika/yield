import { swons } from './swons';
import { enconcat } from './enconcat';
import { unswons } from './unswons';
import { equal } from './equal';
import { leaf } from './leaf';
import { fold } from './fold';
import { split } from './split';
import { some } from './some';
import { all } from './all';
import type { Category } from '../../types';

export const functional: Category = {
    name: "Functional & Aggregate Operations",
    description: "Higher-order functions for list processing and advanced aggregate manipulation.",
    definitions: {
        swons,
        enconcat,
        unswons,
        equal,
        leaf,
        fold,
        split,
        some,
        all,
    }
};