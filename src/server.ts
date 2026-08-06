import fastify from "fastify";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";

import { env } from "./infrastructure/config/env";
import { createContainer } from "./infrastructure/di/container";
import { categoryRoutes } from "./http/routes/category.routes";
import { productRoutes } from "./http/routes/product.routes";
import { orderRoutes } from "./http/routes/order.routes";
import { userAddressRoutes } from "./http/routes/user-address.routes";

const server = fastify();
const container = createContainer();

server.register(jwt, {
  secret: env.JWT_SECRET ?? "dev-secret",
});

server.register(cors, {
  origin: "*",
  credentials: true,
});

server.register(swagger, {
  swagger: {
    info: { title: "Adonai API", version: "1.0.0" },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      { name: "category", description: "Category related routes" },
      { name: "product", description: "Product related routes" },
      { name: "order", description: "Order related routes" },
      { name: "user-address", description: "User address related routes" },
    ],
    securityDefinitions: {
      Authorization: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "JWT Authorization header using the Bearer scheme",
      },
    },
  },
});

server.register(categoryRoutes(container.categoryController), {
  prefix: "/category",
});
server.register(productRoutes(container.productController), {
  prefix: "/product",
});
server.register(orderRoutes(container.orderController), {
  prefix: "/order",
});
server.register(userAddressRoutes(container.userAddressController), {
  prefix: "/user-address",
});

async function bootstrap() {
  await container.cache.connect();

  server.listen({ port: 3000 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server is running on ${address}`);
  });
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
