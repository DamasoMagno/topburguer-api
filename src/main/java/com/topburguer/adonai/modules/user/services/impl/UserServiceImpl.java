package com.topburguer.adonai.modules.user.services.impl;

import com.topburguer.adonai.entities.User;
import com.topburguer.adonai.entities.enums.Role;
import com.topburguer.adonai.modules.user.dtos.UserCreateDTO;
import com.topburguer.adonai.modules.user.dtos.UserResponseDTO;
import com.topburguer.adonai.modules.user.dtos.UserUpdateDTO;
import com.topburguer.adonai.modules.user.repositories.UserAddressRepository;
import com.topburguer.adonai.modules.user.repositories.UserRepository;
import com.topburguer.adonai.modules.user.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    public UserServiceImpl(
            UserRepository userRepository,
            UserAddressRepository userAddressRepository
    ) {
        this.userRepository = userRepository;
    }

    @Transactional
    @Override
    public void createUser(UserCreateDTO userDTO) {
        User user = new User();
        user.setName(userDTO.name());
        user.setEmail(userDTO.email());
        user.setRole(Role.ROLE_USER);

        this.userRepository.save(user);
    }

    @Transactional
    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    public void updateUser(Long userId, UserUpdateDTO userDTO) {
        User category = this.userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("Usuário não encontrado")
        );

        this.updateUser(userDTO, category);
        this.userRepository.save(category);
    }

    @Transactional(readOnly = true)
    @Override
    public List<UserResponseDTO> users() {
        return this.userRepository.findAll().stream()
                .map(UserResponseDTO::new).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public UserResponseDTO getUser(Long userId) {
        User user = this.userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("Usuário não encontrado")
        );

        return new UserResponseDTO(user);
    }

    private void updateUser(UserUpdateDTO userDTO, User user) {
        if(userDTO.email() != null) {
            user.setEmail(userDTO.email());
        }

        if(userDTO.name() != null) {
            user.setName(userDTO.name());
        }
    }
}
