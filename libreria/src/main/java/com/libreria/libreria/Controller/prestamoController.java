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

import com.libreria.libreria.interfaceService.IprestamoService;
import com.libreria.libreria.models.Prestamo;


@RequestMapping("/api/v1/Prestamo/")
@RestController
public class prestamoController {

    @Autowired
    private IprestamoService prestamoService;

    @PostMapping("/")
    public ResponseEntity<Object> save (@ModelAttribute("Prestamo") Prestamo Prestamo){
        prestamoService.save(Prestamo);
        return new ResponseEntity<>(Prestamo, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaPrestamo = prestamoService.findAll();
        return new ResponseEntity<>(listaPrestamo,HttpStatus.OK);
    }

    @GetMapping("/{id}")
        public ResponseEntity<Object> findOne(@PathVariable String id) {
        var Prestamo = prestamoService.findOne(id);
       return new ResponseEntity<>(Prestamo, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        var Prestamo = prestamoService.findOne(id).get();
        if (Prestamo != null) {
            if (Prestamo.getEstado().equals("H")) {

                Prestamo.setEstado("D");
                prestamoService.save(Prestamo);
                return new ResponseEntity<>("Se ha deshabilitado correctamente", HttpStatus.OK);
            } else
            Prestamo.setEstado("H");
            prestamoService.save(Prestamo);
            return new ResponseEntity<>("Se ha habilitado correctamente", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No se ha encontrado el registro", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/eliminarPermanente/{id}")
    public ResponseEntity<Object> deleteForever(@PathVariable String id){
        prestamoService.deleteForever(id);
        return new ResponseEntity<>("Resgistro eliminado permanentemente",HttpStatus.OK);
    }

      @PutMapping("/{id}")
        public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("Prestamo") Prestamo PrestamoUpdate) {
        var Prestamo = prestamoService.findOne(id).get();
        if (Prestamo != null) {

            Prestamo.setFechaPrestamo(PrestamoUpdate.getFechaPrestamo());
            Prestamo.setFechaDevolucion(PrestamoUpdate.getFechaDevolucion());
            Prestamo.setEstado(PrestamoUpdate.getEstado());
           
            prestamoService.save(Prestamo);
            return new ResponseEntity<>(Prestamo, HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Error prestamo NO Encontrado", HttpStatus.BAD_REQUEST);
        }
    }

}
