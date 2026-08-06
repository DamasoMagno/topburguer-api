import { z } from "zod";

const paginationSchema = z.object({
  limit: z.number().positive(),
  offset: z.number().positive(),
});

type Pagination = z.infer<typeof paginationSchema>;

export { paginationSchema, type Pagination };
