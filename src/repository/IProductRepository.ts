import type { Product } from "../controllers/ProductController";

export interface ProductQuery {
  limit: number;
  offset: number;
}

export interface ProductResponse {
  name: string;
  description: string;
  price: number;
}

export interface IProductRepository {
  createProduct(product: Product): Promise<void>;
  getProductById(id: number): Promise<Product | null>;
  getProductByName(name: string): Promise<Product | null>;
  getProducts(query: ProductQuery): Promise<ProductResponse[]>;
  updateProduct(id: number, product: Product): Promise<void>;
  deleteProduct(id: number): Promise<void>;
}
