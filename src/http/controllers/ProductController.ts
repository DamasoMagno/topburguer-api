import type { ProductService } from "../../services/ProductService";
import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
});

export type Product = z.infer<typeof productSchema>;

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  async createProduct(request: FastifyRequest, response: FastifyReply) {
    const { name, description, price } = productSchema.parse(request.body);

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

    if (!product)
      return response.status(404).send({ message: "Product not found" });
    return response.status(200).send(product);
  }

  async getProducts(request: FastifyRequest, response: FastifyReply) {
    const products = await this.productService.getProducts();
    return response.status(200).send(products);
  }

  async updateProduct(request: FastifyRequest, response: FastifyReply) {
    const { id } = request.params as { id: number };
    const { name, description, price } = productSchema.parse(request.body);

    await this.productService.updateProduct(id, {
      name,
      description,
      price,
    });

    return response.status(200).send({ message: "Product updated successfully" });
  }

  async deleteProduct(request: FastifyRequest, response: FastifyReply) {
    const { id } = request.params as { id: number };
    await this.productService.deleteProduct(id);
    return response.status(200).send({ message: "Product deleted successfully" });
  }

  async createProductImage(request: FastifyRequest, response: FastifyReply) {
    const { id } = request.params as { id: number };
    const { image } = request.body as { image: string };

    await this.productService.createProductImage(id, image);
    return response.status(200).send({ message: "Product image created successfully" });
  }
}
