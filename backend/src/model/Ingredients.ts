import mongoose, { Schema } from "mongoose";

export interface IIngredient extends Document {
  quantity?: number;
  name: string;
  unit?: string;
}

export const ingredientSchema = new Schema({
  quantity: { type: Number, required: false },
  name: { type: String, required: true },
  unit: { type: String, required: false },
});

export const Ingredient = mongoose.model<IIngredient>(
  "Ingredient",
  ingredientSchema
);
