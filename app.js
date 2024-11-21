require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const cors = require("cors");

const authRouter = require("./route/authRoute");
const projectRouter = require("./route/projectRoute");
const userRouter = require("./route/userRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const simulation = require("./db/models/simulation");

const app = express();

app.use(express.json());
app.use(cors());

// all routes will be here
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/users", userRouter);

app.get("/simulation", async (req, res) => {
  const simulations = await simulation.findAll();
  //console.log(simulations[0].dataValues.id);
  if (Array.isArray(simulations)) {
    res.status(200).json({
      data: "Foi",
    });
  } else {
    res.status(404).json({
      error: "Simulations not found!",
    });
  }
});

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
  console.log("Server up and running", PORT);
});
