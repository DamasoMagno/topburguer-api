package com.topburguer.adonai.modules.product.services;

import com.topburguer.adonai.modules.product.dtos.ProductCreateDTO;
import com.topburguer.adonai.modules.product.dtos.ProductResponseDTO;
import com.topburguer.adonai.modules.product.dtos.ProductUpdateDTO;

import java.util.List;

public interface ProductService {
    void createProduct(ProductCreateDTO product);
    void deleteProduct(Long productId);
    void updateProduct(Long productId, ProductUpdateDTO product);
    List<ProductResponseDTO> listProducts();
    ProductResponseDTO getProductById(Long productId);
}
