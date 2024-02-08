import * as  dbBoard_list from "../data/board_list.data"
import { ErrorResponse } from "../middlewares/Error";
import { Board_list } from "../models/board_list.schema";

export const createBoard_list = async (boardsId:number,{title}:Board_list) => {
  try {

    const createdBoard_list = await dbBoard_list.createBoard_list(title,boardsId);    
    return createdBoard_list;

  } catch (error) {
     throw new ErrorResponse("Error creating a list of boards", 400);
  }
};
