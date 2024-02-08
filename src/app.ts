import express from "express";
import "dotenv/config";
import cors from "cors";
import { authRouter } from "./routers/users.router";
import errorHandler from "./middlewares/Error";
import { boardsRouter } from "./routers/boards.router";
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env["PORT_API"] || 3000;
//Users
app.use(authRouter)
//Boards
app.use(boardsRouter)
app.use(errorHandler)
app.listen(port, () => {
  console.log(`Inicio en el puerto ${port}`);
});
