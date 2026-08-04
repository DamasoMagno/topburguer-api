import type { Category } from "../http/schemas";

export interface ICategoryRepository {
  createCategory(category: Category): Promise<void>;
  getCategoryById(id: number): Promise<Category | null>;
  getCategories(): Promise<Category[]>;
  getCategoryByName(name: string): Promise<Category | null>;
  updateCategory(id: number, category: Category): Promise<void>;
  deleteCategory(id: number): Promise<void>;
}