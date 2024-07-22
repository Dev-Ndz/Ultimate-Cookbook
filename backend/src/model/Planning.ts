import mongoose, { Schema } from "mongoose";
import { daySchema } from "./Day";

export const planningSchema = new Schema(
  {
    planning: { type: [daySchema], required: true },
  },
  { timestamps: false }
);

export const Planning = mongoose.model("Planning", planningSchema);
