// Updated imports to be unambiguous by pointing to the 'index' file within each operator category's directory. This resolves module loading errors caused by legacy, empty files with the same name as the directories.
import { combinators } from './combinators/index';
import { jsMath } from './jsMath/index';
import { lists } from './lists/index';
import { literals } from './literals/index';
import { input } from './input/index';
import { logic } from './logic/index';
import { math } from './math/index';
import { matrix } from './matrix/index';
import { predicates } from './predicates/index';
import { recursion } from './recursion/index';
import { stack } from './stack/index';
import { types } from './types/index';
import { utils } from './utils/index';
import { advancedStack } from './advancedStack/index';
import { functional } from './functional/index';
import { jsString } from './jsString/index';
import { advancedTypes } from './advancedTypes/index';
import { repl } from './repl/index';
import { history } from './history/index';
import { audio } from './audio/index';
import { shaders } from './shaders/index';
import { live } from './live/index';
import { musicology } from './musicology/index';
import { turtle } from './turtle/index';
import type { Category } from '../types';

// Merge the jsMath category into the main math category for a better user experience.
const mergedMathCategory: Category = {
    name: "Mathematical & Bitwise Operators",
    description: "Performing arithmetic, bitwise, and common mathematical functions.",
    definitions: {
        ...math.definitions,
        ...jsMath.definitions,
    }
};

// NEW: Merge Type, Conversion & Regex categories
const mergedTypesCategory: Category = {
    name: "Type, Conversion & Regex",
    description: "Operators for type casting, conversion, and regular expression operations.",
    definitions: {
        ...jsString.definitions,
        ...types.definitions,
        ...advancedTypes.definitions,
    }
};

// NEW: Merge Stack and Advanced Stack categories
const mergedStackCategory: Category = {
    name: "Stack Operations",
    description: "Operators for directly manipulating the stack, from simple primitives to advanced metaprogramming.",
    definitions: {
        ...stack.definitions,
        ...advancedStack.definitions,
    }
};

// This is the single source of truth for the entire operator library.
// The interpreter, documentation, and test runner all build from this.
export const operatorModules: { [key: string]: Category } = {
    'literals': literals,
    'input': input,
    'stack': mergedStackCategory,
    'logic': logic,
    'math': mergedMathCategory,
    'matrix': matrix,
    'types': mergedTypesCategory,
    'lists': lists,
    'functional': functional,
    'utils': utils,
    'predicates': predicates,
    'combinators': combinators,
    'recursion': recursion,
    'repl': repl,
    'history': history,
    'audio': audio,
    'musicology': musicology,
    'shaders': shaders,
    'turtle': turtle,
    'live': live,
};