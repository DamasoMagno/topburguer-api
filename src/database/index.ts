import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { relations } from "./relations";
import { env } from "../env";

const db = drizzle({
  connection: env.DATABASE_URL,
  relations,
});

export { db, schema, relations };