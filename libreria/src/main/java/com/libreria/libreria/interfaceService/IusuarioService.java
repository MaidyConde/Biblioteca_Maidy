package com.libreria.libreria.interfaceService;

import java.util.List;
import java.util.Optional;

import com.libreria.libreria.models.Usuario;

public interface IusuarioService {
    public String save (Usuario Usuario);

    public List<Usuario> findAll();

    public Optional<Usuario> findOne(String id);

    public int deleteForever(String id);

}
