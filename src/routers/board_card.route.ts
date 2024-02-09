import { Router } from "express";
import { jwtValidation } from "../middlewares/Jwt";
import { schemaValidation } from "../middlewares/schemaValidation";
import { Board_card, board_cardSchema } from "../models/board_card.schema";
import { createBoard_card } from "../services/board_card.service";
import { SuccessResponse } from "../utils/Response";
export const board_cardRouter = Router();

board_cardRouter.post(
  "/board_list/:id",
  jwtValidation(),
  schemaValidation(board_cardSchema),
  async (req, res, next) => {
    try {
      const board_listId = Number(req.params['id'] || '0')
      const {id} = res.locals['userData']
      const data:Board_card= req.body
      const createdBoard_card = await createBoard_card(id,board_listId,data);
      res.status(200).json(new SuccessResponse(true, createdBoard_card));
    } catch (error) {
      next(error);
    }
  }
);