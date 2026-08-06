import type { FastifyInstance } from "fastify";
import type { UserAddressController } from "../controllers/UserAddressController";

export const userAddressRoutes =
  (userAddressController: UserAddressController) =>
  (server: FastifyInstance) => {
    server.post(
      "/",
      userAddressController.createUserAddress.bind(userAddressController),
    );
    server.get(
      "/",
      userAddressController.getUserAddresses.bind(userAddressController),
    );
    server.get(
      "/:id",
      userAddressController.getUserAddressById.bind(userAddressController),
    );
  };
