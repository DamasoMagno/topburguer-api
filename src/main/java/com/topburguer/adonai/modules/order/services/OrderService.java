package com.topburguer.adonai.modules.order.services;

import com.topburguer.adonai.entities.Order;
import com.topburguer.adonai.modules.order.dtos.OrderItemCreateDTO;
import com.topburguer.adonai.modules.order.dtos.OrderResponseDTO;

import java.util.List;

public interface OrderService {
    void create(OrderItemCreateDTO orderItemDTO);
    List<OrderResponseDTO> findAll(Long userId);
    OrderResponseDTO findById(Long id);
    void deleteById(Long id);
}
