import { eq } from "drizzle-orm";
import type { ProductRepository } from "../../../application/ports/outbound/product.repository";
import type {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from "../../../domain/product/product";
import type { Pagination } from "../../../domain/shared/pagination";
import type { Database } from "../../database";
import { products } from "../../database/schema";
import { NotFoundError } from "../../../domain/shared/errors";

export class DrizzleProductRepository implements ProductRepository {
  constructor(private readonly database: Database) {}

  async createProduct(product: CreateProductInput) {
    const [data] = await this.database
      .insert(products)
      .values({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
      })
      .returning();

    return {
      id: data?.id,
      name: data?.name,
      description: data?.description,
      price: Number(data?.price),
    } as Product;
  }

  async getProductById(id: number): Promise<Product | null> {
    const product = await this.database.query.products.findFirst({
      where: { id },
    });

    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
    };
  }

  async getProductByName(name: string): Promise<Product | null> {
    const product = await this.database.query.products.findFirst({
      where: { name },
    });

    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
    };
  }

  async getProducts({
    limit = 10,
    offset = 0,
  }: Pagination): Promise<Product[]> {
    const response = await this.database.query.products.findMany({
      limit,
      offset,
    });

    return response.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
    }));
  }

  async deleteProduct(id: number) {
    await this.database.delete(products).where(eq(products.id, id));
  }

  async updateProduct(id: number, product: UpdateProductInput) {
    const [data] = await this.database
      .update(products)
      .set({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
      })
      .where(eq(products.id, id))
      .returning();

    return {
      id: data?.id,
      name: data?.name,
      description: data?.description,
      price: Number(data?.price),
    } as Product | null;
  }
}
