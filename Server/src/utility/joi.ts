import { SamePropertyName } from './type';
import joi from 'joi';

export function makeSchema<T>(definition: SamePropertyName<T>) {
    return joi.object(definition).required();
}