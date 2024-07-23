import mongoose, { Schema } from "mongoose";

export interface IMeal {
  recipeId: string;
  recipeTitle: string;
}

export const mealSchema = new Schema(
  {
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    recipeTitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

export const Meal = mongoose.model("Meal", mealSchema);
