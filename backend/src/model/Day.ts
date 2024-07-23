import mongoose, { Schema } from "mongoose";
import { IMeal, mealSchema } from "./Meal";
import { IRecipe, recipeSchema } from "./Recipe";

export interface IDay {
  recipes: [IRecipe];
}

export const daySchema = new Schema(
  {
    recipes: {
      type: [recipeSchema],
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
  },
  { timestamps: false }
);

export const Day = mongoose.model("Day", daySchema);
