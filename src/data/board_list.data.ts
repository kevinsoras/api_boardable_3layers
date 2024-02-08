import { query } from "../db";

export const createBoard_list = async (title:string,boards_id:number) => {
  const dateNow = new Date();

  const parameters = ["title", "createdAt", "updatedAt","boards_id"];
  const queryParams: (string | number | Date)[] = [
    title,
    dateNow,
    dateNow,
    boards_id
  ];
  let queryT = `
  INSERT INTO 
  board_list(${parameters.join(",")}) 
  values(${queryParams.map((_, index) => `$${index + 1}`).join(",")})
  RETURNING id,title,createdAt,updatedAt,boards_id
  `;

  return (await query(queryT, queryParams)).rows[0];
};
