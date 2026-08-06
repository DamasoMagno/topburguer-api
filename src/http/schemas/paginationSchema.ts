import { z } from "zod";

const paginationSchema = z.object({
  limit: z.number().positive(),
  offset: z.number().positive(),
});


export { paginationSchema };
