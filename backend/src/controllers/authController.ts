import { Request, Response, NextFunction } from "express";
import { User } from "../model/User";
import bcrypt from "bcrypt";
import JWT, { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { GroceryList } from "../model/GroceryList";
import { Planning } from "../model/Planning";
import { Household } from "../model/Household";
import { AuthRequest } from "../model/types";

export const register = async (req: Request, res: Response) => {
  let newUser;
  const { name, email, password } = req.body;
  if (!email || !password || !name)
    return res.status(400).json({ message: "missing email, password or name" });

  const isEmailAllReadyExist = await User.findOne({ email: email });
  if (isEmailAllReadyExist) {
    return res.status(400).json({
      message: "Email all ready in use",
    });
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
    });
  } catch (error: any) {
    console.log("fail to create user", error);
    return res.status(500).json({ message: error.message.toString() });
  }

  try {
    let newGroceryList: any = await GroceryList.create({ ingredients: [] });
    let newPlanning: any = await Planning.create({ days: [] });
    let newHousehold = await Household.create({
      name: newUser.name + "'s household",
      membersId: [newUser!._id],
      groceryListId: newGroceryList._id,
      planningId: newPlanning!._id,
    });
    newUser.householdId = newHousehold._id;
    await newUser.save();

    return res.status(200).json({
      message: newUser.name + ", Your account is successfully created",
    });
  } catch (error: any) {
    console.log("fail to create household", error);
    return res.status(500).json({ message: error.message.toString() });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({ message: "missing email or password" });

  try {
    const user = await User.findOne({ email: email });
    console.log("REQUESTION FROM:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "wrong password" });
    }
    console.log(user);
    const token = JWT.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        householdId: user.householdId,
      },
      JWT_SECRET,
      {
        algorithm: "HS512",
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "login success",
      token: token,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message.toString() });
  }
};

export const bouncer = async (req: any, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return res.status(401).send("Unauthorized");

  try {
    let decoded = verify(req.headers.authorization.split(" ")[1], JWT_SECRET);

    if (decoded !== undefined) {
      req.user = decoded;
      return next();
    }
  } catch (err) {
    console.log(err);
  }

  return res.status(403).send("Invalid token");
};
