
import type { TutorialSection } from './types';
import { gettingStarted } from './gettingStarted';
import { stackPrimitives } from './stackPrimitives';
import { quotedPrograms } from './quotedPrograms';
import { combinators } from './combinators';
import { advancedExecution } from './advancedExecution';
import { audio } from './audio';
import { shaders } from './shaders';
import { repl } from './repl';
import { projectEuler } from './projectEuler';
import { forthClassics } from './forthClassics';

export const documentation: TutorialSection[] = [
    gettingStarted,
    stackPrimitives,
    quotedPrograms,
    combinators,
    advancedExecution,
    audio,
    shaders,
    repl,
    projectEuler,
    forthClassics,
];