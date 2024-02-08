import { Router } from "express";
import { schemaQueryValidation, schemaValidation } from "../middlewares/schemaValidation";
import { Boards, PaginationBoards, boardsSchema, paginationBoards } from "../models/boards.schema";
import { SuccessResponse } from "../utils/Response";
import { jwtValidation } from "../middlewares/Jwt";
import { createBoard, getBoards } from "../services/boards.service";
export const boardsRouter = Router();

boardsRouter.get(
  "/",
  jwtValidation(),
  schemaQueryValidation(paginationBoards),
  async (req, res, next) => {
    try {
      const {id} = res.locals['userData']
      const filters:PaginationBoards = res.locals["query"];
      const listBoards = await getBoards(id,filters);
      res.status(200).json(new SuccessResponse(true, listBoards));
    } catch (error) {
      next(error);
    }
  }
);

boardsRouter.post(
  "/",
  jwtValidation(),
  schemaValidation(boardsSchema),
  async (req, res, next) => {
    try {
      const {id} = res.locals['userData']
      const boardData:Boards= req.body
      const createdBoard = await createBoard(id,boardData);
      res.status(200).json(new SuccessResponse(true, createdBoard));
    } catch (error) {
      next(error);
    }
  }
);