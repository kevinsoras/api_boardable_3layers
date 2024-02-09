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

export const createDefaultBoards_list = async(boards_id:number)=>{
  const dateNow = new Date();
  const queryParams: (string | number | Date)[] = [
    dateNow,
    boards_id
  ];
  let queryT = `
  INSERT INTO 
  board_list(title,createdAt,updatedAt,boards_id) 
  values 
  ('To Do',$1,$1,$2),
  ('Doing',$1,$1,$2),
  ('Done',$1,$1,$2)
  `;
  return (await query(queryT, queryParams)).rows;
}
export const deleteBoard_list = async(board_list_id:number)=>{
  const queryParams: (string | number | Date)[] = [
    board_list_id
  ];
  let queryT = `
  DELETE FROM board_list
  WHERE id = $1 RETURNING  *
  `;
  return (await query(queryT, queryParams)).rows;
}