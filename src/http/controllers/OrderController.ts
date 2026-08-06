import type { FastifyRequest, FastifyReply } from "fastify";
import type { OrderService } from "../../application/use-cases/order/order.service";
import { createOrderSchema } from "../schemas/orderSchema";

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  async createOrder(request: FastifyRequest, response: FastifyReply) {
    const { userId, products, totalPrice, status } = createOrderSchema.parse(
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

    if (!order) {
      return response.status(404).send({ message: "Order not found" });
    }

    return response.status(200).send(order);
  }

  async getOrders(_request: FastifyRequest, response: FastifyReply) {
    const orders = await this.orderService.getOrders();
    return response.status(200).send(orders);
  }
}
