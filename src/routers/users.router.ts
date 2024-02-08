import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation";
import {
  UserData,
  userSchemaRequired
} from "../models/users.schema";
import {
  createAccount,
  loginAccount
} from "../services/users.service";
import { SuccessResponse } from "../utils/Response";
export const authRouter = Router();

authRouter.post(
  "/signup",
  schemaValidation(userSchemaRequired),
  async (req, res, next) => {
    const userData: UserData = req.body;
    console.log("et")
    try {
      const userCreated = await createAccount(userData);
      res.status(200).json(new SuccessResponse(true, userCreated));
    } catch (error) {
      next(error);
    }
  }
);
authRouter.post(
  "/login",
  schemaValidation(userSchemaRequired),
  async (req, res, next) => {
    const userData: UserData = req.body;
    try {
      const token = await loginAccount(userData);
      res.status(200).json(new SuccessResponse(true, { token: token }));
    } catch (error) {
      next(error);
    }
  }
);