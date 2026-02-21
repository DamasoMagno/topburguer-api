package com.topburguer.adonai.modules.user.controllers;

import com.topburguer.adonai.modules.user.dtos.UserAddressCreateDTO;
import com.topburguer.adonai.modules.user.dtos.UserAddressResponseDTO;
import com.topburguer.adonai.modules.user.dtos.UserAddressUpdateDTO;
import com.topburguer.adonai.modules.user.services.UserAddressService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user_address")
public class UserAddressController {
    private final UserAddressService userAddressService;

    public UserAddressController(UserAddressService userAddressService) {
        this.userAddressService = userAddressService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<UserAddressResponseDTO>> getAddresses(
            @PathVariable("userId") Long userId
    ) {
        List<UserAddressResponseDTO> categories = this.userAddressService.listAdresses(userId);
        return ResponseEntity.ok(categories);
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<String> deleteAddress(@PathVariable("addressId") Long addressId) {
        try {
            this.userAddressService.deleteAddress(addressId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{addressId}")
    public ResponseEntity<String> getAddress(@PathVariable("addressId") Long addressId) {
        try {
            this.userAddressService.getAddress(addressId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{addressId}")
    public ResponseEntity<Void> updateProduct(
            @PathVariable("addressId") Long addressId,
            @RequestBody @Valid UserAddressUpdateDTO userAddressDTO
    ) {
        this.userAddressService.updateAddress(
                addressId,
                userAddressDTO
        );
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<String> createAddress(
            @RequestBody @Valid UserAddressCreateDTO productDTO
    ) {
        try {
            userAddressService.createAddress(productDTO);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
