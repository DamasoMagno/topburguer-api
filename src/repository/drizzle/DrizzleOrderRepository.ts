import { asc, eq } from "drizzle-orm";
import { db } from "../../database";
import { orders } from "../../database/schema";
import type { IOrderRepository } from "../IOrderRepository";

interface UpdateOrder {
  totalPrice: number;
  status?: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class DrizzleOrderRepository implements IOrderRepository {
  constructor(private readonly database: typeof db) {}

  async createOrder(order: any): Promise<void> {
    await this.database.insert(orders).values({
      ...order,
      totalAmount: order.totalPrice.toString(),
    });
  }

  async getOrderById(id: number) {
    const result = await this.database.query.orders.findFirst({
      where: {
        id,
      },
    });
    return result ?? null;
  }

  async getOrders(): Promise<(typeof orders.$inferSelect)[]> {
    const result = await this.database.query.orders.findMany({});
    return result ?? [];
  }

  async getOrderByUserId(
    userId: number,
  ): Promise<typeof orders.$inferSelect | null> {
    const result = await this.database.query.orders.findFirst({
      where: {
        userProfileId: userId,
      },
    });

    return result ?? null;
  }

  async updateOrder(id: number, order: UpdateOrder): Promise<void> {
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
