import { eq } from "drizzle-orm";
import type { Database } from "../../database";
import { users } from "../../database/schema";
import type { UserRepository } from "../../../application/ports/outbound/user.repository";
import type {
  CreateUserInput,
  UpdateUserInput,
  User,
} from "../../../domain/user/user";
import bcrypt from "bcrypt";

export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly database: Database) {}

  async createUser(user: CreateUserInput) {
    await this.database.insert(users).values({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.database.query.users.findFirst({
      where: { id },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password ?? "",
    };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.database.query.users.findFirst({
      where: { email },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password ?? "",
    };
  }

  async updateUser(id: number, user: UpdateUserInput) {
    await this.database
      .update(users)
      .set({
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .where(eq(users.id, id));
  }

  async deleteUser(id: number) {
    await this.database.delete(users).where(eq(users.id, id));
  }

  async authenticateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    return user;
  }
}
