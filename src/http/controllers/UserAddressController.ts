import type { FastifyRequest, FastifyReply } from "fastify";
import type { UserAddressService } from "../../application/use-cases/user-address/user-address.service";
import {
  createUserAddressSchema,
  userAddressParamsSchema,
} from "../schemas/userAddressSchema";

export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  async createUserAddress(request: FastifyRequest, response: FastifyReply) {
    const { userId, address, city, state, zip, country } =
      createUserAddressSchema.parse(request.body);

    await this.userAddressService.createUserAddress({
      userId,
      address,
      city,
      state,
      zip,
      country,
    });

    return response
      .status(201)
      .send({ message: "User address created successfully" });
  }

  async getUserAddressById(request: FastifyRequest, response: FastifyReply) {
    const { id } = userAddressParamsSchema.parse(request.params);
    const userAddress = await this.userAddressService.getUserAddressById(id);
    return response.status(200).send(userAddress);
  }

  async getUserAddresses(_request: FastifyRequest, response: FastifyReply) {
    const userAddresses = await this.userAddressService.getUserAddresses();
    return response.status(200).send(userAddresses);
  }
}
