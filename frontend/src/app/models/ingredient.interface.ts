import { Unit } from './unit.enum';

export interface ingredient {
  quantity: number;
  name: string;
  unit: string;

  toString(): string;
}
