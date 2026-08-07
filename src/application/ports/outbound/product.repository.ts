import type {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from "../../../domain/product/product";
import type { Pagination } from "../../../domain/shared/pagination";

export interface ProductRepository {
  createProduct(product: CreateProductInput): Promise<Product | null>;
  getProductById(id: number): Promise<Product | null>;
  getProductByName(name: string): Promise<Product | null>;
  getProducts(query: Pagination): Promise<Product[]>;
  updateProduct(id: number, product: UpdateProductInput): Promise<Product | null>;
  deleteProduct(id: number): Promise<void>;
}
