import type { Category } from '../../types';
import { p } from './p';
import { forward } from './forward';
import { left } from './left';
import { right } from './right';
import { penup } from './penup';
import { pendown } from './pendown';
import { setxy } from './setxy';
import { setheading } from './setheading';
import { setpencolor } from './setpencolor';
import { setpensize } from './setpensize';
import { move } from './move';
import { yaw } from './yaw';
import { pitch } from './pitch';
import { roll } from './roll';
import { angle } from './angle';

export const turtle: Category = {
    name: "Turtle Graphics",
    description: "Operators for creating 2D and 3D line drawings with a programmable turtle.",
    definitions: {
        p,
        forward,
        left,
        right,
        penup,
        pendown,
        setxy,
        setheading,
        setpencolor,
        setpensize,
        move,
        yaw,
        pitch,
        roll,
        angle,
    }
};