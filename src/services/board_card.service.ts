import * as  dbBoard_card from "../data/board_card.data"
import { ErrorResponse } from "../middlewares/Error";
import { Board_card } from "../models/board_card.schema";

export const createBoard_card= async (users_id:number,boardsId:number,{title}:Board_card) => {
  try {

    const createdBoard_card = await dbBoard_card.createBoard_card(title,boardsId,users_id);  
    if(!createdBoard_card){
      throw new ErrorResponse("Error in one id creating a board card", 400);

    }  
    return createdBoard_card;
  } catch (error) {
    if(error instanceof ErrorResponse) throw error
    throw new ErrorResponse("Error creating a board card", 400);
  }
};
