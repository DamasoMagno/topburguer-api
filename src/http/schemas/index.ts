import { z } from "zod";

const categorySchema = z.object({
  name: z.string(),
});

type Category = z.infer<typeof categorySchema>;

export { categorySchema, type Category };

const orderSchema = z.object({
  userId: z.number(),
  products: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number(),
    }),
  ),
  totalPrice: z.number(),
  status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]),
});

type Order = z.infer<typeof orderSchema>;

export { orderSchema, type Order };