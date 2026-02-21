package com.topburguer.adonai.modules.category.dtos;

import com.topburguer.adonai.entities.Category;
import com.topburguer.adonai.modules.product.dtos.ProductResponseDTO;

import java.util.Set;

public record CategoryResponseDTO(
        String name,
        Set<ProductResponseDTO> products
) {
    public CategoryResponseDTO(Category category){
        this(
                category.getName(),
                category.getProducts().stream().map(ProductResponseDTO::new).collect(java.util.stream.Collectors.toSet())
        );
    }
}
