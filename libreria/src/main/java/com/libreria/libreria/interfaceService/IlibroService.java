package com.libreria.libreria.interfaceService;

import java.util.List;
import java.util.Optional;

import com.libreria.libreria.models.Libro;

public interface IlibroService {

    public String save (Libro Libro);

    public List<Libro> findAll();

    public Optional<Libro> findOne(String id);

    public int deleteForever(String id);
}
