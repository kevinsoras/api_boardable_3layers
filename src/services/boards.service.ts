import { Boards, PaginationBoards } from "../models/boards.schema";
import * as  dbBoards from "../data/boards.data"
import {createDefaultBoards_list} from "../data/board_list.data"

import { ErrorResponse } from "../middlewares/Error";

export const getBoards = async (users_id:number,filters:PaginationBoards) => {
  try {

    const listBoards = await dbBoards.getBoards(users_id,filters);    
    return listBoards;

  } catch (error) {
     throw new ErrorResponse("Error getting Boards", 400);

  }
};
export const getBoard = async (users_id:number,boardId:number) => {

  try {
    const findBoard = await dbBoards.getBoard(users_id,boardId);  
    if(!findBoard){
      throw new ErrorResponse("Id not found of boards", 400);
    }     
    return findBoard;

  } catch (error) {
    if(error instanceof ErrorResponse) throw error
     throw new ErrorResponse("Error getting Board", 400);
  }
};
export const createBoard = async (users_id:number,{title,color}: Boards) => {
  try {
    const boardCreated = await dbBoards.createBoard(title,color,users_id);
    if (!boardCreated) {
      throw new ErrorResponse(
        "Cant create correctly a board",
        400
      );
    }
    //If board created corretly,create default board_list
    await createDefaultBoards_list(boardCreated['id'])

    return boardCreated;

  } catch (error) {
    console.log(error)
    throw new ErrorResponse(
      "Cant create correctly a board",
      400
    );
  }
};
export const deleteBoard = async (users_id:number,boardId:number) => {
  try {
    console.log(boardId)
    const deletedBoard = await dbBoards.deleteBoard(users_id,boardId);
    if (!deletedBoard) {
      throw new ErrorResponse("Id not found of list of boards", 400);
    }
    return deletedBoard;
  } catch (error) {
    throw new ErrorResponse("Error deleting a list of boards", 400);
  }
};
