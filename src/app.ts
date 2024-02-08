import express from "express";
import "dotenv/config";
import cors from "cors";
import { authRouter } from "./routers/users.router";
import errorHandler from "./middlewares/Error";
import { boardsRouter } from "./routers/boards.router";
import { board_listRouter } from "./routers/board_list.route";
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env["PORT_API"] || 3000;
//Users
app.use(authRouter)
//Boards
app.use(boardsRouter)
//Boards_list
app.use(board_listRouter)

app.use(errorHandler)
app.listen(port, () => {
  console.log(`Inicio en el puerto ${port}`);
});
