import { Schema } from "mongoose";
import { Household } from "../model/Household";

export const getGroceryListId = async (householdId: Schema.Types.ObjectId) => {
  let household = await Household.findById(householdId);
  return household?.groceryListId;
};

export const getPlanningId = async (householdId: Schema.Types.ObjectId) => {
  let household = await Household.findById(householdId);
  return household?.planningId;
};
