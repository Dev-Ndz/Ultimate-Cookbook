import { GroceryList } from './groceryList.interface';
import { Ingredient } from './ingredient.interface';
import { IngredientModel } from './ingredient.model';

export class GroceryListModel implements GroceryList {
  _id: string;
  ingredients?: Ingredient[];

  constructor(groceryList: GroceryList) {
    this._id = groceryList._id;
    if (groceryList.ingredients) {
      this.ingredients = groceryList.ingredients.map(
        (ingredient: Ingredient) =>
          new IngredientModel(
            ingredient.quantity,
            ingredient.name,
            ingredient.unit
          )
      );
    }
  }
}
