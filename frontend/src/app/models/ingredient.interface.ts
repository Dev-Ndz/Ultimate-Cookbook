import { Unit } from './unit.enum';

export interface Ingredient {
  quantity: number;
  name: string;
  unit: Unit;
  isChecked: boolean;

  toString(): string;
}
