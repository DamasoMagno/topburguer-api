import { z } from "zod";

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["admin", "user"]),
});

const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "user"]),
});

const userParamsSchema = z.object({
  id: z.number(),
});

const updateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["admin", "user"]),
});

export {
  createUserSchema,
  userResponseSchema,
  userParamsSchema,
  updateUserSchema,
};
