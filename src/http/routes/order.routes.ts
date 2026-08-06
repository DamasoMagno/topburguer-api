import type { FastifyInstance } from "fastify";
import type { OrderController } from "../controllers/OrderController";

export const orderRoutes =
  (orderController: OrderController) => (server: FastifyInstance) => {
    server.post("/", orderController.createOrder.bind(orderController));
    server.get("/", orderController.getOrders.bind(orderController));
    server.get("/:id", orderController.getOrderById.bind(orderController));
  };
