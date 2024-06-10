import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: [String], required: true },
    categories: { type: [String], required: false },
    ingredients: { type: [String], required: false },
    time: { type: Number, required: false },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
