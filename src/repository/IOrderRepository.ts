import type { Order } from "../controllers/OrderController";

export interface IOrderRepository {
  createOrder(order: Order): Promise<void>;
  getOrderById(id: number): Promise<Order | null>;
  getOrders(): Promise<Order[]>;
  getOrderByUserId(userId: number): Promise<Order | null>;
  updateOrder(id: number, order: Order): Promise<void>;
  deleteOrder(id: number): Promise<void>;
}
