package com.topburguer.adonai.modules.order.services.impl;

import com.topburguer.adonai.entities.*;
import com.topburguer.adonai.entities.enums.OrderStatus;
import com.topburguer.adonai.exceptions.NotFoundException;
import com.topburguer.adonai.modules.order.dtos.OrderItemCreateDTO;
import com.topburguer.adonai.modules.order.dtos.OrderResponseDTO;
import com.topburguer.adonai.modules.order.repositories.OrderItemRepository;
import com.topburguer.adonai.modules.order.repositories.OrderRepository;
import com.topburguer.adonai.modules.order.services.OrderService;
import com.topburguer.adonai.modules.product.repositories.ProductRepository;
import com.topburguer.adonai.modules.user.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    public OrderServiceImpl(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            UserRepository userRepository,
            ProductRepository productRepository
    ) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void create(OrderItemCreateDTO orderCreateDTO) {
        User user = userRepository.findById(orderCreateDTO.userId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        Product product = productRepository.findById(orderCreateDTO.productId())
                .orElseThrow(() -> new NotFoundException("Product not found"));
        Order order = orderRepository.findByUserIdAndStatus(orderCreateDTO.userId(), OrderStatus.CART)
                .orElseGet(
                        () -> {
                            Order newOrder = new Order();
                            newOrder.setUser(user);
                            return orderRepository.save(newOrder);
                        }
                );


        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setQuantity(orderCreateDTO.quantity());
        orderItem.setProduct(product);

        this.orderItemRepository.save(orderItem);
        logger.info("Order created with id: {}", order.getId());
    }

    @Override
    public List<OrderResponseDTO> findAll(Long userId) {
        return this.orderRepository.findAllByUserId(userId).stream().map(
                OrderResponseDTO::new
        ).toList();
    }

    @Override
    public OrderResponseDTO findById(Long id) {
        Order order = this.orderRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Order not found")
        );

        return new OrderResponseDTO(order);
    }

    @Override
    public void updateStatus(Long id, OrderStatus status) {
        Order order = this.orderRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Order not found")
        );

        try {
            order.setStatus(status);
            this.orderRepository.save(order);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid order status: " + status);
        }
    }

    @Override
    public void updateOrderItemsQuantity(Long orderId, Integer quantity) {
        OrderItem orderItem = this.orderItemRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Orderitem not found"));

        if(quantity <= 0){
            this.orderItemRepository.delete(orderItem);
            return;
        }

        orderItem.setQuantity(quantity);
        this.orderItemRepository.save(orderItem);
    }

    @Override
    public void deleteById(Long id) {
        Order order = this.orderRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Order not found")
        );

        this.orderRepository.delete(order);
    }

    @Override
    public void checkout(Long cartId) {
        Order order = this.orderRepository.findById(cartId).orElseThrow(
                () -> new NotFoundException("Order not found")
        );

        if(order.getStatus() != OrderStatus.CART){
            throw new IllegalStateException("Only orders with status CART can be checked out");
        }

        order.setStatus(OrderStatus.PENDING);
        this.orderRepository.save(order);
    }

    @Override
    public void deleteOrderItemById(Long id) {
        OrderItem orderItem = this.orderItemRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Orderitem not found"));

        this.orderItemRepository.delete(orderItem);
    }
}
