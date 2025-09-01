import type { Operator, StackValue } from '../../types';

export const again: Operator = {
    definition: {
        exec: function*(stack, options, evaluate) {
            const { commandHistory, parse } = options;

            if (!commandHistory || commandHistory.length < 2 || !parse) {
                // Cannot run 'again' if there is no command in the history to repeat.
                // The current command is always the last one, so we need at least 2.
                return;
            }

            // Find the last command that isn't 'again', starting from the command
            // BEFORE the current one (which is always at the end of the history).
            // This prevents infinite recursion if 'again' is part of the current command.
            let lastCommand: string | null = null;
            for (let i = commandHistory.length - 2; i >= 0; i--) {
                const cmd = commandHistory[i].trim().toLowerCase();
                if (cmd !== 'again') {
                    lastCommand = commandHistory[i];
                    break;
                }
            }

            if (lastCommand) {
                // Use the provided parse and evaluate functions
                const program: StackValue[] = parse(lastCommand);
                yield* evaluate(program, stack, options);
            }
        },
        description: 'Re-executes the last command from the history that was not "again".',
        effect: '[...] -> [...]'
    },
    // FIX: Renamed 'testCases' to 'examples' to match the Operator type.
    examples: [
        {
            code: ['1 2 +', 'again'],
            expected: [3, 3]
        },
        {
            code: ['5 dup *', 'again'],
            expected: [25, 25]
        },
        {
            code: ['1', 'again', 'again'],
            expected: [1, 1, 1]
        },
        // Should not infinitely recurse when 'again' is part of a command with no prior history.
        {
            code: ['1 1 + again'],
            expected: [2],
        },
        // Should correctly execute the previous command when 'again' is part of the current command.
        {
            code: ['10 20 +', '1 again'],
            expected: [30, 1, 30],
        },
        // Should do nothing if 'again' is in the very first command.
        {
            code: ['1 again'],
            expected: [1],
        },
        {
            code: ['[1] mylist =', '1 mylist <-', 'again', 'mylist' ],
            expected: [[1, 1, 1]]
        }
    ]
};