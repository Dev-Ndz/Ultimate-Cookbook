import { GroceryList } from "../model/GroceryList";
import { getGroceryListId } from "./householdController";
import { Request, Response } from "express";

export const getGroceryList = async (req: any, res: Response) => {
  console.log("coucou");

  return res.send({ message: "coucou" });

  //   let id = await getGroceryListId(req.user.householdId);
  //   try {
  //     let groceryList = await GroceryList.findById(id);
  //     console.log(groceryList);
  //     return res.send(groceryList);
  //   } catch (err) {
  //     return res.status(500).send(err);
  //   }
};

export const addItem = async (req: any, res: Response) => {

    let id = await getGroceryListId(req.user.householdId);
    let { ingredient } = req.body;

    try {
      const groceryList = await GroceryList.findOneAndUpdate(
        { _id: id },
        { $push: { ingredients: ingredient } },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Ingredient added to grocery list", groceryList });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to add ingredient to grocery list" });
    }
};
