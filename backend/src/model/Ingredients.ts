import mongoose, { Schema } from "mongoose";

const ingredientSchema = new Schema({
  quantity: { type: Number, required: false },
  name: { type: String, required: true },
  unit: { type: String, required: false },
});

export const Ingredient = mongoose.model("Ingredient", ingredientSchema);
