package com.topburguer.adonai.modules.user.services.impl;

import com.topburguer.adonai.entities.User;
import com.topburguer.adonai.entities.UserAddress;
import com.topburguer.adonai.modules.user.dtos.UserAddressCreateDTO;
import com.topburguer.adonai.modules.user.dtos.UserAddressResponseDTO;
import com.topburguer.adonai.modules.user.dtos.UserAddressUpdateDTO;
import com.topburguer.adonai.modules.user.repositories.UserAddressRepository;
import com.topburguer.adonai.modules.user.repositories.UserRepository;
import com.topburguer.adonai.modules.user.services.UserAddressService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserAddressServiceImpl implements UserAddressService {
    private final UserRepository userRepository;
    private final UserAddressRepository userAddressRepository;
    private final Logger logger = LoggerFactory.getLogger(UserAddressServiceImpl.class);

    public UserAddressServiceImpl(
            UserRepository userRepository,
            UserAddressRepository userAddressRepository
    ) {
        this.userRepository = userRepository;
        this.userAddressRepository = userAddressRepository;
    }


    @Transactional
    @Override
    public void createAddress(UserAddressCreateDTO address) {
        User user = this.userRepository.findById(address.userId()).orElseThrow(
                () -> new IllegalArgumentException("Usuário não encontrado")
        );

        UserAddress userAddress = new UserAddress();
        userAddress.setAddress(address.complement());
        userAddress.setComplement(address.complement());
        userAddress.setUser(user);

        this.userAddressRepository.save(userAddress);
    }

    @Transactional
    @Override
    public void deleteAddress(Long addressId) {
        this.userRepository.deleteById(addressId);
    }

    @Override
    public void updateAddress(Long userAddressId, UserAddressUpdateDTO userDTO) {
        UserAddress userAddress = this.userAddressRepository.findById(userAddressId)
                .orElseThrow(() -> new IllegalArgumentException("Endereço não encontrado"));

        this.updateUserAddress(userAddress, userDTO);
        this.userAddressRepository.save(userAddress);
    }

    @Transactional(readOnly = true)
    @Override
    public List<UserAddressResponseDTO> listAdresses(Long userId) {
        return this.userAddressRepository.findByUserId(userId).stream()
                .map(UserAddressResponseDTO::new).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public UserAddressResponseDTO getAddress(Long addressId) {
        UserAddress user = this.userAddressRepository.findById(addressId).orElseThrow(
                () -> new IllegalArgumentException("Usuário não encontrado")
        );

        return new UserAddressResponseDTO(user);
    }

    private void updateUserAddress(UserAddress userAddress, UserAddressUpdateDTO userDTO) {
        if(userDTO.address() != null) {
            userAddress.setAddress(userDTO.address());
        }

        if(userDTO.complement() != null) {
            userAddress.setComplement(userDTO.complement());
        }
    }
}
