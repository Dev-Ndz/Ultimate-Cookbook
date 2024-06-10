import { Request, Response } from "express";
import { Recipe } from "../model/Recipe";

export const getRecipes = async (req: Request, res: Response) => {
  console.log("fetching data...");
  const response = await Recipe.find();
  console.log(response);
  return res.send(response);
};

export const addRecipe = async (req: Request, res: Response) => {
  const recipe = new Recipe(req.body);
  try {
    await recipe.save();
    return res.send("recipe created !");
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Internal server error : " });
  }
};
