import { CategoryService } from "../../application/use-cases/category/category.service";
import { ProductService } from "../../application/use-cases/product/product.service";
import { OrderService } from "../../application/use-cases/order/order.service";
import { UserAddressService } from "../../application/use-cases/user-address/user-address.service";
import { CategoryController } from "../../http/controllers/CategoryController";
import { ProductController } from "../../http/controllers/ProductController";
import { OrderController } from "../../http/controllers/OrderController";
import { UserAddressController } from "../../http/controllers/UserAddressController";
import { RedisCache } from "../cache/redis.cache";
import { db } from "../database";
import { DrizzleCategoryRepository } from "../persistence/drizzle/drizzle-category.repository";
import { DrizzleProductRepository } from "../persistence/drizzle/drizzle-product.repository";
import { DrizzleOrderRepository } from "../persistence/drizzle/drizzle-order.repository";
import { DrizzleUserAddressRepository } from "../persistence/drizzle/drizzle-user-address.repository";
import { s3Client } from "../storage/s3.client";
import { S3FileStorage } from "../storage/s3.file-storage";

export function createContainer() {
  const cache = new RedisCache();
  const fileStorage = new S3FileStorage(s3Client);

  const categoryRepository = new DrizzleCategoryRepository(db);
  const productRepository = new DrizzleProductRepository(db);
  const orderRepository = new DrizzleOrderRepository(db);
  const userAddressRepository = new DrizzleUserAddressRepository(db);

  const categoryService = new CategoryService(categoryRepository);
  const productService = new ProductService(
    productRepository,
    fileStorage,
    cache,
  );
  const orderService = new OrderService(orderRepository);
  const userAddressService = new UserAddressService(userAddressRepository);

  return {
    cache,
    categoryController: new CategoryController(categoryService),
    productController: new ProductController(productService),
    orderController: new OrderController(orderService),
    userAddressController: new UserAddressController(userAddressService),
  };
}

export type AppContainer = ReturnType<typeof createContainer>;
