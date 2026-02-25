package com.topburguer.adonai.services;

import com.topburguer.adonai.modules.category.repositories.CategoryRepository;
import com.topburguer.adonai.modules.category.services.impl.CategoryServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class CreateCategoryTest {
    @Mock
    private CategoryRepository productService;

    @InjectMocks
    private CategoryServiceImpl service;

    @Test
    public void shouldCreateProduct() {
        service.createCategory("Burger");

        verify(productService, times(1)).save(any());
    }

    @Test
    public void shouldNotCreateProductWithEmptyName() {
        assertThrows(
                IllegalArgumentException.class,
                () -> service.createCategory("")
        );

        verify(productService, times(0)).save(any());
    }

    @Test
    public void shouldNotCreateProductWithNullName() {
        assertThrows(
                IllegalArgumentException.class,
                () ->  service.createCategory(null)
        );

        verify(productService, times(0)).save(any());
    }
}
