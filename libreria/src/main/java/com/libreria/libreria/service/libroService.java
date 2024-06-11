package com.libreria.libreria.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.libreria.libreria.interfaceService.IlibroService;
import com.libreria.libreria.interfaces.Ilibro;
import com.libreria.libreria.models.Libro;

@Service
public class libroService implements IlibroService {

    @Autowired
    private Ilibro data;

    @Override
    public String save(Libro Libro) {
        data.save(Libro);
        return Libro.getIdLibro();
    }

    @Override
    public List<Libro> findAll(){
        List<Libro> listaLibro = (List<Libro>) data.findAll();
        return listaLibro;
    }

    @Override
    public Optional<Libro> findOne(String id){
        Optional<Libro> Libro = data.findById(id);
        return Libro;
    }

    @Override
    public int deleteForever(String id){
        data.deleteById(id);
        return 1;
    }
}
