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
  status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]).optional(),
});

const orderParamsSchema = z.object({
  id: z.number(),
});

const updateOrderSchema = z.object({
  status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]),
});

type OrderParams = z.infer<typeof orderParamsSchema>;
type UpdateOrder = z.infer<typeof updateOrderSchema>;
type CreateOrder = z.infer<typeof createOrderSchema>;
type OrderResponse = z.infer<typeof orderResponseSchema>;

export {
  createOrderSchema,
  type CreateOrder,
  orderResponseSchema,
  type OrderResponse,
  orderParamsSchema,
  type OrderParams,
  updateOrderSchema,
  type UpdateOrder,
};
