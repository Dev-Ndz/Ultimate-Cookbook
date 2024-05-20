import express, { Express, Request, Response } from "express";
import http from "http";
import mongoose from "mongoose";
import { DB_URI } from "./config/config";
import cors from "cors";
import { getRecipe } from "./controllers/recipeController";
import { Recipe } from "./model/Recipe";

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(DB_URI)
  .then((result) => {
    console.log("connected to Mongo DB");
    app.listen(process.env.PORT || 5000, () => console.log(`server listening`));
  })
  .catch((err) => console.log(err));

// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send({ coucou: "Hello World" }));
app.get("/add-recipe", (req: Request, res: Response) => {
  const recipe = new Recipe({ content: "recipe", isGood: true });
  recipe
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/recipe", getRecipe);
