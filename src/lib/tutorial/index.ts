

import type { TutorialSection } from './types';
import { gettingStarted } from './gettingStarted';
import { stackPrimitives } from './stackPrimitives';
import { quotedPrograms } from './quotedPrograms';
import { combinators } from './combinators';
import { advancedExecution } from './advancedExecution';
import { audio } from './audio';
import { schoenberg } from './schoenberg';
import { shaders } from './shaders';
import { repl } from './repl';
import { projectEuler } from './projectEuler';
import { forthClassics } from './forthClassics';
import { turtleGraphics } from './turtleGraphics';

export const documentation: TutorialSection[] = [
    gettingStarted,
    stackPrimitives,
    quotedPrograms,
    combinators,
    advancedExecution,
    audio,
    schoenberg,
    shaders,
    turtleGraphics,
    repl,
    projectEuler,
    forthClassics,
];