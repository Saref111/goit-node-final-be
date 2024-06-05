import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRouter from "./routes/usersRouter.js";
import "./config/passport-config.js";
<<<<<<< HEAD
import recipesRouter from "./routes/recipesRouter.js";
=======
>>>>>>> 5f01658 (added recipes service)

dotenv.config();

const uri = process.env.DB_HOST;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/recipes", recipesRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
