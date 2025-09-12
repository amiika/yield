import { and } from './and';
import { or } from './or';
import { xor } from './xor';
import { not } from './not';
import type { Category } from '../../types';

export const logic: Category = {
    name: "Logical Operations",
    description: "Operators for performing boolean logic. For lists, these operators perform set-like operations (intersection, union, etc.).",
    definitions: {
        and,
        or,
        xor,
        not,
    }
};