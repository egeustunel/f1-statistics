import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: parseInt(process.env.PGPORT || "5432", 10),
});

async function connectClient() {
  await client.connect();
  // Set the search_path to your desired schema
  await client.query("SET search_path TO f1, public");
}

connectClient().catch((err) => console.error("Connection error", err.stack));

export const query = (text: string, params?: any[]) => {
  try {
    return client.query(text, params);
  } catch (e) {
    console.log(e);
  }
};
