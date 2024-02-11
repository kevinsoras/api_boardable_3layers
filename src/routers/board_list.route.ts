import { Router } from "express";
import { jwtValidation } from "../middlewares/Jwt";
import { schemaValidation } from "../middlewares/schemaValidation";
import { Board_list, board_listSchema } from "../models/board_list.schema";
import { createBoard_list, deleteBoard_list, getBoard_listWithCards, updateBoard_list } from "../services/board_list.service";
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
board_listRouter.delete(
  "/boards/:id",
  jwtValidation(),
  async (req, res, next) => {
    try {
      const board_listId = Number(req.params['id'] || '0')
      const deletedBoard_list = await deleteBoard_list(board_listId);
      res.status(200).json(new SuccessResponse(true, deletedBoard_list));
    } catch (error) {
      next(error);
    }
  }
);
board_listRouter.put(
  "/boards/:id",
  jwtValidation(),
  async (req, res, next) => {
    try {
      const board_listId = Number(req.params['id'] || '0')
      const data:Board_list= req.body
      const updatedBoard_list = await updateBoard_list(board_listId,data);
      res.status(200).json(new SuccessResponse(true, updatedBoard_list));
    } catch (error) {
      next(error);
    }
  }
);
board_listRouter.get(
  "/boards/:boardId/board_list",
  jwtValidation(),
  async (req, res, next) => {
    try {
      const {id} = res.locals['userData']
      const boardId = Number(req.params['boardId'] || '0')
      const boardListWithCards = await getBoard_listWithCards(id,boardId);
      res.status(200).json(new SuccessResponse(true, boardListWithCards));
    } catch (error) {
      next(error);
    }
  }
);