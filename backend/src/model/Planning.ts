import mongoose, { Schema } from "mongoose";
import { plannedRecipeSchema } from "./PlannedRecipe";

export const planningSchema = new Schema(
  {
    planning: { type: [plannedRecipeSchema], required: false },
  },
  { timestamps: true }
);

export const Planning = mongoose.model("Planning", planningSchema);
