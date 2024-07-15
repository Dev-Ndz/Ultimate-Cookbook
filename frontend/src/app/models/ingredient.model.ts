import { Ingredient } from './ingredient.interface';
import { Unit } from './unit.enum';

export class IngredientModel implements Ingredient {
  quantity: number;
  name: string;
  unit: Unit;

  constructor(quantity: number, name: string, unit: Unit) {
    this.quantity = quantity;
    this.name = name;
    this.unit = unit;
  }

  toString(): string {
    let displayedUnit = this.unit == Unit.Piece ? '' : this.unit;
    return this.quantity + ' ' + displayedUnit + ' ' + this.name;
  }
}
