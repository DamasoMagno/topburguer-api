package com.topburguer.adonai.modules.product.controllers;

import com.topburguer.adonai.modules.product.dtos.ProductCreateDTO;
import com.topburguer.adonai.modules.product.dtos.ProductResponseDTO;
import com.topburguer.adonai.modules.product.dtos.ProductUpdateDTO;
import com.topburguer.adonai.modules.product.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getProducts() {
        List<ProductResponseDTO> categories = productService.listProducts();
        return ResponseEntity.ok(categories);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("productId") Long productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponseDTO> getProduct(@PathVariable("productId") Long productId) {
        ProductResponseDTO product = productService.getProductById(productId);
        return ResponseEntity.ok(product);
    }

    @PatchMapping("/{productId}")
    public ResponseEntity<Void> updateProduct(
            @PathVariable("productId") Long productId,
            @RequestBody @Valid ProductUpdateDTO product
    ) {
        this.productService.updateProduct(productId, product);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Void> createProduct(
            @RequestBody @Valid ProductCreateDTO productDTO
    ) {
        productService.createProduct(productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
