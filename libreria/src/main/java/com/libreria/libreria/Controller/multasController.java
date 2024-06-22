package com.libreria.libreria.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libreria.libreria.interfaceService.ImultasService;
import com.libreria.libreria.models.Multas;

@RequestMapping("/api/v1/Multas/")
@RestController
public class multasController {
    @Autowired
    private ImultasService multasService;

    @PostMapping("/")
    public ResponseEntity<Object> save (@ModelAttribute("Multas") Multas Multas){
        multasService.save(Multas);
        return new ResponseEntity<>(Multas, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaMultas = multasService.findAll();
        return new ResponseEntity<>(listaMultas,HttpStatus.OK);
    }

    @GetMapping("/{id}")
        public ResponseEntity<Object> findOne(@PathVariable String id) {
        var Multas = multasService.findOne(id);
       return new ResponseEntity<>(Multas, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        var Multas = multasService.findOne(id).get();
        if (Multas != null) {
            if (Multas.getEstado().equals("H")) {

                Multas.setEstado("D");
                multasService.save(Multas);
                return new ResponseEntity<>("Se ha deshabilitado correctamente", HttpStatus.OK);
            } else
            Multas.setEstado("H");
            multasService.save(Multas);
            return new ResponseEntity<>("Se ha habilitado correctamente", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No se ha encontrado el registro", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/eliminarPermanente/{id}")
    public ResponseEntity<Object> deleteForever(@PathVariable String id){
        multasService.deleteForever(id);
        return new ResponseEntity<>("Resgistro eliminado permanentemente",HttpStatus.OK);
    }

      @PutMapping("/{id}")
        public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("Multas") Multas MultasUpdate) {
        var Multas = multasService.findOne(id).get();
        if (Multas != null) {

            Multas.setValorMulta(MultasUpdate.getValorMulta());
            Multas.setFechaMulta(MultasUpdate.getFechaMulta());
            Multas.setEstado(MultasUpdate.getEstado());
           
            multasService.save(Multas);
            return new ResponseEntity<>(Multas, HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Error multa NO Encontrada", HttpStatus.BAD_REQUEST);
        }
    }

}
