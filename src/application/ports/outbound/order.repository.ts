import type {
  CreateOrderInput,
  Order,
  UpdateOrderInput,
} from "../../../domain/order/order";

export interface OrderRepository {
  createOrder(order: CreateOrderInput): Promise<void>;
  getOrderById(id: number): Promise<Order | null>;
  getOrders(): Promise<Order[]>;
  getOrderByUserId(userId: number): Promise<Order | null>;
  updateOrder(id: number, order: UpdateOrderInput): Promise<void>;
  deleteOrder(id: number): Promise<void>;
}
