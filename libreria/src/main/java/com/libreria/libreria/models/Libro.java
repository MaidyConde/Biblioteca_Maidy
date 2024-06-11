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
@Entity(name="Libro")
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idLibro", nullable = false, length = 36)
    private String idLibro;

    @Column(name = "Titulo", nullable = false, length = 100)
    private String Titulo;

    @Column(name = "Autor", nullable = false, length = 36)
    private String Autor;

    @Column(name = "ISBN", nullable = false, length = 15)
    private String ISBN;

    @Column(name = "Genero", nullable = false, length = 36)
    private String Genero;

    @Column(name = "numeroEjemplaresDisponibles", nullable = false, length = 100)
    private String numeroEjemplaresDisponibles;

    @Column(name = "numeroEjemplaresOcupados", nullable = false, length = 100)
    private String numeroEjemplaresOcupados;

}
