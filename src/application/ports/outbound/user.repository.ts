import type {
  CreateUserInput,
  UpdateUserInput,
  User,
} from "../../../domain/user/user";

export interface UserRepository {
  createUser(user: CreateUserInput): Promise<void>;
  getUserById(id: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: number, user: UpdateUserInput): Promise<void>;
  deleteUser(id: number): Promise<void>;
  authenticateUser(email: string, password: string): Promise<User | null>;
}
