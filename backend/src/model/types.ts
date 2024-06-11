import { Schema } from "mongoose";

export interface AuthRequest extends Request {
  user?: User;
}

export interface User {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  householdId: Schema.Types.ObjectId;
}
