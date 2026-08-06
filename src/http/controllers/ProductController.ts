import type { FastifyRequest, FastifyReply } from "fastify";
import type { ProductService } from "../../application/use-cases/product/product.service";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/productSchema";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async createProduct(request: FastifyRequest, response: FastifyReply) {
    const { name, description, price } = createProductSchema.parse(
      request.body,
    );

    await this.productService.createProduct({
      name,
      description,
      price,
    });

    return response
      .status(201)
      .send({ message: "Product created successfully" });
  }

  async getProductById(request: FastifyRequest, response: FastifyReply) {
    const { id } = request.params as { id: number };
    const product = await this.productService.getProductById(id);
    return response.status(200).send(product);
  }

  async getProducts(_request: FastifyRequest, response: FastifyReply) {
    const products = await this.productService.getProducts();
    return response.status(200).send(products);
  }

  async updateProduct(request: FastifyRequest, response: FastifyReply) {
    const { id } = request.params as { id: number };
    const { name, description, price } = updateProductSchema.parse(
      request.body,
    );

    await this.productService.updateProduct(id, {
      name,
      description,
      price,
    });

    return response
      .status(200)
      .send({ message: "Product updated successfully" });
  }

  async deleteProduct(request: FastifyRequest, response: FastifyReply) {
    const { id } = request.params as { id: number };
    await this.productService.deleteProduct(id);
    return response
      .status(200)
      .send({ message: "Product deleted successfully" });
  }

  async createProductImage(request: FastifyRequest, response: FastifyReply) {
    const { id } = request.params as { id: number };
    const { image } = request.body as { image: string };

    await this.productService.createProductImage(id, image);
    return response
      .status(200)
      .send({ message: "Product image created successfully" });
  }
}
