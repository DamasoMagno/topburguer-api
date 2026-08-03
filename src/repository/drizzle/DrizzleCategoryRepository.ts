import { categories } from "../../database/schema";
import { db } from "../../database/relations";
import { eq } from "drizzle-orm";
import type { ICategoryRepository } from "../ICategoryRepository";
import type { Category } from "../../http/controllers/CategoryController";

export class DrizzleCategoryRepository implements ICategoryRepository {
  constructor(private readonly database: typeof db) {}

  async getCategoryById(id: number) {
    const category = await this.database
      .query.categories.findFirst({
        where: {
          id,
        },
      })

    return category ?? null;
  }

  async getCategoryByName(name: string): Promise<Category | null> {
    const category = await this.database
      .query.categories.findFirst({
        where: {
          name,
        },
      })
      
    return category ?? null;
  }

  async getCategories() {
    const response = await this.database.query.categories.findMany();

    return response.map((category) => ({
      ...category,
    }));
  }

  async createCategory(category: typeof categories.$inferInsert) {
    await this.database.insert(categories).values(category);
  }

  async deleteCategory(id: number) {
    await this.database.delete(categories).where(eq(categories.id, id));
  }

  async updateCategory(id: number, category: typeof categories.$inferInsert) {
    await this.database
      .update(categories)
      .set(category)
      .where(eq(categories.id, id));
  }
}
