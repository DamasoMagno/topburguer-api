package com.topburguer.adonai.modules.user.dtos;

import com.topburguer.adonai.entities.Category;
import com.topburguer.adonai.entities.UserAddress;
import com.topburguer.adonai.modules.product.dtos.ProductResponseDTO;

import java.util.Set;

public record UserAddressResponseDTO(
        String address,
        String complement
) {
    public UserAddressResponseDTO (UserAddress userAddress) {
        this(
                userAddress.getAddress(),
                userAddress.getComplement()
        );
    }
}

