package com.topburguer.adonai.modules.product.dtos;

import com.topburguer.adonai.entities.Product;

public record ProductResponseDTO(
        String name,
        double price,
        String description,
        Long categoryId
) {
    public ProductResponseDTO(Product product) {
        this(
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                product.getCategory().getId()
        );
    }
}
