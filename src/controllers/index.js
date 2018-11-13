import { Router } from "express";
import AuthController from "./auth.controller";
import AppController from "./app.controller";
import ResetPasswordController from "./resetPassword.controller";

export default () => {
  let api = Router();

  api.use("/auth", AuthController);

  api.use("/data", AppController);

  api.use("/reset", ResetPasswordController);

  return api;
};
