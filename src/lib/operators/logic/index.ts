import { and } from './and';
import { or } from './or';
import { xor } from './xor';
import { not } from './not';
import type { Category } from '../../types';

export const logic: Category = {
    name: "Set operations",
    description: "Operators for performing set operations (intersection, union, difference) and boolean logic.",
    definitions: {
        and,
        or,
        xor,
        not,
    }
};