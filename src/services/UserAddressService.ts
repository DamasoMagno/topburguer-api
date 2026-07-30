import type { UserAddress } from "../controllers/UserAddress";
import type { IUserAddressRepository } from "../repository/IUserAddressRepository";

export class UserAddressService {
  constructor(private readonly userAddressRepository: IUserAddressRepository) {}

  async getUserAddresses() {
    const userAddresses = await this.userAddressRepository.getUserAddresses();
    return userAddresses;
  }

  async createUserAddress(userAddress: UserAddress) {
    const findUserAddressByUserId =
      await this.userAddressRepository.getUserAddressByUserId(
        userAddress.userId,
      );
    if (findUserAddressByUserId) {
      throw new Error("User address already exists")
    };
    await this.userAddressRepository.createUserAddress(userAddress);
    return;
  }
  async getUserAddressById(id: number) {
    const userAddress = await this.userAddressRepository.getUserAddressById(id);
    if (!userAddress) {
      throw new Error("User address not found")
    };
    return userAddress;
  }

  async getUserAddressByUserId(userId: number) {
    const userAddress =
      await this.userAddressRepository.getUserAddressByUserId(userId);
    if (!userAddress) {
      throw new Error("User address not found")
    };
    return {
      userId: userAddress.userId ?? 0,
      address: userAddress.address,
      city: userAddress.city ?? "",
      state: userAddress.state ?? "",
      zip: userAddress.zip ?? "",
      country: userAddress.country ?? "",
    };
  }

  async updateUserAddress(id: number, userAddress: UserAddress) {
    await this.userAddressRepository.updateUserAddress(id, {
      userId: userAddress.userId,
      address: userAddress.address,
      city: userAddress.city,
      state: userAddress.state,
      zip: userAddress.zip,
      country: userAddress.country,
    });
  }

  async deleteProduct(id: number) {
    const userAddress = await this.userAddressRepository.getUserAddressById(id);

    if (!userAddress) {
      throw new Error("User address not found")
    };

    await this.userAddressRepository.deleteUserAddress(id);
  }
}
