import type { FastifyInstance } from "fastify";
import { db } from "../database";
import { CategoryController } from "../http/controllers/CategoryController";
import { CategoryService } from "../services/CategoryService";
import { DrizzleCategoryRepository } from "../repository/drizzle/DrizzleCategoryRepository";

const categoryController = new CategoryController(
  new CategoryService(new DrizzleCategoryRepository(db)),
);

export const categoryRoutes = (server: FastifyInstance) => {
  server.post("/", categoryController.createCategory.bind(categoryController));
  server.get("/", categoryController.getCategories);
  server.get("/:id", categoryController.getCategoryById);
  server.put("/:id", categoryController.updateCategory);
  server.delete("/:id", categoryController.deleteCategory);
};
