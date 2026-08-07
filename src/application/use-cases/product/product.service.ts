import type { ProductRepository } from "../../ports/outbound/product.repository";
import type { CachePort } from "../../ports/outbound/cache.port";
import type { FileStoragePort } from "../../ports/outbound/file-storage.port";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "../../../domain/product/product";
import { ConflictError, NotFoundError } from "../../../domain/shared/errors";

export class ProductService {
  private readonly CACHE_TTL = 60 * 60 * 24; // 24 hours

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly fileStorage: FileStoragePort,
    private readonly cache: CachePort,
  ) {}

  private productToDTO(product: {
    id: number;
    name: string;
    description: string;
    price: number | string;
  }) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
    };
  }

  async getProducts() {
    const cachedProducts = await this.cache.get("products");
    if (cachedProducts) {
      return JSON.parse(cachedProducts);
    }

    const products = await this.productRepository.getProducts({
      limit: 10,
      offset: 0,
    });
    await this.cache.set("products", JSON.stringify(products), this.CACHE_TTL);

    return products;
  }

  async createProduct(product: CreateProductInput) {
    const existing = await this.productRepository.getProductByName(
      product.name,
    );
    if (existing) throw new ConflictError("Product already exists");

    const data = await this.productRepository.createProduct(product);

    if (!data) throw new NotFoundError("Product not found");

    await this.cache.delete("products");
    await this.cache.set(
      `product:id:${data.id}`,
      JSON.stringify(data),
      this.CACHE_TTL,
    );
  }

  async getProductById(id: number) {
    const cachedProduct = await this.cache.get(`product:id:${id}`);

    if (cachedProduct) {
      return JSON.parse(cachedProduct);
    }

    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    const data = this.productToDTO(product);

    await this.cache.set(
      `product:id:${id}`,
      JSON.stringify(data),
      this.CACHE_TTL,
    );

    return data;
  }

  async updateProduct(id: number, product: UpdateProductInput) {
    const data = await this.productRepository.updateProduct(id, product);

    if (!data) throw new NotFoundError("Product not found");

    const dataString = JSON.stringify(this.productToDTO(data));

    await this.cache.set(`product:id:${id}`, dataString, this.CACHE_TTL);
    await this.cache.delete(`products`);
  }

  async deleteProduct(id: number) {
    await this.productRepository.deleteProduct(id);

    await this.cache.delete(`product:id:${id}`);
    await this.cache.delete(`products`);
  }

  async createProductImage(id: number, image: string) {
    await this.fileStorage.uploadFile(id, image);
  }
}
