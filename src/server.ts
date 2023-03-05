import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import expensesRouter from "./expense/routes";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hi from Mabills :) ");
});

app.use("/api/v1/expenses", expensesRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
