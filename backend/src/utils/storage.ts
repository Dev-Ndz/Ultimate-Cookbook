import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";
import {
  CLOUD_NAME,
  CLOUDINARY_KEY,
  CLOUDNIARY_SECRET,
} from "../config/config";
import multer, { Multer } from "multer";
import { Request, Response, NextFunction } from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Connection to Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDNIARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

export const upload = multer({ storage: storage });

// app.post("/upload", upload.single("image"), (req:Request, res: Response) => {
//   res.json(req.file);
// });
