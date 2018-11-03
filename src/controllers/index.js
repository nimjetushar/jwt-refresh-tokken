import { Router } from "express";
import AuthController from "./auth.controller";
import AppController from "./app.controller";

export default () => {
  let api = Router();

  api.use("/auth", AuthController);

  api.use("/data", AppController)

  return api;
};
