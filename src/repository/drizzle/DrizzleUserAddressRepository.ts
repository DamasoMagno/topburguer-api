import { userAddresses } from "../../database/schema";
import { db } from "../../database";
import { eq } from "drizzle-orm";
import type { IUserAddressRepository } from "../IUserAddressRepository";
import type { UserAddress } from "../../http/controllers/UserAddress";

export class DrizzleUserAddressRepository implements IUserAddressRepository {
  constructor(private readonly database: typeof db) {}

  async createUserAddress(userAddress: UserAddress) {
    await this.database.insert(userAddresses).values({
      address: userAddress.address,
      city: userAddress.city,
      state: userAddress.state,
      zip: userAddress.zip,
      country: userAddress.country,
      userId: userAddress.userId,
    });
  }

  async getUserAddressById(id: number): Promise<UserAddress | null> {
    const userAddress = await this.database
      .select()
      .from(userAddresses)
      .where(eq(userAddresses.id, id));

    if (!userAddress[0]) return null;
    return {
      userId: userAddress[0].userId ?? 0,
      address: userAddress[0].address,
      city: userAddress[0].city ?? "",
      state: userAddress[0].state ?? "",
      zip: userAddress[0].zip ?? "",
      country: userAddress[0].country ?? "",
    };
  }

  async getUserAddresses(): Promise<UserAddress[]> {
    const userAddressesResult =
      await this.database.query.userAddresses.findMany();

    return userAddressesResult.map((userAddress) => ({
      userId: userAddress.userId ?? 0,
      address: userAddress.address,
      city: userAddress.city ?? "",
      state: userAddress.state ?? "",
      zip: userAddress.zip ?? "",
      country: userAddress.country ?? "",
    }));
  }

  async getUserAddressByUserId(userId: number): Promise<UserAddress | null> {
    const userAddress = await this.database
      .select()
      .from(userAddresses)
      .where(eq(userAddresses.userId, userId));

    if (!userAddress[0]) return null;
    return {
      userId: userAddress[0].userId ?? 0,
      address: userAddress[0].address,
      city: userAddress[0].city,
      state: userAddress[0].state ?? "",
      zip: userAddress[0].zip ?? "",
      country: userAddress[0].country ?? "",
    };
  }

  async updateUserAddress(id: number, userAddress: UserAddress) {
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
