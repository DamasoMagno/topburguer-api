import { products } from "../../database/schema";
import { db } from "../../database/relations";
import { eq } from "drizzle-orm";
import type { Product } from "../../http/controllers/ProductController";
import type {
  IProductRepository,
  ProductQuery,
  ProductResponse,
} from "../IProductRepository";

export class DrizzleProductRepository implements IProductRepository {
  constructor(private readonly database: typeof db) {}

  async createProduct(product: Product) {
    await this.database.insert(products).values({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
    });
  }

  async getProductById(id: number): Promise<Product | null> {
    const product = await this.database.query.products.findFirst({
      where: {
        id: id,
      },
    });

    if (!product) return null;

    return {
      name: product.name,
      description: product.description,
      price: Number(product.price),
    };
  }

  async getProductByName(name: string): Promise<Product | null> {
    const product = await this.database.query.products.findFirst({
      where: {
        name: name,
      },
    });

    if (!product) return null;

    return {
      name: product.name,
      description: product.description,
      price: Number(product.price),
    };
  }

  async getProducts(query: ProductQuery): Promise<ProductResponse[]> {
    const response = await this.database.query.products.findMany({
      limit: query.limit,
      offset: query.offset,
    });

    return response.map((product) => ({
      name: product.name,
      description: product.description,
      price: Number(product.price),
    }));
  }

  async deleteProduct(id: number) {
    await this.database.delete(products).where(eq(products.id, id));
  }

  async updateProduct(id: number, product: Product) {
    await this.database
      .update(products)
      .set({
        name: product.name,
        description: product.description,
        price: product.price.toString() as unknown as string,
      })
      .where(eq(products.id, id));
  }
}
