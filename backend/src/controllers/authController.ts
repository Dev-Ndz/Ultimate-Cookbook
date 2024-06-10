import { Request, Response } from "express";
import { User } from "../model/User";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name)
    return res
      .status(400)
      .send({ error: "Invalid request : missing email, password or name" });

  const isEmailAllReadyExist = await User.findOne({ email: email });
  if (isEmailAllReadyExist) {
    return res.status(400).json({
      status: 400,
      message: "Email all ready in use",
    });
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password:encryptedPassword });
    res.status(200).json({
      message: " User created Successfully",
      user: { name, email },
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message.toString() });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({ message: "missing email or password" });

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "wrong password" });
    }

    const token = JWT.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
      algorithm: "HS512",
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "login success",
      token: token,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message.toString() });
  }
};
