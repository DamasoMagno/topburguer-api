import type { UserRepository } from "../../ports/outbound/user.repository";
import { ConflictError, NotFoundError } from "../../../domain/shared/errors";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "../../../domain/user/user";
import bcrypt from "bcrypt";
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: CreateUserInput) {
    const existing = await this.userRepository.getUserByEmail(user.email);

    if (existing) {
      throw new ConflictError("User already exists");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  async authenticateUser(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async getUserById(id: number) {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new NotFoundError("User not found");

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new NotFoundError("User not found");

    return user;
  }

  async updateUser(id: number, user: UpdateUserInput) {
    await this.userRepository.updateUser(id, user);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new NotFoundError("User not found");

    await this.userRepository.deleteUser(id);
  }
}
