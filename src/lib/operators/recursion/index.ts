import { linrec } from './linrec';
import { binrec } from './binrec';
import { primrec } from './primrec';
import { tailrec } from './tailrec';
import { genrec } from './genrec';
import { condlinrec } from './condlinrec';
import type { Category } from '../../types';

export const recursion: Category = {
    name: "Recursive Combinators",
    description: "Specialized combinators for performing various forms of recursion, from simple linear patterns to the most general cases.",
    definitions: {
        linrec,
        binrec,
        primrec,
        tailrec,
        genrec,
        condlinrec,
    }
};