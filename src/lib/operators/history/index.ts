import { undo } from './undo';
import { redo } from './redo';
import { clearhistory } from './clearhistory';
import { again } from './again';
import type { Category } from '../../types';

export const history: Category = {
    name: "History Management",
    description: "Operators for managing the REPL session history (undo/redo).",
    definitions: {
        undo,
        redo,
        clearhistory,
        again,
    }
};