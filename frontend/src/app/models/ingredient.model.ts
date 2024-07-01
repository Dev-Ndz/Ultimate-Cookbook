import { ingredient } from './ingredient.interface';
import { Unit } from './unit.enum';

export class IngredientModel implements ingredient {
  quantity: number;
  name: string;
  unit: string;

  constructor(quantity: number, name: string, unit: string) {
    this.quantity = quantity;
    this.name = name;
    this.unit = unit;
  }

  toString(): string {
    return this.quantity + ' ' + this.name + ' ' + this.unit ;
  }
}
