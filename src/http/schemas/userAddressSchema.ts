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

export {
  createUserAddressSchema,
  userAddressResponseSchema,
  userAddressParamsSchema,
  updateUserAddressSchema,
};
