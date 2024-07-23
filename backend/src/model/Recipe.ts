import mongoose, { Schema } from "mongoose";
import { IIngredient, ingredientSchema } from "./Ingredients";

export interface IRecipe extends Document {
  title: string;
  author: string;
  content: string[];
  categories?: string[];
  ingredients?: IIngredient[];
  time?: number;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: [String], required: true },
    categories: { type: [String], required: false },
    ingredients: { type: [ingredientSchema], required: false },
    time: { type: Number, required: false },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
