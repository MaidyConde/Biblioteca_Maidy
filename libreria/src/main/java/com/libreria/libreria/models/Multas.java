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
@Entity(name = "Multas")
public class Multas {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idMultas", nullable = false, length = 36)
    private String idMultas;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario Usuario;

    @ManyToOne
    @JoinColumn(name = "idPrestamo")
    private Prestamo Prestamo;

    @Column(name = "valorMulta", nullable = false, length = 36)
    private String valorMulta ;

    @Column(name = "fechaMulta", nullable = false, length = 36)
    private Date fechaMulta ;

    @Column(name = "Estado", nullable = false, length = 36)
    private String Estado ;

}
