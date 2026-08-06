import type { OrderRepository } from "../../ports/outbound/order.repository";
import type {
  CreateOrderInput,
  UpdateOrderInput,
} from "../../../domain/order/order";
import { NotFoundError } from "../../../domain/shared/errors";

export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getOrders() {
    return this.orderRepository.getOrders();
  }

  async createOrder(order: CreateOrderInput) {
    await this.orderRepository.createOrder(order);
  }

  async getOrderById(id: number) {
    return this.orderRepository.getOrderById(id);
  }

  async getOrderByUserId(userId: number) {
    return this.orderRepository.getOrderByUserId(userId);
  }

  async updateOrder(id: number, order: UpdateOrderInput) {
    await this.orderRepository.updateOrder(id, order);
  }

  async deleteOrder(id: number) {
    const order = await this.orderRepository.getOrderById(id);
    if (!order) throw new NotFoundError("Order not found");

    await this.orderRepository.deleteOrder(id);
  }
}
