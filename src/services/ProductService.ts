import type { Product } from "../controllers/ProductController";
import type { Redis } from "../lib/redis";
import type { IProductRepository } from "../repository/IProductRepository";
import type { IS3Repository } from "../repository/IS3Repository";

export class ProductService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly s3Service: IS3Repository,
    private readonly redis: Redis,
  ) {}

  async getProducts() {
    const cachedProducts = await this.redis.get("products");
    if (!cachedProducts) {
      const products = await this.productRepository.getProducts({ limit: 10, offset: 0 });
      await this.redis.set("products", JSON.stringify(products));
      return products;
    }

    return JSON.parse(cachedProducts);
  }

  async createProduct(product: Product) {
    const findProductByName = await this.productRepository.getProductByName(
      product.name,
    );
    if (findProductByName) throw new Error("Product already exists");
    await this.productRepository.createProduct(product);
    const products = await this.productRepository.getProducts({ limit: 10, offset: 0 });
    await this.redis.set(`product:${product.name}`, JSON.stringify(product));
    await this.redis.set("products", JSON.stringify(products));
    return;
  }

  async getProductById(id: number) {
    const product = await this.productRepository.getProductById(id);
    await this.redis.set(`product:${id}`, JSON.stringify(product));
    if (!product) throw new Error("Product not found");
    return {
      name: product.name,
      description: product.description,
      price: Number(product.price),
    };
  }

  async getProductByName(name: string) {
    const cachedProduct = await this.redis.get(`product:${name}`);
    if (cachedProduct) return JSON.parse(cachedProduct);
    const product = await this.productRepository.getProductByName(name);
    if (!product) throw new Error("Product not found");
    return {
      name: product.name,
      description: product.description,
      price: Number(product.price),
    };
  }

  async updateProduct(id: number, product: Product) {
    const cachedProduct = await this.redis.get(`product:${id}`);
    if (cachedProduct) {
      await this.redis.set(`product:${id}`, JSON.stringify(product));
    }
    await this.productRepository.updateProduct(id, {
      name: product.name,
      description: product.description,
      price: product.price,
    });
  }

  async deleteProduct(id: number) {
    await this.productRepository.deleteProduct(id);
  }

  async createProductImage(id: number, image: string) {
    await this.s3Service.uploadFile(id, image);
  }
}
