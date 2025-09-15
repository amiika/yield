
import { mouse } from './mouse';
import { mousex } from './mousex';
import { mousey } from './mousey';
import { moused } from './moused';
import { mousedx } from './mousedx';
import { mousedy } from './mousedy';
import { mousedPredicate } from './mousedownPredicate';
import type { Category } from '../../types';

export const input: Category = {
    name: "Input Devices",
    description: "Operators for getting input from devices like the mouse.",
    definitions: {
        mouse,
        mousex,
        mousey,
        moused,
        mousedx,
        mousedy,
        'moused?': mousedPredicate,
    }
};
