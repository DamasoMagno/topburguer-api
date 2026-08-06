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

type CreateCategory = z.infer<typeof createCategorySchema>;
type CategoryResponse = z.infer<typeof categoryResponseSchema>;
type CategoryParams = z.infer<typeof categoryParamsSchema>;
type UpdateCategory = z.infer<typeof updateCategorySchema>;

export {
  createCategorySchema,
  categoryResponseSchema,
  categoryParamsSchema,
  updateCategorySchema,
  type CreateCategory,
  type CategoryResponse,
  type CategoryParams,
  type UpdateCategory,
};
