import { GroceryList } from "../model/GroceryList";
import { getGroceryListId } from "./householdController";
import { Request, Response } from "express";

export const getGroceryList = async (req: any, res: Response) => {
  let id = await getGroceryListId(req.user.householdId);
  console.log(req.user);
  console.log(id);
  try {
    let groceryList = await GroceryList.findById(id);
    console.log(groceryList);
    return res.send(groceryList);
  } catch (err) {
    return res.status(500).send(err);
  }
};
