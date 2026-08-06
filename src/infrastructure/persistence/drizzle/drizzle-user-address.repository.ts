import { eq } from "drizzle-orm";
import type { UserAddressRepository } from "../../../application/ports/outbound/user-address.repository";
import type {
  CreateUserAddressInput,
  UpdateUserAddressInput,
  UserAddress,
} from "../../../domain/user-address/user-address";
import type { Database } from "../../database";
import { userAddresses } from "../../database/schema";

export class DrizzleUserAddressRepository implements UserAddressRepository {
  constructor(private readonly database: Database) {}

  async createUserAddress(userAddress: CreateUserAddressInput) {
    await this.database.insert(userAddresses).values({
      address: userAddress.address,
      city: userAddress.city,
      state: userAddress.state,
      zip: userAddress.zip,
      country: userAddress.country,
      userProfileId: userAddress.userId,
    });
  }

  async getUserAddressById(id: number): Promise<UserAddress | null> {
    const userAddress = await this.database.query.userAddresses.findFirst({
      where: { id },
      with: { userProfile: true },
    });

    if (!userAddress?.userProfile) return null;

    return {
      id: userAddress.id,
      userId: userAddress.userProfile.id,
      address: userAddress.address,
      city: userAddress.city,
      state: userAddress.state,
      zip: userAddress.zip,
      country: userAddress.country,
    };
  }

  async getUserAddresses(): Promise<UserAddress[]> {
    const userAddressesResult =
      await this.database.query.userAddresses.findMany();

    return userAddressesResult.map((userAddress) => ({
      id: userAddress.id,
      userId: userAddress.userProfileId ?? 0,
      address: userAddress.address,
      city: userAddress.city,
      state: userAddress.state,
      zip: userAddress.zip,
      country: userAddress.country,
    }));
  }

  async getUserAddressByUserId(
    userId: number,
  ): Promise<UserAddress | null> {
    const userAddress = await this.database.query.userAddresses.findFirst({
      where: { userProfileId: userId },
      with: { userProfile: true },
    });

    if (!userAddress) return null;

    return {
      id: userAddress.id,
      userId: userAddress.userProfile?.id ?? 0,
      address: userAddress.address,
      city: userAddress.city,
      state: userAddress.state,
      zip: userAddress.zip,
      country: userAddress.country,
    };
  }

  async updateUserAddress(id: number, userAddress: UpdateUserAddressInput) {
    await this.database
      .update(userAddresses)
      .set({
        address: userAddress.address,
        city: userAddress.city,
        state: userAddress.state,
        zip: userAddress.zip,
        country: userAddress.country,
      })
      .where(eq(userAddresses.id, id));
  }

  async deleteUserAddress(id: number) {
    await this.database.delete(userAddresses).where(eq(userAddresses.id, id));
  }
}
