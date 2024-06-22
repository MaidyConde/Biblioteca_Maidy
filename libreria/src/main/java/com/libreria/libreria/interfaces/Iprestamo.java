package com.libreria.libreria.interfaces;

import org.springframework.data.repository.CrudRepository;

import com.libreria.libreria.models.Prestamo;

public interface Iprestamo extends CrudRepository<Prestamo, String> { 

}
