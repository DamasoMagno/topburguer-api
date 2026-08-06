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

type CreateProduct = z.infer<typeof createProductSchema>;
type UpdateProduct = z.infer<typeof updateProductSchema>;
type ProductResponse = z.infer<typeof productResponseSchema>;

export {
  createProductSchema,
  type CreateProduct,
  updateProductSchema,
  type UpdateProduct,
  productResponseSchema,
  type ProductResponse,
};
