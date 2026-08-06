import type { FastifyRequest, FastifyReply } from "fastify";
import {
  createUserSchema,
  userParamsSchema,
  updateUserSchema,
  userResponseSchema,
} from "../schemas/userSchema";
import type { UserService } from "../../application/use-cases/user/user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(request: FastifyRequest, response: FastifyReply) {
    const { name, email, password } = createUserSchema.parse(request.body);

    await this.userService.createUser({
      name,
      email,
      password,
      role: "user",
    });

    return response.status(201).send({ message: "User created successfully" });
  }

  async getUserById(request: FastifyRequest, response: FastifyReply) {
    const { id } = userParamsSchema.parse(request.params);
    const user = await this.userService.getUserById(id);
    return response.status(200).send(user);
  }

  async getUserByEmail(request: FastifyRequest, response: FastifyReply) {
    const { email } = userResponseSchema.parse(request.body);
    const user = await this.userService.getUserByEmail(email);
    return response.status(200).send(user);
  }

  async updateUser(request: FastifyRequest, response: FastifyReply) {
    const { id } = userParamsSchema.parse(request.params);
    const { name, email, password } = updateUserSchema.parse(request.body);
    await this.userService.updateUser(id, { name, email, password });
    return response.status(200).send({ message: "User updated successfully" });
  }
}
