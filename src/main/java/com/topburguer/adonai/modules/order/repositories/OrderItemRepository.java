package com.topburguer.adonai.modules.order.repositories;

import com.topburguer.adonai.entities.Order;
import com.topburguer.adonai.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {}

