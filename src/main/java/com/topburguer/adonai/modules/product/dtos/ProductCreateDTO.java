package com.topburguer.adonai.modules.product.dtos;

import jakarta.validation.constraints.NotNull;

public record ProductCreateDTO(
        @NotNull String name,
        @NotNull double price,
        @NotNull  Long categoryId,
        String description
) {
}
