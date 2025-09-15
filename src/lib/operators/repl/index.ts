import { cr } from './cr';
import { print } from './emit';
import { save } from './save';
import { load } from './load';
import { ls } from './ls';
import { lurk } from './lurk';
import type { Category } from '../../types';

export const repl: Category = {
    name: "REPL I/O",
    description: "Operators for interacting with the REPL environment.",
    definitions: {
        cr,
        print,
        save,
        load,
        ls,
        lurk,
    }
};