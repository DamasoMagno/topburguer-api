import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { env } from "../env";
import { defineRelations } from "drizzle-orm";

const relations = defineRelations(schema);

const db = drizzle({
  connection: env.DATABASE_URL,
  relations,
});

export { db, schema, relations };
