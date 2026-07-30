import type { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/ProductController";
import { ProductService } from "../services/ProductService";
import { DrizzleProductRepository } from "../repository/drizzle/DrizzleProductRepository";
import { S3Service } from "../services/S3Service";
import { s3Client } from "../lib/s3";
import { db } from "../database";
import { Redis } from "../lib/redis";

const redis = new Redis();
const s3Service = new S3Service(s3Client);
const productService = new ProductService(
  new DrizzleProductRepository(db),
  s3Service,
  redis,
);
const productController = new ProductController(productService);

export const productRoutes = (server: FastifyInstance) => {
  server.post("/", productController.createProduct.bind(productController));
  server.get("/", productController.getProducts);
  server.get("/:id", productController.getProductById);
  server.put("/:id", productController.updateProduct);
  server.delete("/:id", productController.deleteProduct);
};
