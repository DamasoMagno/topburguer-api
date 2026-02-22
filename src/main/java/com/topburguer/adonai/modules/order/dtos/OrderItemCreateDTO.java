package com.topburguer.adonai.modules.order.dtos;

import jakarta.validation.constraints.NotNull;

public record OrderItemCreateDTO(
        @NotNull int quantity,
        @NotNull Long productId,
        @NotNull Long orderId,
        @NotNull Long userId
) {
}
