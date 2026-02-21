package com.topburguer.adonai.modules.category.services;

import com.topburguer.adonai.modules.category.dtos.CategoryResponseDTO;

import java.util.List;

public interface CategoryService {
    void createCategory(String name);
    void deleteCategory(Long categoryId);
    void updateCategory(Long categoryId, String name);
    List<CategoryResponseDTO> listCategories();
    CategoryResponseDTO getCategory(Long categoryId);
}

