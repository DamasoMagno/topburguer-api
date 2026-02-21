package com.topburguer.adonai.modules.product.services.impl;

import com.topburguer.adonai.entities.Category;
import com.topburguer.adonai.entities.Product;
import com.topburguer.adonai.modules.category.repositories.CategoryRepository;
import com.topburguer.adonai.modules.product.dtos.ProductCreateDTO;
import com.topburguer.adonai.modules.product.dtos.ProductResponseDTO;
import com.topburguer.adonai.modules.product.dtos.ProductUpdateDTO;
import com.topburguer.adonai.modules.product.repositories.ProductRepository;
import com.topburguer.adonai.modules.product.services.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    public ProductServiceImpl(
            ProductRepository productRepository,
            CategoryRepository categoryRepository
    ) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    @Override
    public ProductResponseDTO getProductById(Long categoryId) {
        Product product = productRepository.findById(categoryId).orElseThrow(
                () -> new IllegalArgumentException("Produto não encontrado")
        );

        return new ProductResponseDTO(product);
    }

    @Transactional
    @Override
    public void createProduct(ProductCreateDTO productDTO) {
        Category categoryExists = this.categoryRepository.findById(productDTO.categoryId())
                .orElseThrow(
                        () -> new IllegalArgumentException("Categoria não encontrada")
                );
        Product productExists = productRepository.findByName(productDTO.name());

        if (productExists != null) {
            logger.warn("Categoria já existe: {}", categoryExists);
            throw new IllegalArgumentException("Categoria já existe");
        }

        Product product = new Product();
        product.setName(productDTO.name());
        product.setDescription(productDTO.description());
        product.setPrice(productDTO.price());
        product.setCategory(categoryExists);

        this.productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long categoryId) {
        this.productRepository.deleteById(categoryId);
    }

    @Override
    public void updateProduct(Long categoryId, ProductUpdateDTO productDTO) {
        Product product = this.productRepository.findById(categoryId).orElseThrow(
                () -> new IllegalArgumentException("Produto não encontrado")
        );

        if (productDTO.name() != null) {
            product.setName(productDTO.name());
        }

        if (productDTO.description() != null) {
            product.setDescription(productDTO.description());
        }

        if(productDTO.price() != 0){
            product.setPrice(productDTO.price());
        }

        this.productRepository.save(product);
    }

    @Override
    public List<ProductResponseDTO> listProducts() {
        return this.productRepository.findAll().stream()
                .map(ProductResponseDTO::new).toList();
    }
}
