import { ingredient } from './ingredient.interface';
import { IngredientModel } from './ingredient.model';
import { Recipe } from './recipe';

export class RecipeModel implements Recipe {
  _id?: string;
  title: string;
  author?: string;
  content: string[];
  categories?: string[];
  ingredients?: ingredient[];
  time?: number;
  image?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(recipe: Recipe) {
    this._id = recipe._id;
    this.title = recipe.title;
    this.author = recipe.author;
    this.content = recipe.content;
    if (recipe.ingredients) {
      this.ingredients = recipe.ingredients.map(
        (ingredient: ingredient) =>
          new IngredientModel(
            ingredient.quantity,
            ingredient.name,
            ingredient.unit
          )
      );
    }
    this.createdAt = recipe.createdAt;
    this.updatedAt = recipe.updatedAt;
    this.categories = recipe.categories;
    this.time = recipe.time;
    this.image = recipe.image;
  }
}
