package com.topburguer.adonai.modules.category.services.impl;

import com.topburguer.adonai.entities.Category;
import com.topburguer.adonai.modules.category.dtos.CategoryResponseDTO;
import com.topburguer.adonai.modules.category.repositories.CategoryRepository;
import com.topburguer.adonai.modules.category.services.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final Logger logger = LoggerFactory.getLogger(CategoryServiceImpl.class);

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryResponseDTO getCategory(Long categoryId) {
        Category category = this.categoryRepository.findById(categoryId).orElseThrow(
                () -> new IllegalArgumentException("categoria não encontrada")
        );

        return new CategoryResponseDTO(category);
    }

    @Override
    public void createCategory(String name) {
        Category categoryExists = categoryRepository.findByName(name);
        if (categoryExists != null) {
            logger.warn("Categoria já existe: {}", name);
            throw new IllegalArgumentException("Categoria já existe");
        }

        if(name == null || name.trim().isEmpty()) {
            logger.warn("Nome da categoria é inválido: '{}'", name);
            throw new IllegalArgumentException("Nome da categoria é obrigatório");
        }

        Category categoryDTO = new Category();
        categoryDTO.setName(name);

        this.categoryRepository.save(categoryDTO);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        this.categoryRepository.deleteById(categoryId);
    }

    @Override
    public void updateCategory(Long categoryId, String name) {
        Category category = this.categoryRepository.findById(categoryId).orElseThrow(
                () -> new IllegalArgumentException("Categoria não encontrada")
        );

        if(name != null){
            category.setName(name);
        }

        this.categoryRepository.save(category);
    }

    @Override
    public List<CategoryResponseDTO> listCategories() {
        return this.categoryRepository.findAll()
                .stream()
                .map(CategoryResponseDTO::new).toList();
    }
}
