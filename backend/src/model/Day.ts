import mongoose, { Schema } from "mongoose";
import { IMeal, mealSchema } from "./Meal";

export interface IDay {
  meals: [IMeal];
}

export const daySchema = new Schema(
  {
    meals: {
      type: [mealSchema],
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
