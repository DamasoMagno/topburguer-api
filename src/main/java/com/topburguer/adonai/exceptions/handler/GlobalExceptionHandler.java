package com.topburguer.adonai.exceptions.handler;

import com.topburguer.adonai.exceptions.NotFoundException;
import com.topburguer.adonai.exceptions.dto.ErrorResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleNotFoundException(NotFoundException notFound) {
        ErrorResponseDTO errorResponse = new ErrorResponseDTO(notFound.getMessage(), 404);
        return ResponseEntity.status(404).body(errorResponse);
    }
}
