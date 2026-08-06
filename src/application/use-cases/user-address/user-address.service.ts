import type { UserAddressRepository } from "../../ports/outbound/user-address.repository";
import type {
  CreateUserAddressInput,
  UpdateUserAddressInput,
} from "../../../domain/user-address/user-address";
import { ConflictError, NotFoundError } from "../../../domain/shared/errors";

export class UserAddressService {
  constructor(
    private readonly userAddressRepository: UserAddressRepository,
  ) {}

  async getUserAddresses() {
    return this.userAddressRepository.getUserAddresses();
  }

  async createUserAddress(userAddress: CreateUserAddressInput) {
    const existing = await this.userAddressRepository.getUserAddressByUserId(
      userAddress.userId,
    );
    if (existing) throw new ConflictError("User address already exists");

    await this.userAddressRepository.createUserAddress(userAddress);
  }

  async getUserAddressById(id: number) {
    const userAddress =
      await this.userAddressRepository.getUserAddressById(id);
    if (!userAddress) throw new NotFoundError("User address not found");

    return userAddress;
  }

  async getUserAddressByUserId(userId: number) {
    const userAddress =
      await this.userAddressRepository.getUserAddressByUserId(userId);
    if (!userAddress) throw new NotFoundError("User address not found");

    return {
      userId: userAddress.userId,
      address: userAddress.address,
      city: userAddress.city,
      state: userAddress.state,
      zip: userAddress.zip,
      country: userAddress.country,
    };
  }

  async updateUserAddress(id: number, userAddress: UpdateUserAddressInput) {
    await this.userAddressRepository.updateUserAddress(id, userAddress);
  }

  async deleteUserAddress(id: number) {
    const userAddress =
      await this.userAddressRepository.getUserAddressById(id);
    if (!userAddress) throw new NotFoundError("User address not found");

    await this.userAddressRepository.deleteUserAddress(id);
  }
}
