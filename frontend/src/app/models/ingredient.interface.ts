import { Unit } from './unit.enum';

export interface Ingredient {
  quantity: number;
  name: string;
  unit: Unit;

  toString(): string;
}
