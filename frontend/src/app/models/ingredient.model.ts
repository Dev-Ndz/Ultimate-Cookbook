import { Ingredient } from './ingredient.interface';
import { Unit } from './unit.enum';

export class IngredientModel implements Ingredient {
  quantity: number;
  name: string;
  unit: Unit;
  isChecked: boolean;

  constructor(quantity: number, name: string, unit: Unit);

  constructor(quantity: number, name: string, unit: Unit, isChecked: boolean);

  constructor(quantity: number, name: string, unit: Unit, isChecked?: boolean) {
    this.quantity = quantity;
    this.name = name;
    this.unit = unit;
    this.isChecked = isChecked ?? false;
  }

  toString(): string {
    let displayedUnit = this.unit == Unit.Piece ? ' ' : this.unit;
    return this.quantity + ' ' + displayedUnit + ' ' + this.name;
  }
}
