import mongoose, { Schema } from "mongoose";
import { recipeSchema } from "./Recipe";

export const daySchema = new Schema(
  {
    meals: { type: [recipeSchema], required: false },
  },
  { timestamps: false }
);

export const Day = mongoose.model("PlannedRecipe", daySchema);
