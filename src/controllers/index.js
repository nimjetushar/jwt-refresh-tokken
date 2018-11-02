import { Router } from "express";
import AuthController from "./auth.controller";

import { version } from "../../package.json";

export default () => {
  let api = Router();

  // mount the facets resource
  api.use("/auth", AuthController);

  return api;
};
