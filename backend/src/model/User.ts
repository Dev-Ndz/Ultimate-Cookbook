import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    householdId: {
      type: Schema.Types.ObjectId,
      ref: "Household",
      required: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("Users", UserSchema);
