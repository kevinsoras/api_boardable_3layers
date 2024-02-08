import { query } from "../db";
import { UserData } from "../models/users.schema";

export const createAccount = async (user: UserData) => {
  
  const dateNow = new Date();

  const parameters = ["username", "password", "createdAt", "updatedAt"];
  const values: (string | number | Date)[] = [
    user.username,
    user.password,
    dateNow,
    dateNow,
  ];
 
  //Se construye el query
  let queryT = `
  INSERT INTO 
  users(${parameters.join(",")}) 
  values(${values.map((_, index) => `$${index + 1}`).join(",")})
  RETURNING id,username,email,name,createdAt,updatedAt
  `;

  return (await query(queryT, values)).rows[0];
};

export const loginAccount = async (username: string) => {
  let queryT = `SELECT id,username,password,role FROM users where username=$1`;
  const result = await query(queryT, [username]);
  return result.rows[0];
};