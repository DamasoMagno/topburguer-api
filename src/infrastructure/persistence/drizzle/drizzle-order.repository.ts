import { eq } from "drizzle-orm";
import type { OrderRepository } from "../../../application/ports/outbound/order.repository";
import type {
  CreateOrderInput,
  Order,
  UpdateOrderInput,
} from "../../../domain/order/order";
import type { Database } from "../../database";
import { orders } from "../../database/schema";

export class DrizzleOrderRepository implements OrderRepository {
  constructor(private readonly database: Database) {}

  async createOrder(order: CreateOrderInput): Promise<void> {
    await this.database.insert(orders).values({
      userProfileId: order.userId,
      totalAmount: order.totalPrice.toString(),
    });
  }

  async getOrderById(id: number): Promise<Order | null> {
    const result = await this.database.query.orders.findFirst({
      where: { id },
    });

    if (!result) return null;

    return {
      id: result.id,
      userId: result.userProfileId ?? 0,
      totalPrice: Number(result.totalAmount),
    };
  }

  async getOrders(): Promise<Order[]> {
    const result = await this.database.query.orders.findMany();

    return result.map((order) => ({
      id: order.id,
      userId: order.userProfileId ?? 0,
      totalPrice: Number(order.totalAmount),
    }));
  }

  async getOrderByUserId(userId: number): Promise<Order | null> {
    const result = await this.database.query.orders.findFirst({
      where: { userProfileId: userId },
    });

    if (!result) return null;

    return {
      id: result.id,
      userId: result.userProfileId ?? 0,
      totalPrice: Number(result.totalAmount),
    };
  }

  async updateOrder(_id: number, _order: UpdateOrderInput): Promise<void> {
    // Status ainda não existe no schema do banco.
  }

  async deleteOrder(id: number): Promise<void> {
    await this.database.delete(orders).where(eq(orders.id, id));
  }
}
