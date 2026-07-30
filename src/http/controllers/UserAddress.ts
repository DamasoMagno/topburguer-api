import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import type { UserAddressService } from "../../services/UserAddressService";

const userAddressSchema = z.object({
  userId: z.number(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
});

export type UserAddress = z.infer<typeof userAddressSchema>;

export class UserAddressController {
  private userAddressService: UserAddressService;

  constructor(userAddressService: UserAddressService) {
    this.userAddressService = userAddressService;
  }

  async createUserAddress(request: FastifyRequest, response: FastifyReply) {
    const { userId, address, city, state, zip, country } =
      userAddressSchema.parse(request.body);

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
    const { id } = request.params as { id: number };

    const userAddress = await this.userAddressService.getUserAddressById(id);

    if (!userAddress)
      return response.status(404).send({ message: "User address not found" });
    return response.status(200).send(userAddress);
  }

  async getUserAddresses(request: FastifyRequest, response: FastifyReply) {
    const userAddresses = await this.userAddressService.getUserAddresses();
    return response.status(200).send(userAddresses);
  }
}
