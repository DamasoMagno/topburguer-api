import fastify from "fastify";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";

import { productRoutes } from "./routes/product.routes";
import { categoryRoutes } from "./routes/category.routes";
const server = fastify();

server.register(jwt, {
  secret: process.env.JWT_SECRET!,
});

server.register(cors, {
  origin: "*",
  credentials: true,
});

server.register(swagger, {
  swagger: {
    info: { title: "API", version: "1.0.0" },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      { name: "category", description: "Category related routes" },
      { name: "product", description: "Product related routes" },
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

server.register(categoryRoutes, { prefix: "/category" });
server.register(productRoutes, { prefix: "/product" });

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server is running on ${address}`);
});
