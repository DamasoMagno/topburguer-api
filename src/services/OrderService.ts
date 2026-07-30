import type { Order } from "../http/controllers/OrderController";
import type { UserAddress } from "../http/controllers/UserAddress";
import type { IOrderRepository } from "../repository/IOrderRepository";
import type { IUserAddressRepository } from "../repository/IUserAddressRepository";

export class OrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async getOrders() {
    const orders = await this.orderRepository.getOrders();
    return orders;
  }

  async createOrder(order: Order) {
    await this.orderRepository.createOrder(order);
    return;
  }

  async getOrderById(id: number) {
    const order = await this.orderRepository.getOrderById(id);
    return order;
  }

  async getOrderByUserId(userId: number) {
    const order = await this.orderRepository.getOrderByUserId(userId);
    return order;
  }

  async updateOrder(id: number, order: Order) {
    await this.orderRepository.updateOrder(id, order);
  }

  async deleteProduct(id: number) {
    const order = await this.orderRepository.getOrderById(id);
    if (!order) {
      throw new Error("Order not found");
    }

    await this.orderRepository.deleteOrder(id);
  }
}
