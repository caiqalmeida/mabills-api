import fs from "fs";
import { Request, Response } from "express";
import csvParser from "csv-parser";
import multer from "multer";

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

const addExpenseByFile = async (req: Request, res: Response) => {
  try {
    if (!req.file?.path as any) {
      throw new Error("CSV file not provided");
    }

    const filePath = req.file!.path;

    const stream = await loadCsvData(filePath);

    console.log("stream", stream);

    for await (const row of stream) {
      const { date, category, description, totalValue } = row;
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
    }

    res.send("CSV data loaded successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading CSV data");
  }
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

async function loadCsvData(filePath: string) {
  const stream = fs.createReadStream(filePath).pipe(csvParser());

  return stream;
}

export default {
  getExpenses,
  getExpenseById,
  addExpense,
  addExpenseByFile,
  deleteExpense,
  updateExpense,
};
