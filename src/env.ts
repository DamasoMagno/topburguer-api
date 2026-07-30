import { z } from "zod";

export const envSchema = z.object({
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_BUCKET_NAME: z.string(),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
});

const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error(envParse.error.message);
  process.exit(1);
}

export const env = envParse.data;
