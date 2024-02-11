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
  return (await query(queryT, queryParams)).rows[0];
}
export const updateBoard_list = async(board_list_id:number,title:string)=>{
  const dateNow = new Date();

  const queryParams: (string | number | Date)[] = [];
  let queryT = `UPDATE board_list SET `;
  //Parameters
  Object.entries({title,updatedAt:dateNow}).forEach(([key,value])=>{
    if(value !==null && value !== undefined){
      if(queryParams.length>0) queryT+=","
      queryParams.push(value)
      queryT+=` ${key} = $${queryParams.length}`
    }
  })
  //Condition
  queryParams.push(board_list_id)
  queryT+=` WHERE id=$${queryParams.length} RETURNING *`
  console.log(queryT)
  console.log(queryParams)
  return (await query(queryT, queryParams)).rows[0];
}
export const getBoard_listWithCards=async(users_id:number,  boardId:number):Promise<any[]>=>{
  let queryT = `
  SELECT bl.id as idBoardList,bl.title titleBoardList,bc.id idBoardCard,
  bc.title titleBoardCard,bc.orders ordersBoardCard 
  FROM board_list bl 
  LEFT JOIN boards b ON b.users_id=$1
  LEFT JOIN board_card bc ON bc.boards_list=bl.id
  WHERE bl.boards_id=$2
  AND b.id=$2
  ORDER BY bc.orders
  `;
  const queryParams: (string | boolean | number)[] = [users_id,boardId];
  
  return (await query(queryT, queryParams)).rows;
}