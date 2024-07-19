import mongoose, { Schema } from "mongoose";
import { IIngredient, ingredientSchema } from "./Ingredients";

export interface IGroceryList {
  _id: string;
  ingredients: [IIngredient];
}

export const groceryListSchema = new Schema(
  {
    ingredients: { type: [ingredientSchema], required: false },
  },
  { timestamps: true }
);

export const GroceryList = mongoose.model<IGroceryList>(
  "GroceryList",
  groceryListSchema
);
