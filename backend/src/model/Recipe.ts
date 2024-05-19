import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    isGood: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
