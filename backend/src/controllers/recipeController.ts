import { Request, Response } from "express";
import { Recipe } from "../model/Recipe";

export const getRecipe = async (req: Request, res: Response) => {
    console.log("fetching data...")
    const response = await (Recipe.find())
    console.log(response);
    return res.send(response)
}
