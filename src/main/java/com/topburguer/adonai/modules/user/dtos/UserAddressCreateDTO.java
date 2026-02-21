package com.topburguer.adonai.modules.user.dtos;

import jakarta.validation.constraints.NotNull;

public record UserAddressCreateDTO(
        @NotNull Long userId,
        @NotNull String address,
        String complement
) {}

