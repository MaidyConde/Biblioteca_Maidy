package com.libreria.libreria.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity (name = "Usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idUsuario", nullable = false, length = 36)
    private String idUsuario;

    @Column(name = "Nombre", nullable = false, length = 36)
    private String Nombre;

    @Column(name = "Direccion", nullable = false, length = 36)
    private String Direccion;

    @Column(name = "Correo", nullable = false, length = 36)
    private String Correo;

    @Column(name = "tipoUsuario", nullable = false, length = 36)
    private String tipoUsuario;

}
