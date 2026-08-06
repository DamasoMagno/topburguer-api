import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string(),
});

const categoryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const categoryParamsSchema = z.object({
  id: z.number(),
});

const updateCategorySchema = z.object({
  name: z.string(),
});

export {
  createCategorySchema,
  categoryResponseSchema,
  categoryParamsSchema,
  updateCategorySchema,
};
