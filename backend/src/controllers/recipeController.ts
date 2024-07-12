import { Request, Response } from "express";
import { Recipe } from "../model/Recipe";

export const getRecipes = async (req: Request, res: Response) => {
  const response = await Recipe.find();
  return res.send(response);
};

export const addRecipe = async (req: any, res: Response) => {
  let recipeInfo = req.body;
  recipeInfo.author = req.user.name;
  
  console.log(recipeInfo);
  let recipe = new Recipe(recipeInfo);
  try {
    await recipe.save();
    return res.send("recipe created !");
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Internal server error : " });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let recipe = await Recipe.findById(id);
    res.send(recipe);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Internal server error : " });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  const id = req.params.id;
  const recipe = req.body;
  console.log("update Recipe :", id, recipe);
  try {
    await Recipe.findByIdAndUpdate(id, recipe);
    console.log(recipe);
    res.send({ message: "recipe updated :" + recipe });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Server error : " + err });
  }
};

// export const updateRecipeFD = async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const recipe = req.body;
//   console.log(req.body);
//   console.log("update recipe :", id, recipe);
//   try {
//     res.send({ message: "recipe updated :" + recipe.name });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send({ error: "Server error : " + err });
//   }
// };
