import type { ProductRepository } from "../../ports/outbound/product.repository";
import type { CachePort } from "../../ports/outbound/cache.port";
import type { FileStoragePort } from "../../ports/outbound/file-storage.port";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "../../../domain/product/product";
import { ConflictError, NotFoundError } from "../../../domain/shared/errors";

export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly fileStorage: FileStoragePort,
    private readonly cache: CachePort,
  ) {}

  async getProducts() {
    const cachedProducts = await this.cache.get("products");
    if (cachedProducts) {
      return JSON.parse(cachedProducts);
    }

    const products = await this.productRepository.getProducts({
      limit: 10,
      offset: 0,
    });
    await this.cache.set("products", JSON.stringify(products));
    return products;
  }

  async createProduct(product: CreateProductInput) {
    const existing = await this.productRepository.getProductByName(product.name);
    if (existing) throw new ConflictError("Product already exists");

    await this.productRepository.createProduct(product);

    const products = await this.productRepository.getProducts({
      limit: 10,
      offset: 0,
    });
    await this.cache.set(`product:${product.name}`, JSON.stringify(product));
    await this.cache.set("products", JSON.stringify(products));
  }

  async getProductById(id: number) {
    const product = await this.productRepository.getProductById(id);
    if (!product) throw new NotFoundError("Product not found");

    await this.cache.set(`product:${id}`, JSON.stringify(product));

    return {
      name: product.name,
      description: product.description,
      price: Number(product.price),
    };
  }

  async getProductByName(name: string) {
    const cachedProduct = await this.cache.get(`product:${name}`);
    if (cachedProduct) return JSON.parse(cachedProduct);

    const product = await this.productRepository.getProductByName(name);
    if (!product) throw new NotFoundError("Product not found");

    return {
      name: product.name,
      description: product.description,
      price: Number(product.price),
    };
  }

  async updateProduct(id: number, product: UpdateProductInput) {
    const cachedProduct = await this.cache.get(`product:${id}`);
    if (cachedProduct) {
      await this.cache.set(`product:${id}`, JSON.stringify(product));
    }

    await this.productRepository.updateProduct(id, product);
  }

  async deleteProduct(id: number) {
    await this.productRepository.deleteProduct(id);
  }

  async createProductImage(id: number, image: string) {
    await this.fileStorage.uploadFile(id, image);
  }
}
