import mongoose, { Schema } from "mongoose";

export const plannedRecipeSchema = new Schema(
  {
    recipeId: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
    plannedDate: { type: String, required: true },
    meal: { type: String, required: true },
  },
  { timestamps: true }
);

export const PlannedRecipe = mongoose.model(
  "PlannedRecipe",
  plannedRecipeSchema
);
