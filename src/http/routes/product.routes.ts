import type { FastifyInstance } from "fastify";
import type { ProductController } from "../controllers/ProductController";

export const productRoutes =
  (productController: ProductController) => (server: FastifyInstance) => {
    server.post("/", productController.createProduct.bind(productController));
    server.get("/", productController.getProducts.bind(productController));
    server.get("/:id", productController.getProductById.bind(productController));
    server.put("/:id", productController.updateProduct.bind(productController));
    server.delete(
      "/:id",
      productController.deleteProduct.bind(productController),
    );
  };
