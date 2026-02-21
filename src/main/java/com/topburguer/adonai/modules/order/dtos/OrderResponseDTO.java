package com.topburguer.adonai.modules.order.dtos;

import com.topburguer.adonai.entities.Product;

public record OrderResponseDTO(
        String name,
        double price,
        String description,
        Long categoryId
) {
    public OrderResponseDTO(Product product) {
        this(
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                product.getCategory().getId()
        );
    }
}
