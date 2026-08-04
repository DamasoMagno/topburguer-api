
export interface IOrderRepository {
  createOrder(order: any): Promise<void>;
  getOrderById(id: number): Promise<any | null>;
  getOrders(): Promise<any[]>;
  getOrderByUserId(userId: number): Promise<any | null>;
  updateOrder(id: number, order: any): Promise<void>;
  deleteOrder(id: number): Promise<void>;
}
