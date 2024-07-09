import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { DB_URI } from "./config/config";
import cors from "cors";
import {
  addRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
} from "./controllers/recipeController";
import { addItem, getGroceryList } from "./controllers/groceryListController";
import { bouncer, login, register } from "./controllers/authController";
import { upload } from "./utils/storage";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(DB_URI)
  .then((result) => {
    console.log("connected to Mongo DB");
    app.listen(process.env.PORT || 5000, () =>
      console.log(
        `server listening on port: ${
          process.env.PORT !== undefined ? process.env.PORT : "5000"
        }`
      )
    );
  })
  .catch((err) => console.log(err));

app.post(
  "/upload-image",
  upload.single("image"),
  (req: Request, res: Response) => {
    res.json(req.file);
  }
);

app.get("/test", (req: Request, res: Response) => {
  res.send("test ok");
});

app.post("/auth/register", register);
app.post("/auth/login", login);

app.use(bouncer);

app.get("/grocery-list", getGroceryList);
app.get("/recipe/:id", getRecipeById);
app.get("/recipe", getRecipes);
app.post("/add-recipe", addRecipe);
app.put("/recipe/:id", updateRecipe);
// app.put("/recipeFD/:id", updateRecipeFD);

app.get("/grocery-list", getGroceryList);
app.post("/grocery-list", addItem);
