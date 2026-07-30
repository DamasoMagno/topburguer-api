import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import type { OrderService } from "../services/OrderService";

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

export type Order = z.infer<typeof orderSchema>;

export class OrderController {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  async createOrder(request: FastifyRequest, response: FastifyReply) {
    const { userId, products, totalPrice, status } = orderSchema.parse(
      request.body,
    );

    await this.orderService.createOrder({
      userId,
      products,
      totalPrice,
      status,
    });

    return response.status(201).send({ message: "Order created successfully" });
  }

  async getOrderById(request: FastifyRequest, response: FastifyReply) {
    const { id } = request.params as { id: number };

    const order = await this.orderService.getOrderById(id);

    if (!order)
      return response.status(404).send({ message: "Order not found" });
    return response.status(200).send(order);
  }

  async getOrders(request: FastifyRequest, response: FastifyReply) {
    const orders = await this.orderService.getOrders();
    return response.status(200).send(orders);
  }
}
