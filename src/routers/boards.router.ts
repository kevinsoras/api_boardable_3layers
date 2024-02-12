import { Router } from "express";
import { schemaQueryValidation, schemaValidation } from "../middlewares/schemaValidation";
import { Boards, PaginationBoards, boardsSchema, paginationBoards } from "../models/boards.schema";
import { SuccessResponse } from "../utils/Response";
import { jwtValidation } from "../middlewares/Jwt";
import { createBoard, deleteBoard, getBoard, getBoards } from "../services/boards.service";
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
boardsRouter.get(
  "/:boardId",
  jwtValidation(),
  async (req, res, next) => {
    try {
      const {id} = res.locals['userData']
      const boardId = Number(req.params['boardId']);
      const findBoard = await getBoard(id,boardId);
      res.status(200).json(new SuccessResponse(true, findBoard));
    } catch (error) {
      console.log(error)
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
boardsRouter.delete(
  "/:id",
  jwtValidation(),
  async (req, res, next) => {
    try {
      const {id} = res.locals['userData']
      const boardId = Number(req.params['id']);
      const deletedBoard = await deleteBoard(id,boardId);
      res.status(200).json(new SuccessResponse(true, deletedBoard));
    } catch (error) {
      next(error);
    }
  }
);