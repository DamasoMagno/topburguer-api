package com.topburguer.adonai.modules.order.repositories;

import com.topburguer.adonai.entities.Order;
import com.topburguer.adonai.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {}

