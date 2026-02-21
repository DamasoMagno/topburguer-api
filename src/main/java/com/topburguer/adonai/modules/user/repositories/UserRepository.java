package com.topburguer.adonai.modules.user.repositories;

import com.topburguer.adonai.entities.Category;
import com.topburguer.adonai.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> { }