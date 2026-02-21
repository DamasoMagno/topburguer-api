package com.topburguer.adonai.modules.order.services.impl;

import com.topburguer.adonai.entities.Category;
import com.topburguer.adonai.entities.Product;
import com.topburguer.adonai.modules.category.repositories.CategoryRepository;
import com.topburguer.adonai.modules.order.dtos.OrderCreateDTO;
import com.topburguer.adonai.modules.order.dtos.OrderResponseDTO;
import com.topburguer.adonai.modules.order.repositories.OrderRepository;
import com.topburguer.adonai.modules.order.services.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {}
