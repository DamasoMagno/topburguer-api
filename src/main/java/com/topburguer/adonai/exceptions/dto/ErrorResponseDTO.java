package com.topburguer.adonai.exceptions.dto;

public record ErrorResponseDTO(
        String message,
        int status
) {
}
