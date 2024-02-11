import * as dbBoard_list from "../data/board_list.data";
import { ErrorResponse } from "../middlewares/Error";
import { BoardListWithCard, Board_list } from "../models/board_list.schema";

export const createBoard_list = async (
  boardsId: number,
  { title }: Board_list
) => {
  try {
    const createdBoard_list = await dbBoard_list.createBoard_list(
      title,
      boardsId
    );
    return createdBoard_list;
  } catch (error) {
    throw new ErrorResponse("Error creating a list of boards", 400);
  }
};

export const deleteBoard_list = async (board_listId: number) => {
  try {
    const deletedBoard_list = await dbBoard_list.deleteBoard_list(board_listId);
    if (!deletedBoard_list) {
      throw new ErrorResponse("Id not found of list of boards", 400);
    }
    return deletedBoard_list;
  } catch (error) {
    throw new ErrorResponse("Error deleting a list of boards", 400);
  }
};
export const updateBoard_list = async (
  board_listId: number,
  { title }: Board_list
) => {
  try {
    const updatedBoard_list = await dbBoard_list.updateBoard_list(
      board_listId,
      title
    );
    if (!updatedBoard_list) {
      throw new ErrorResponse(
        "Id not found in list of boards or error find id",
        400
      );
    }
    return updatedBoard_list;
  } catch (error) {
    console.log(error);
    if (error instanceof ErrorResponse) throw error;

    throw new ErrorResponse("Error updating a list of boards", 400);
  }
};
export const getBoard_listWithCards = async (
  users_id: number,
  boardId: number
) => {
  try {
    const boardListWithCards: BoardListWithCard[] =
      await dbBoard_list.getBoard_listWithCards(users_id, boardId);

    //Puede existir lista vacias
    //if(!updatedBoard_list){
    //  throw new ErrorResponse("Id not found in list of boards or error find id", 400);
    //}
    return formatBoardListWithCards(boardListWithCards);
  } catch (error) {
    console.log(error);
    if (error instanceof ErrorResponse) throw error;

    throw new ErrorResponse("Error updating a list of boards", 400);
  }
};
function formatBoardListWithCards(boardData: BoardListWithCard[]) {
  const boardListsWithCards: any = {};
  boardData.forEach((data) => {
    const {
      idboardlist,
      titleboardlist,
      idboardcard,
      titleboardcard,
      ordersboardcard,
    } = data;

    // Si la lista no existe , créala
    if (!boardListsWithCards[idboardlist]) {
      boardListsWithCards[idboardlist] = {
        id: idboardlist,
        title: titleboardlist,
        cards: [],
      };
    }
    if (idboardcard) {
      // Solo agrega si existe el id
      boardListsWithCards[idboardlist].cards.push({
        id: idboardcard,
        title: titleboardcard,
        orders: ordersboardcard,
      });
    }
  });

  // Convertir el objeto en un array ,se hizo asi por temas de performance
  const boardListsArray = Object.values(boardListsWithCards);
  return boardListsArray;
}
