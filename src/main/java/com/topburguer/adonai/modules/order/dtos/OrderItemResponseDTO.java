package com.topburguer.adonai.modules.order.dtos;

import com.topburguer.adonai.entities.OrderItem;
import com.topburguer.adonai.entities.Product;
import com.topburguer.adonai.modules.product.dtos.ProductResponseDTO;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record OrderItemResponseDTO(
        Integer quantity,
        ProductResponseDTO product
) {
        public OrderItemResponseDTO(OrderItem orderItem) {
            this(
                    orderItem.getQuantity(),
                    orderItem.getProduct() != null ?
                            new ProductResponseDTO(orderItem.getProduct()) :
                            null
            );
        }
}
