package com.topburguer.adonai.modules.user.dtos;

import jakarta.validation.constraints.NotNull;

public record UserAddressUpdateDTO(
        String address,
        String complement
) {}

