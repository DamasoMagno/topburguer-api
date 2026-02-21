package com.topburguer.adonai.modules.user.services;

import com.topburguer.adonai.modules.user.dtos.UserAddressCreateDTO;
import com.topburguer.adonai.modules.user.dtos.UserAddressResponseDTO;
import com.topburguer.adonai.modules.user.dtos.UserAddressUpdateDTO;

import java.util.List;

public interface UserAddressService {
    void createAddress(UserAddressCreateDTO user);
    void updateAddress(Long addressId, UserAddressUpdateDTO user);
    void deleteAddress(Long addressId);
    List<UserAddressResponseDTO> listAdresses(Long addressId);
    UserAddressResponseDTO getAddress(Long addressId);
}

