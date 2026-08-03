import type { FastifyRequest, FastifyReply } from "fastify";
import type { CategoryService } from "../../services/CategoryService";
import { categorySchema } from "../schemas";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async createCategory(request: FastifyRequest, response: FastifyReply) {
    const { name } = categorySchema.parse(request.body);

    await this.categoryService.createCategory({ name });

    return response
      .status(201)
      .send({ message: "Category created successfully" });
  }

  async getCategoryById(request: FastifyRequest, response: FastifyReply) {
    const { id } = request.params as { id: number };

    const category = await this.categoryService.getCategoryById(id);

    return response.status(200).send({ name: category.name });
  }

  async getCategories(request: FastifyRequest, response: FastifyReply) {
    const categories = await this.categoryService.getCategories();
    return response.status(200).send(
      categories.map((category) => ({
        name: category.name,
      })),
    );
  }

  async updateCategory(request: FastifyRequest, response: FastifyReply) {
    const { id } = request.params as { id: number };
    const { name } = categorySchema.parse(request.body);

    await this.categoryService.updateCategory(id, { name });

    return response
      .status(200)
      .send({ message: "Category updated successfully" });
  }

  async deleteCategory(request: FastifyRequest, response: FastifyReply) {
    const { id } = request.params as { id: number };
    await this.categoryService.deleteCategory(id);
    return response
      .status(200)
      .send({ message: "Category deleted successfully" });
  }
}
