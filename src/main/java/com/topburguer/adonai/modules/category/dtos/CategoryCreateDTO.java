package com.topburguer.adonai.modules.category.dtos;

import jakarta.validation.constraints.NotNull;

public record CategoryCreateDTO(
        @NotNull String name
) {}

