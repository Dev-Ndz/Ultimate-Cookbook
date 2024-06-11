import mongoose, { Schema } from "mongoose";

const householdSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    membersId: {
      type: [String],
      required: true,
    },
    groceryListId: {
      type: Schema.Types.ObjectId,
      ref: "GroceryList",
      required: true,
    },
    planningId: {
      type: Schema.Types.ObjectId,
      ref: "Planning",
      required: true,
    },
  },
  { timestamps: true }
);

export const Household = mongoose.model("Household", householdSchema);
