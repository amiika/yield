// FIX: Updated imports to be unambiguous by pointing to the 'index' file within each operator category's directory. This resolves module loading errors caused by legacy, empty files with the same name as the directories.
import { combinators } from './combinators/index';
import { jsMath } from './jsMath/index';
import { lists } from './lists/index';
import { literals } from './literals/index';
import { logic } from './logic/index';
import { math } from './math/index';
import { predicates } from './predicates/index';
import { recursion } from './recursion/index';
import { stack } from './stack/index';
import { types } from './types/index';
import { utils } from './utils/index';
import { advancedStack } from './advancedStack';
import { functional } from './functional';
import { jsString } from './jsString';
import { advancedTypes } from './advancedTypes';
import { repl } from './repl';
import { history } from './history/index';
import { audio } from './audio/index';
import type { Category } from '../types';

// This is the single source of truth for the entire operator library.
// The interpreter, documentation, and test runner all build from this.
export const operatorModules: { [key: string]: Category } = {
    'literals': literals,
    'stack': stack,
    'advancedStack': advancedStack,
    'logic': logic,
    'math': math,
    'jsmath': jsMath,
    'jsString': jsString,
    'types': types,
    'advancedTypes': advancedTypes,
    'lists': lists,
    'functional': functional,
    'utils': utils,
    'predicates': predicates,
    'combinators': combinators,
    'recursion': recursion,
    'repl': repl,
    'history': history,
    'audio': audio,
};