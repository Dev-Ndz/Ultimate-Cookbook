import { ingredient } from './ingredient.interface';
import { IngredientModel } from './ingredient.model';
import { Recipe } from './recipe';

export class RecipeModel implements Recipe {
  _id: string;
  title: string;
  author: string;
  content: string[];
  categories?: string[];
  ingredients: ingredient[];
  time?: number;
  image?: string;
  createdAt: string;
  updatedAt: string;

  constructor(
    _id: string,
    title: string,
    author: string,
    content: string[],
    ingredients: IngredientModel[],
    createdAt: string,
    updatedAt: string,
    categories?: string[],
    time?: number,
    image?: string
  ) {
    this._id = _id;
    this.title = title;
    this.author = author;
    this.content = content;
    this.ingredients = ingredients
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.categories = categories;
    this.time = time;
    this.image = image;
  }
}