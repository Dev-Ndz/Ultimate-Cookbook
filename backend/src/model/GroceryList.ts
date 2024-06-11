import mongoose, { Schema } from "mongoose";
import { ingredientSchema } from "./Ingredients";

export const groceryListSchema = new Schema(
  {
    ingredients: { type: [ingredientSchema], required: false },
  },
  { timestamps: true }
);

export const GroceryList = mongoose.model("GroceryList", groceryListSchema);
