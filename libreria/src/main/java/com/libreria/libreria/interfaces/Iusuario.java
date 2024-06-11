package com.libreria.libreria.interfaces;

import org.springframework.data.repository.CrudRepository;

import com.libreria.libreria.models.Usuario;

public interface Iusuario extends CrudRepository<Usuario, String> {

}
