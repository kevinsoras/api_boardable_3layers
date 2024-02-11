import { query } from "../db";
import { PaginationBoards } from "../models/boards.schema";
import { filtering, sorting } from "./utils";

export const createBoard = async (title:string,color:string,users_id:number) => {
  const dateNow = new Date();

  const parameters = ["title", "color", "createdAt", "updatedAt","users_id"];
  const queryParams: (string | number | Date)[] = [
    title,
    color,
    dateNow,
    dateNow,
    users_id
  ];
  let queryT = `
  INSERT INTO 
  boards(${parameters.join(",")}) 
  values(${queryParams.map((_, index) => `$${index + 1}`).join(",")})
  RETURNING id,title,color,createdAt,updatedAt,users_id
  `;

  return (await query(queryT, queryParams)).rows[0];
};
export const getBoards=async(users_id:number,  filters:PaginationBoards)=>{
  let queryT = `
  select id,title,color,createdAt,updatedAt,users_id from boards
  `;
  const queryParams: (string | boolean | number)[] = [];

  queryT = filtering(queryT,{users_id}, queryParams);

  queryT = sorting(queryT, filters["sorty-by"], filters.order);
  
  return (await query(queryT, queryParams)).rows;
}
export const getBoard =async(users_id:number,boardId:number)=>{
  let queryT = `
  select id,title,color,createdAt,updatedAt,users_id from boards 
  `;
  const queryParams: (string | boolean | number)[] = [];

  queryT = filtering(queryT,{users_id,id:boardId}, queryParams);

  
  return (await query(queryT, queryParams)).rows[0];
}