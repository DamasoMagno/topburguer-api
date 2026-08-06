import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { relations } from "./relations";
import { env } from "../config/env";

const db = drizzle({
  connection: env.DATABASE_URL,
  relations,
});

export { db, schema, relations };
export type Database = typeof db;
