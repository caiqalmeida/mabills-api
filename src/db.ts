import fs from "fs";
import path from "path";

import { Pool, Client } from "pg";

export const connectionConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
};

export const pool = new Pool(connectionConfig);

const client = new Client(connectionConfig);

export const createDatabase = () => {
  const initDbScriptPath = path.join(__dirname, "../create-database.sql");
  const initDbScript = fs.readFileSync(initDbScriptPath).toString();

  client.connect((err) => {
    if (err) {
      console.error("Failed to connect to database:", err);
    } else {
      console.log("Connected to database");
    }
  });

  client.query(initDbScript, (err, res) => {
    if (err) {
      console.error("Failed to create database", err);
    } else {
      console.log("Database created successfully");
    }
  });

  process.on("exit", () => {
    client.end();
  });
};
