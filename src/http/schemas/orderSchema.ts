import { z } from "zod";

const createOrderSchema = z.object({
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

const orderResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  totalPrice: z.number(),
  status: z
    .enum(["pending", "confirmed", "shipped", "delivered", "cancelled"])
    .optional(),
});

const orderParamsSchema = z.object({
  id: z.number(),
});

const updateOrderSchema = z.object({
  status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]),
});

export {
  createOrderSchema,
  orderResponseSchema,
  orderParamsSchema,
  updateOrderSchema,
};
