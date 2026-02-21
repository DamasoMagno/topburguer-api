package com.topburguer.adonai.modules.user.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UserCreateDTO(
        @NotNull  String name,
        @NotNull @Email String email,
        @NotNull @Min(value = 6) String password
) {}


