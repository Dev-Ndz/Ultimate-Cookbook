import dotenv from "dotenv";

dotenv.config();

export const DB_URI = String(process.env.DB_URI);
export const JWT_SECRET = String(process.env.JWT_SECRET);
export const CLOUD_NAME = String(process.env.CLOUD_NAME);
export const CLOUDINARY_KEY = String(process.env.CLOUDINARY_KEY);
export const CLOUDNIARY_SECRET = String(process.env.CLOUDNIARY_SECRET);
