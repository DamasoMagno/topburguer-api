import { eq } from "drizzle-orm";
import { db } from "../../database/relations";
import { orders } from "../../database/schema";
import type { IOrderRepository } from "../IOrderRepository";
import type { Order } from "../../http/controllers/OrderController";

export class DrizzleOrderRepository implements IOrderRepository {
  constructor(private readonly database: typeof db) {}

  async createOrder(order: Order): Promise<void> {
    await this.database.insert(orders).values({
      ...order,
      totalAmount: order.totalPrice.toString(),
    });
  }

  async getOrderById(id: number): Promise<Order | null> {
    const result = await this.database
      .select()
      .from(orders)
      .where(eq(orders.id, id));

    return result[0]
      ? {
          ...result[0],
          totalPrice: Number(result[0].totalAmount),
          products: result[0].products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
          status: result[0].status,
          userId: result[0].userId,
          createdAt: result[0].createdAt,
          updatedAt: result[0].updatedAt,
        }
      : null;
  }

  async getOrders(): Promise<Order[]> {
    const result = await this.database
      .select()
      .from(orders)
      .orderBy(asc(orders.id));
    return result.map((order: typeof orders.$inferSelect) => ({
      ...order,
      totalPrice: Number(order.totalAmount),
      products: order.products?.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
      status: order.status as
        | "pending"
        | "confirmed"
        | "shipped"
        | "delivered"
        | "cancelled",
      userId: order.userId as number,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));
  }

  async getOrderByUserId(userId: number): Promise<Order | null> {
    const result = await this.database
      .select()
      .from(orders)
      .where(eq(orders.userId, userId));

    return result[0]
      ? {
          ...result[0],
          totalPrice: Number(result[0].totalAmount),
          products: result[0].products?.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
          status: result[0].status as
            | "pending"
            | "confirmed"
            | "shipped"
            | "delivered"
            | "cancelled",
          userId: result[0].userId as number,
          createdAt: result[0].createdAt,
          updatedAt: result[0].updatedAt,
        }
      : null;
  }

  async updateOrder(id: number, order: Order): Promise<void> {
    await this.database
      .update(orders)
      .set({
        ...order,
        totalAmount: order.totalPrice.toString(),
      })
      .where(eq(orders.id, id));
  }

  async deleteOrder(id: number): Promise<void> {
    await this.database.delete(orders).where(eq(orders.id, id));
  }
}
