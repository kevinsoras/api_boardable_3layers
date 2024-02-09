import { query } from "../db";

export const createBoard_card= async (title:string,boards_listId:number,usersId:number) => {
  const dateNow = new Date();

  const parameters = ["title", "createdAt", "updatedAt","boards_list","users_id","orders"];
  const queryParams: (string | number | Date)[] = [
    title,
    dateNow,
    dateNow,
    boards_listId,//Id for where to get max orders,remember the order ,in this case 4
    usersId
  ];
  let queryT = `
    INSERT INTO board_card (${parameters.join(",")})
    VALUES (
      ${queryParams.map((_, index) => `$${index + 1}`).join(",")},
      (SELECT COALESCE(MAX(orders), 0) + 1 FROM board_card WHERE boards_list = $4 and users_id=$5)
    )
    RETURNING *
  `;
  //console.log(queryT)
  //console.log(queryParams)
  return (await query(queryT, queryParams)).rows[0];
};
export const deleteBoard_card = async(board_list_id:number,usersId:number)=>{
  const queryParams: (string | number | Date)[] = [
    board_list_id,
    usersId
  ];
  let queryT = `
  DELETE FROM board_card
  WHERE id = $1 and users_id=$2 RETURNING  *
  `;
  return (await query(queryT, queryParams)).rows[0];
}