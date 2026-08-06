import { eq } from "drizzle-orm";
import type { CategoryRepository } from "../../../application/ports/outbound/category.repository";
import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../../../domain/category/category";
import type { Database } from "../../database";
import { categories } from "../../database/schema";

export class DrizzleCategoryRepository implements CategoryRepository {
  constructor(private readonly database: Database) {}

  async getCategoryById(id: number): Promise<Category | null> {
    const category = await this.database.query.categories.findFirst({
      where: { id },
    });

    return category ?? null;
  }

  async getCategoryByName(name: string): Promise<Category | null> {
    const category = await this.database.query.categories.findFirst({
      where: { name },
    });

    return category ?? null;
  }

  async getCategories(): Promise<Category[]> {
    const response = await this.database.query.categories.findMany();
    return response.map((category) => ({
      id: category.id,
      name: category.name,
    }));
  }

  async createCategory(category: CreateCategoryInput): Promise<void> {
    await this.database.insert(categories).values(category);
  }

  async deleteCategory(id: number): Promise<void> {
    await this.database.delete(categories).where(eq(categories.id, id));
  }

  async updateCategory(
    id: number,
    category: UpdateCategoryInput,
  ): Promise<void> {
    await this.database
      .update(categories)
      .set(category)
      .where(eq(categories.id, id));
  }
}
