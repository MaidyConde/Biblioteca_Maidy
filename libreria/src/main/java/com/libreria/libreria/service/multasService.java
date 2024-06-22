package com.libreria.libreria.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.libreria.libreria.interfaceService.ImultasService;
import com.libreria.libreria.interfaces.Imultas;
import com.libreria.libreria.models.Multas;

@Service
public class multasService implements ImultasService {
    @Autowired
    private Imultas data;

    @Override
    public String save(Multas Multas) {
        data.save(Multas);
        return Multas.getIdMultas();
    }

    @Override
    public List<Multas> findAll(){
        List<Multas> listaMultas = (List<Multas>) data.findAll();
        return listaMultas;
    }

    @Override
    public Optional<Multas> findOne(String id){
        Optional<Multas> Multas = data.findById(id);
        return Multas;
    }

    @Override
    public int deleteForever(String id){
        data.deleteById(id);
        return 1;
    }
}
