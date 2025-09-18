
import type { TutorialSection } from './types';

export const repl: TutorialSection = {
    name: "Using REPL: System Commands",
    description: "The REPL has several built-in commands for managing your session.",
    cells: [
        {
            name: "Saving and Loading State",
            description: "`save` stores your current session (stack and definitions) in the browser's local storage. `load` restores it.",
            example: "1 2 3 \"my-state\" save \nclear \n\"my-state\" load",
            expected: [1, 2, 3]
        },
        {
            name: "Undo and Redo in REPL",
            description: "The `undo` command reverts the last operation. `redo` applies it again. Left & right arrows also undo & redo. These operators work only in REPL.",
            replCode: ["1 2 +", "undo"],
            expected: []
        }
    ]
};
