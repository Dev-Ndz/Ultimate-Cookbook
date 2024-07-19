import { GroceryList, IGroceryList } from "../model/GroceryList";
import { IIngredient } from "../model/Ingredients";
import { getGroceryListId } from "./householdController";
import { Request, Response } from "express";

export const getGroceryList = async (req: any, res: Response) => {
  let id = await getGroceryListId(req.user.householdId);
  try {
    let groceryList = await GroceryList.findById(id);
    return res.send(groceryList);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const addItems = async (req: any, res: Response) => {
  let newIngredients: IIngredient[] = req.body;
  let id = await getGroceryListId(req.user.householdId);
  let groceryList: IGroceryList;
  let response = await GroceryList.findById(id);
  if (!response) {
    return res.status(500).json({ error: "could not find grocery list" });
  } else {
    groceryList = response;
  }
  let updatedList = updateList(groceryList, newIngredients);
  try {
    const updatedGroceryList = await GroceryList.findOneAndReplace(
      { _id: id },
      { ingredients: updatedList },
      { new: true }
    );
    return res.status(200).json({
      message: "Ingredient added to grocery list",
      updatedGroceryList,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to add ingredient to grocery list" });
  }
};

export const updateGroceryList = async (req: any, res: Response) => {
  let groceryList: IGroceryList = req.body;
  try {
    const updatedGroceryList = await GroceryList.findOneAndReplace(
      { _id: groceryList._id },
      { ingredients: groceryList.ingredients },
      { new: true }
    );
    return res.status(200).json({
      message: "Grocery list updated",
      updatedGroceryList,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to add ingredient to grocery list" });
  }
};

const updateList = (
  groceryList: IGroceryList,
  newIngredients: IIngredient[]
): IIngredient[] => {
  let updatedList = groceryList.ingredients;
  for (let newIngredient of newIngredients) {
    let found = false;
    if (updatedList.length < 1) {
      updatedList.push(newIngredient);
    } else {
      for (let ingredient of updatedList) {
        if (
          ingredient.name == newIngredient.name &&
          ingredient.unit == newIngredient.unit
        ) {
          ingredient.quantity = ingredient.quantity || 0;
          newIngredient.quantity = newIngredient.quantity || 0;
          ingredient.quantity += newIngredient.quantity;
          found = true;
          break;
        }
      }
    }
    if (!found) {
      updatedList.push(newIngredient);
    }
  }
  return updatedList;
};
