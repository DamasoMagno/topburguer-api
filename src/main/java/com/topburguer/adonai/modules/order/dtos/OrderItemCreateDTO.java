package com.topburguer.adonai.modules.order.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record OrderItemCreateDTO(
        @NotNull @Min(1) Integer quantity,
        @NotNull Long productId,
        @NotNull Long orderId,
        @NotNull Long userId
) {
}
