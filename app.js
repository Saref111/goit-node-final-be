import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRouter from "./routes/usersRouter.js";
import "./config/passport-config.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import areasRouter from "./routes/areasRouter.js";
import ingredientsRouter from "./routes/ingredientsRouter.js";
import recipesRouter from "./routes/recipesRouter.js";
import testimonialsRouter from "./routes/testimonialsRouter.js";

dotenv.config();

const uri = process.env.DB_HOST;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/areas", areasRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/testimonials", testimonialsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const main = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    return;
  }

  app.listen(3000, () => {
    console.log("Server started");
  });
};

main();
