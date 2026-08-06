import { z } from "zod";

const createUserAddressSchema = z.object({
  userId: z.number(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
});

const userAddressResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
});

const userAddressParamsSchema = z.object({
  id: z.number(),
});

const updateUserAddressSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
});

type UserAddressParams = z.infer<typeof userAddressParamsSchema>;
type UpdateUserAddress = z.infer<typeof updateUserAddressSchema>;
type CreateUserAddress = z.infer<typeof createUserAddressSchema>;
type UserAddressResponse = z.infer<typeof userAddressResponseSchema>;

export {
  createUserAddressSchema,
  type CreateUserAddress,
  userAddressResponseSchema,
  type UserAddressResponse,
  userAddressParamsSchema,
  type UserAddressParams,
  updateUserAddressSchema,
  type UpdateUserAddress,
};
