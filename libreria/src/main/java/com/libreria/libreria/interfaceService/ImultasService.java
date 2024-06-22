package com.libreria.libreria.interfaceService;

import java.util.List;
import java.util.Optional;

import com.libreria.libreria.models.Multas;

public interface ImultasService {
    public String save (Multas Multas);

    public List<Multas> findAll();

    public Optional<Multas> findOne(String id);

    public int deleteForever(String id);

}
