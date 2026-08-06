import { z } from "zod";

const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
});

const updateProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
});

const productResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
});

export {
  createProductSchema,
  updateProductSchema,
  productResponseSchema,
};
