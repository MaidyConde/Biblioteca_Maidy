package com.libreria.libreria.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Prestamo")
public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idPrestamo", nullable = false, length = 36)
    private String idPrestamo;

    @Column(name = "fechaPrestamo", nullable = false, length = 36)
    private Date fechaPrestamo;

    @Column(name = "fechaDevolucion", nullable = false, length = 36)
    private Date fechaDevolucion;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario Usuario;

    @ManyToOne
    @JoinColumn(name = "idLibro")
    private Usuario idLibro;

    @Column(name = "Estado", nullable = false, length = 3)
    private Date Estado;
// o Estado
// 1. Préstamo
// 2. Entregado
// 3. Cancelado
}
