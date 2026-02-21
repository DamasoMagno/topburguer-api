package com.topburguer.adonai.modules.category.controllers;

import com.topburguer.adonai.modules.category.dtos.CategoryCreateDTO;
import com.topburguer.adonai.modules.category.dtos.CategoryResponseDTO;
import com.topburguer.adonai.modules.category.services.CategoryService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> listCategories() {
        List<CategoryResponseDTO> categories = categoryService.listCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{categoryId}")
    public  ResponseEntity<CategoryResponseDTO> getCategory(
            @PathVariable("categoryId") Long categoryId
    ){
        CategoryResponseDTO category = this.categoryService.getCategory(categoryId);
        return  ResponseEntity.ok(category);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(
            @PathVariable("categoryId") Long categoryId
    ) {
        this.categoryService.deleteCategory(categoryId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{categoryId}")
    public ResponseEntity<Void> updateCategory(
            @PathVariable("categoryId") Long categoryId,
            @RequestBody @Valid CategoryCreateDTO category
    ){
        this.categoryService.updateCategory(categoryId, category.name());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/")
    public ResponseEntity<Void> createCategory(
            @RequestBody CategoryCreateDTO category
    ) {
        this.categoryService.createCategory(category.name());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
