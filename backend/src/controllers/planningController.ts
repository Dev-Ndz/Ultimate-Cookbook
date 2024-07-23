import { Request, Response } from "express";
import { getPlanningId } from "./householdController";
import { IPlanning, Planning } from "../model/Planning";

export const getPlanning = async (req: any, res: Response) => {
  let id = await getPlanningId(req.user.householdId);
  try {
    let planning = await Planning.findById(id);

    return res.send(planning);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const updatePlanning = async (req: any, res: Response) => {
  let planning: IPlanning = req.body;
  console.log(planning);
  try {
    const updatedPlanning = await Planning.findOneAndReplace(
      { _id: planning._id },
      { days: planning.days },
      { new: true }
    );
    return res.send({
      message: "Planning updated",
      updatedPlanning,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to add ingredient to grocery list" });
  }
};
