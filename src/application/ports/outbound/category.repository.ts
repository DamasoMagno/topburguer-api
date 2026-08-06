import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../../../domain/category/category";

export interface CategoryRepository {
  createCategory(category: CreateCategoryInput): Promise<void>;
  getCategoryById(id: number): Promise<Category | null>;
  getCategories(): Promise<Category[]>;
  getCategoryByName(name: string): Promise<Category | null>;
  updateCategory(id: number, category: UpdateCategoryInput): Promise<void>;
  deleteCategory(id: number): Promise<void>;
}
