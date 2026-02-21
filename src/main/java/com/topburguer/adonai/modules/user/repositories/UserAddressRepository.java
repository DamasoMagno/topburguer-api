package com.topburguer.adonai.modules.user.repositories;

import com.topburguer.adonai.entities.Category;
import com.topburguer.adonai.entities.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {
    List<UserAddress> findByUserId(Long userId);
}
