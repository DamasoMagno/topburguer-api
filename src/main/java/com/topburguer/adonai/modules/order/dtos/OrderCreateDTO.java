package com.topburguer.adonai.modules.order.dtos;

import jakarta.validation.constraints.NotNull;

public record OrderCreateDTO(
        @NotNull String name,
        @NotNull double price,
        @NotNull  Long categoryId,
        String description
) {
}
