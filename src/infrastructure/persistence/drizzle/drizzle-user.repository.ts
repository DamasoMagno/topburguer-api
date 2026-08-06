import { eq } from "drizzle-orm";
import type { UserAddressRepository } from "../../../application/ports/outbound/user-address.repository";
import type {
  CreateUserAddressInput,
  UpdateUserAddressInput,
  UserAddress,
} from "../../../domain/user-address/user-address";
import type { Database } from "../../database";
import { userAddresses, users, users } from "../../database/schema";
import type { UserRepository } from "../../../application/ports/outbound/user.repository";
import type {
  CreateUserInput,
  UpdateUserInput,
  User,
} from "../../../domain/user/user";

export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly database: Database) {}

  async createUser(user: CreateUserInput) {
    await this.database.insert(userAddresses).values({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.database.query.users.findFirst({
      where: { id },
    });

    if (!user) return null;

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.database.query.users.findFirst({
      where: { email },
    });

    if (!user) return null;

    return user;
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
    const user = await this.database.query.users.findFirst({
      where: { email },
    });

    if (!user) return null;

    return user;
  }
}
