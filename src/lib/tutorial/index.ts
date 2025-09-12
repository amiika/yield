import type { TutorialSection } from './types';
import { gettingStarted } from './gettingStarted';
import { stackPrimitives } from './stackPrimitives';
import { quotedPrograms } from './quotedPrograms';
import { combinators } from './combinators';
import { audio } from './audio';
import { shaders } from './shaders';
import { repl } from './repl';
import { projectEuler } from './projectEuler';

export const documentation: TutorialSection[] = [
    gettingStarted,
    stackPrimitives,
    quotedPrograms,
    combinators,
    audio,
    shaders,
    repl,
    projectEuler,
];
