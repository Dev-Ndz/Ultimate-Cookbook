import { Request, Response } from "express";
import { Recipe } from "../model/Recipe";

export const getRecipe = async (req: Request, res: Response) => {
    const response = await (Recipe.find())
    return res.send(response)
}
