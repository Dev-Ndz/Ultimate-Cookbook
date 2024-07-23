import mongoose, { Schema } from "mongoose";
import { daySchema, IDay } from "./Day";

export interface IPlanning {
  _id: string;
  days: [IDay];
}

export const planningSchema = new Schema(
  {
    days: { type: [daySchema], required: true },
  },
  { timestamps: false }
);

export const Planning = mongoose.model("Planning", planningSchema);
