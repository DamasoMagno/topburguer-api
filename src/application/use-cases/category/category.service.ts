import type { CategoryRepository } from "../../ports/outbound/category.repository";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../../../domain/category/category";
import { ConflictError, NotFoundError } from "../../../domain/shared/errors";

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategories() {
    return this.categoryRepository.getCategories();
  }

  async createCategory(category: CreateCategoryInput) {
    const existing = await this.categoryRepository.getCategoryByName(
      category.name,
    );
    if (existing) throw new ConflictError("Category already exists");

    await this.categoryRepository.createCategory(category);
  }

  async getCategoryByName(name: string) {
    const category = await this.categoryRepository.getCategoryByName(name);
    if (!category) throw new NotFoundError("Category not found");

    return { name: category.name };
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.getCategoryById(id);
    if (!category) throw new NotFoundError("Category not found");

    return { name: category.name };
  }

  async updateCategory(id: number, category: UpdateCategoryInput) {
    const existing = await this.categoryRepository.getCategoryById(id);
    if (!existing) throw new NotFoundError("Category not found");

    await this.categoryRepository.updateCategory(id, category);
  }

  async deleteCategory(id: number) {
    await this.categoryRepository.deleteCategory(id);
  }
}
