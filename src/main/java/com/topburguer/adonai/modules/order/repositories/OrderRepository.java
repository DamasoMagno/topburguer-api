package com.topburguer.adonai.modules.order.repositories;

import com.topburguer.adonai.entities.Order;
import com.topburguer.adonai.entities.Product;
import com.topburguer.adonai.entities.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByUserIdAndStatus(Long userId, OrderStatus status);
    List<Order> findAllByUserId(Long userId);
}

