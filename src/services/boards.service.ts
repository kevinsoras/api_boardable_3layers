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