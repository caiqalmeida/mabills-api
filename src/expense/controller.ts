import { Request, Response } from "express";

import { pool } from "../db";
import queries from "./queries";

const getExpenses = (req: Request, res: Response) => {
  pool.query(queries.getExpenses, (error, results) => {
    if (error) throw error;

    res.status(200).json(results.rows);
  });
};

const getExpenseById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getExpenseById, [id], (error, results) => {
    if (error) throw error;

    res.status(200).json(results.rows);
  });
};

const addExpense = (req: Request, res: Response) => {
  const { date, category, description, totalValue } = req.body;
  console.log("req.body", req.body);

  pool.query(
    queries.addExpense,
    [date, category, description, totalValue],
    (error, results) => {
      if (error) {
        console.log("error", error);
      }

      res.status(201).send("Expense created Successfully !");
    }
  );
};

const deleteExpense = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getExpenseById, [id], (error, results) => {
    if (error) throw error;

    const noExpenseFound = !results.rows.length;

    if (noExpenseFound) {
      return res.send("Expense does not exist");
    }

    pool.query(queries.deleteExpense, [id], (error, results) => {
      if (error) throw error;

      return res.status(204).send("Expense deleted");
    });
  });
};

const updateExpense = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { date, category, description, totalValue } = req.body;

  pool.query(queries.getExpenseById, [id], (error, results) => {
    if (error) throw error;

    const noExpenseFound = !results.rows.length;

    if (noExpenseFound) {
      return res.send("Expense does not exist");
    }

    pool.query(
      queries.updateExpense,
      [date, category, description, totalValue, id],
      (error, results) => {
        if (error) throw error;

        return res.status(204).send("Expense updated");
      }
    );
  });
};

export default {
  getExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
  updateExpense,
};
