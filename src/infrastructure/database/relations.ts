import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  users: {
    adminProfile: r.one.adminProfiles({
      from: r.users.id,
      to: r.adminProfiles.userId,
    }),
    userProfile: r.one.userProfiles({
      from: r.users.id,
      to: r.userProfiles.userId,
    }),
  },

  adminProfiles: {
    user: r.one.users({
      from: r.adminProfiles.userId,
      to: r.users.id,
    }),
  },

  userProfiles: {
    user: r.one.users({
      from: r.userProfiles.userId,
      to: r.users.id,
    }),
    addresses: r.many.userAddresses(),
    orders: r.many.orders(),
  },

  userAddresses: {
    userProfile: r.one.userProfiles({
      from: r.userAddresses.userProfileId,
      to: r.userProfiles.id,
    }),
  },

  categories: {
    products: r.many.products(),
  },

  products: {
    category: r.one.categories({
      from: r.products.categoryId,
      to: r.categories.id,
    }),
    images: r.many.images(),
    orderItems: r.many.orderItems(),
  },

  images: {
    product: r.one.products({
      from: r.images.productId,
      to: r.products.id,
    }),
  },

  orders: {
    userProfile: r.one.userProfiles({
      from: r.orders.userProfileId,
      to: r.userProfiles.id,
    }),
    orderItems: r.many.orderItems(),
  },

  orderItems: {
    order: r.one.orders({
      from: r.orderItems.orderId,
      to: r.orders.id,
    }),
    product: r.one.products({
      from: r.orderItems.productId,
      to: r.products.id,
    }),
  },
}));