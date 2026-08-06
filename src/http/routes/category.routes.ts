import type { FastifyInstance } from "fastify";
import type { CategoryController } from "../controllers/CategoryController";

export const categoryRoutes =
  (categoryController: CategoryController) => (server: FastifyInstance) => {
    server.post(
      "/",
      categoryController.createCategory.bind(categoryController),
    );
    server.get("/", categoryController.getCategories.bind(categoryController));
    server.get(
      "/:id",
      categoryController.getCategoryById.bind(categoryController),
    );
    server.put(
      "/:id",
      categoryController.updateCategory.bind(categoryController),
    );
    server.delete(
      "/:id",
      categoryController.deleteCategory.bind(categoryController),
    );
  };
