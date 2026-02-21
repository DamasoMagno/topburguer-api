package com.topburguer.adonai.modules.user.dtos;

import com.topburguer.adonai.entities.Category;
import com.topburguer.adonai.entities.User;
import com.topburguer.adonai.modules.product.dtos.ProductResponseDTO;

import java.util.Set;

public record UserResponseDTO(
        String name,
        String email,
        Long id,
        String role,
        Set<UserAddressResponseDTO> addresses
) {
    public UserResponseDTO(User user) {
        this(
                user.getName(),
                user.getEmail(),
                user.getId(),
                user.getRole().name(),
                user.getAddresses().stream().map(UserAddressResponseDTO::new)
                        .collect(java.util.stream.Collectors.toSet())
        );
    }
}