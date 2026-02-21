package com.topburguer.adonai.modules.user.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UserUpdateDTO(
        String name,
        @Email String email,
        @Min(value = 6) String password
) {}


