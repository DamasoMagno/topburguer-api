package com.topburguer.adonai.modules.order.dtos;

import com.topburguer.adonai.entities.Order;

import java.util.Set;

public record OrderResponseDTO(
        Long userId,
        Set<OrderItemResponseDTO> items
) {
    public OrderResponseDTO(Order order) {
        this(
                order.getUser().getId(),
                order.getOrderItems().stream()
                        .map(OrderItemResponseDTO::new)
                        .collect(java.util.stream.Collectors.toSet())
        );
    }
}
