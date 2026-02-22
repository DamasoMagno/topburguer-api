package com.topburguer.adonai.modules.order.services.impl;

import com.topburguer.adonai.entities.*;
import com.topburguer.adonai.exceptions.NotFoundException;
import com.topburguer.adonai.modules.category.repositories.CategoryRepository;
import com.topburguer.adonai.modules.order.dtos.OrderCreateDTO;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CategoryRepository categoryRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    public OrderServiceImpl(
            OrderRepository orderRepository,
            CategoryRepository categoryRepository,
            OrderItemRepository orderItemRepository,
            UserRepository userRepository,
            ProductRepository productRepository
    ) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void create(OrderItemCreateDTO orderCreateDTO) {
        User user = userRepository.findById(orderCreateDTO.userId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        
        Product product = productRepository.findById(orderCreateDTO.productId())
                .orElseThrow(() -> new NotFoundException("Product not found"));

        Order order = new Order();
        order.setUser(user);

        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setQuantity(orderCreateDTO.quantity());
        orderItem.setProduct(product);

        this.orderRepository.save(order);
        this.orderItemRepository.save(orderItem);
        logger.info("Order created with id: {}", order.getId());
    }

    @Override
    public List<OrderResponseDTO> findAll() {
        return List.of();
    }

    @Override
    public OrderResponseDTO findById(Long id) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }
}
