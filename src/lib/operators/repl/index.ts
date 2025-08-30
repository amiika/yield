import { cr } from './cr';
import { emit } from './emit';
import type { Category } from '../../types';

export const repl: Category = {
    name: "REPL I/O",
    description: "Operators for interacting with the REPL environment.",
    definitions: {
        cr,
        emit,
    }
};
