package com.topburguer.adonai.modules.product.dtos;

import jakarta.validation.constraints.NotNull;

public record ProductUpdateDTO(
        String name,
        double price,
        Long categoryId,
        String description
) {
}
