package com.topburguer.adonai.modules.user.controllers;

import com.topburguer.adonai.modules.user.dtos.UserCreateDTO;
import com.topburguer.adonai.modules.user.dtos.UserResponseDTO;
import com.topburguer.adonai.modules.user.dtos.UserUpdateDTO;
import com.topburguer.adonai.modules.user.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getProducts() {
        List<UserResponseDTO> categories = this.userService.users();
        return ResponseEntity.ok(categories);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteProduct(@PathVariable("userId") Long userId) {
        try {
            this.userService.deleteUser(userId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<String> getProduct(@PathVariable("userId") Long userId) {
        try {
            this.userService.getUser(userId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<Void> updateProduct(
            @PathVariable("userId") Long userId,
            @RequestBody @Valid UserUpdateDTO product
    ) {
        this.userService.updateUser(
                userId,
                product
        );
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<String> createUser(
            @RequestBody @Valid UserCreateDTO productDTO
    ) {
        try {
            userService.createUser(productDTO);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
