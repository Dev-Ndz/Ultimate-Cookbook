import dotenv from "dotenv";

dotenv.config();

export const DB_URI = String(process.env.DB_URI)

