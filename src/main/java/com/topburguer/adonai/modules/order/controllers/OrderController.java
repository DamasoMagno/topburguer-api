package com.topburguer.adonai.modules.order.controllers;
import com.topburguer.adonai.modules.order.dtos.OrderItemCreateDTO;
import com.topburguer.adonai.modules.order.dtos.OrderItemResponseDTO;
import com.topburguer.adonai.modules.order.dtos.OrderResponseDTO;
import com.topburguer.adonai.modules.order.repositories.OrderRepository;
import com.topburguer.adonai.modules.order.services.OrderService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/order")
public class OrderController {
    private final OrderService orderService;

    public OrderController(
        OrderService orderService
    ) {
        this.orderService = orderService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<OrderResponseDTO>> listOrders(
            @PathVariable("userId") Long userId
    ) {
        List<OrderResponseDTO> order = this.orderService.findAll(userId);
        return ResponseEntity.ok(order);
    }

    @PostMapping
    public ResponseEntity<Void> createOrder(
            @Valid @RequestBody OrderItemCreateDTO orderItem
    ) {
        this.orderService.create(orderItem);
        return ResponseEntity.noContent().build();
    }

}
