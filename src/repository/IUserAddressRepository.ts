import type { UserAddress } from "../controllers/UserAddress";

export interface IUserAddressRepository {
  createUserAddress(userAddress: UserAddress): Promise<void>;
  getUserAddressById(id: number): Promise<UserAddress | null>;
  getUserAddresses(): Promise<UserAddress[]>;
  getUserAddressByUserId(userId: number): Promise<UserAddress | null>;
  updateUserAddress(id: number, userAddress: UserAddress): Promise<void>;
  deleteUserAddress(id: number): Promise<void>;
}