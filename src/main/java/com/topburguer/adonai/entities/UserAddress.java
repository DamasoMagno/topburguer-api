package com.topburguer.adonai.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "user_address")
@Data
public class UserAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false)
    private String address;

    @Column(name = "complement", nullable = true)
    private String complement;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
