import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";

const UserRoutes = require("./core/entities/user/routes/routes");
const UserPrivateRoutes = require("./core/entities/user/routes/private.routes");

const AdRoutes = require("./core/entities/ad/routes/routes");
const AdPrivateRoutes = require("./core/entities/ad/routes/private.routes");
dotenv.config();

mongoose.connect(`${process.env.DB_CONNECT}`).then(() => {
  console.log("Connected to MongoDB!");
});

const PORT = process.env.PORT || 9000;

export const get = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("./uploads"));
  app.set("view engine", "ejs");

  app.use("/user", UserRoutes);
  app.use("/user", UserPrivateRoutes);

  app.use("/ad", AdRoutes);
  app.use("/ad", AdPrivateRoutes);
  // const httpServer = http.createServer(app).listen(PORT);
  return app;
};
