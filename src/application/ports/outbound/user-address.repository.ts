import type {
  CreateUserAddressInput,
  UpdateUserAddressInput,
  UserAddress,
} from "../../../domain/user-address/user-address";

export interface UserAddressRepository {
  createUserAddress(userAddress: CreateUserAddressInput): Promise<void>;
  getUserAddressById(id: number): Promise<UserAddress | null>;
  getUserAddresses(): Promise<UserAddress[]>;
  getUserAddressByUserId(userId: number): Promise<UserAddress | null>;
  updateUserAddress(
    id: number,
    userAddress: UpdateUserAddressInput,
  ): Promise<void>;
  deleteUserAddress(id: number): Promise<void>;
}
