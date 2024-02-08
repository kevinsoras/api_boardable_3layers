import { UserData } from "../models/users.schema";
import * as dbUser from "../data/users.data";
import { ErrorResponse } from "../middlewares/Error";
import bycript from "bcrypt";
import "dotenv/config";
import { Jwt } from "../middlewares/Jwt";

export const createAccount = async (userdata: UserData) => {
  try {
    userdata.password = await bycript.hash(
      userdata.password,
      Number(process.env["BYCRIPT-SALT"]) ?? ""
    );
  } catch (error) {
    throw new ErrorResponse("Error generating hash of password", 400);
  }
  const userCreated = await dbUser.createAccount(userdata);
  if (!userCreated) {
    throw new ErrorResponse(
      "Information is missing or the format is incorrect.",
      400
    );
  }
  //Its created correctly
  const jwt = new Jwt(process.env["JWT-KEY"] ?? "");

  const token = jwt.generateToken({
    id: userCreated["id"],
    role: userCreated["role"],
  });

  return {userCreated,token};
};

export const loginAccount = async (data: UserData) => {
  try {
    const dataUser = await dbUser.loginAccount(data.username);
    const matchPassword = await bycript.compare(
      data.password,
      dataUser["password"]
    );
    if (!matchPassword) throw new ErrorResponse("Error password", 400);
    
    const jwt = new Jwt(process.env["JWT-KEY"] ?? "");
    const token = jwt.generateToken({
      id: dataUser["id"],
      role: dataUser["role"],
    });
    return token;
  } catch (error) {
    throw new ErrorResponse("Credencials Incorrect", 401);
  }
};