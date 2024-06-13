package com.libreria.libreria.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.libreria.libreria.models.Libro;

public interface Ilibro extends CrudRepository< Libro, String> {

     @Query("SELECT l FROM Libro l WHERE l.Titulo LIKE %?1% OR l.Autor LIKE %?1% OR l.Genero LIKE %?1% OR l.ISBN LIKE %?1%")
    List<Libro> filtroLibro(String filtro);

}
