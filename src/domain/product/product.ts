export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
}

export interface UpdateProductInput {
  name: string;
  description: string;
  price: number;
}
