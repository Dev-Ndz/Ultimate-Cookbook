import { Ingredient } from './ingredient.interface';

export interface GroceryList {
  _id: string;
  ingredients?: Ingredient[];
}
