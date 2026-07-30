import type { ICategoryRepository } from "../repository/ICategoryRepository";
import type { Category } from "../controllers/CategoryController";

export class CategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async getCategories() {
    const categories = await this.categoryRepository.getCategories();
    return categories;
  }

  async createCategory(category: Category) {
    const findCategoryByName = await this.categoryRepository.getCategoryByName(
      category.name,
    );
    if (findCategoryByName) throw new Error("Category already exists");
    await this.categoryRepository.createCategory(category);
  }

  async getCategoryByName(name: string) {
    const category = await this.categoryRepository.getCategoryByName(name);
    if (!category) throw new Error("Category not found");
    return {
      name: category.name,
    };
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.getCategoryById(id);
    if (!category) throw new Error("Category not found");
    return {
      name: category.name,
    };
  }

  async updateCategory(id: number, category: Category) {
    const findCategoryById = await this.categoryRepository.getCategoryById(id);
    if (!findCategoryById) throw new Error("Category not found");
    await this.categoryRepository.updateCategory(id, category);
    return;
  }

  async deleteCategory(id: number) {
    await this.categoryRepository.deleteCategory(id);
  }
}
