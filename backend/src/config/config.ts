import dotenv from "dotenv";

dotenv.config();

export const DB_URI = String(process.env.DB_URI);
export const JWT_SECRET = String (process.env.JWT_SECRET);

