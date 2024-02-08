import { Router } from "express";
import { jwtValidation } from "../middlewares/Jwt";
import { schemaValidation } from "../middlewares/schemaValidation";
import { Board_list, board_listSchema } from "../models/board_list.schema";
import { createBoard_list } from "../services/board_list.service";
import { SuccessResponse } from "../utils/Response";
export const board_listRouter = Router();

board_listRouter.post(
  "/boards/:id",
  jwtValidation(),
  schemaValidation(board_listSchema),
  async (req, res, next) => {
    try {
      const boardsId = Number(req.params['id'] || '0')
      const data:Board_list= req.body
      const createdBoard_list = await createBoard_list(boardsId,data);
      res.status(200).json(new SuccessResponse(true, createdBoard_list));
    } catch (error) {
      next(error);
    }
  }
);