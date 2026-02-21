package com.topburguer.adonai.modules.user.services;

import com.topburguer.adonai.modules.user.dtos.UserCreateDTO;
import com.topburguer.adonai.modules.user.dtos.UserResponseDTO;
import com.topburguer.adonai.modules.user.dtos.UserUpdateDTO;

import java.util.List;

public interface UserService {
    void createUser(UserCreateDTO user);
    void updateUser(Long userId, UserUpdateDTO user);
    void deleteUser(Long userId);
    List<UserResponseDTO> users();
    UserResponseDTO getUser(Long userId);
}

