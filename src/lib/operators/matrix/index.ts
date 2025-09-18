
import { mat } from './mat';
import { cmat } from './cmat';
import { mat2 } from './mat2';
import { mat3 } from './mat3';
import { mat4 } from './mat4';
import { transpose } from './transpose';
import { rotmat } from './rotmat';
import { rotcol } from './rotcol';
import { rotrow } from './rotrow';
import { dotp } from './dot';
import { cross } from './cross';
import { matmul } from './matmul';
import { identity } from './identity';
import { rows } from './rows';
import { cols } from './cols';
import { matrows } from './from-rows';
import { matcols } from './from-cols';
import { matrot } from './matrot';
import { scalemat } from './scalemat';
import type { Category } from '../../types';

export const matrix: Category = {
    name: "Matrix Operations",
    description: "Operators for creating and manipulating matrices.",
    definitions: {
        mat,
        cmat,
        mat2,
        mat3,
        mat4,
        transpose,
        rotmat,
        rotcol,
        rotrow,
        dotp,
        cross,
        matmul,
        identity,
        rows,
        cols,
        'matrows': matrows,
        'matcols': matcols,
        matrot,
        scalemat,
    }
};
