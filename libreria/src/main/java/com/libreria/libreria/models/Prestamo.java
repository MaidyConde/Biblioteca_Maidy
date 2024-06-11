package com.libreria.libreria.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;



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

// o Fecha de préstamo
// o Fecha de devolución
// o Usuario que realiza el préstamo
// o Libro prestado
// o Estado
// 1. Préstamo
// 2. Entregado
// 3. Cancelado


}
