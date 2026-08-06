export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItemInput {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  status?: OrderStatus;
}

export interface CreateOrderInput {
  userId: number;
  products: OrderItemInput[];
  totalPrice: number;
  status: OrderStatus;
}

export interface UpdateOrderInput {
  status: OrderStatus;
}
