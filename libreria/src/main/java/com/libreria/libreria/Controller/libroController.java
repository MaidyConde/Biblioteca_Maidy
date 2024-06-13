package com.libreria.libreria.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libreria.libreria.interfaceService.IlibroService;
import com.libreria.libreria.models.Libro;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;


@RequestMapping("/api/v1/Libro/")
@RestController
public class libroController {

    @Autowired
    private IlibroService libroService;

    @PostMapping("/")
    public ResponseEntity<Object> save (@ModelAttribute("Libro") Libro Libro){
        libroService.save(Libro);
        return new ResponseEntity<>(Libro, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaLibro = libroService.findAll();
        return new ResponseEntity<>(listaLibro,HttpStatus.OK);
    }

    @GetMapping("/{id}")
        public ResponseEntity<Object> findOne(@PathVariable String id) {
         var Libro = libroService.findOne(id);
       return new ResponseEntity<>(Libro, HttpStatus.OK);
    }

    @GetMapping("/busquedafiltro/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable String filtro) {
        var listaLibro = libroService.filtroLibro(filtro);
        return new ResponseEntity<>(listaLibro, HttpStatus.OK); 
    }

    @DeleteMapping("/eliminarPermanente/{id}")
    public ResponseEntity<Object> deleteForever(@PathVariable String id){
        libroService.deleteForever(id);
        return new ResponseEntity<>("Resgistro eliminado permanentemente",HttpStatus.OK);
    }

      @PutMapping("/{id}")
        public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("Libro") Libro LibroUpdate) {
        var Libro = libroService.findOne(id).get();
        if (Libro != null) {

            Libro.setTitulo(LibroUpdate.getTitulo());
            Libro.setAutor(LibroUpdate.getAutor());
            Libro.setISBN(LibroUpdate.getISBN());
            Libro.setGenero(LibroUpdate.getGenero());
            Libro.setNumeroEjemplaresDisponibles(LibroUpdate.getNumeroEjemplaresDisponibles());
            Libro.setNumeroEjemplaresOcupados(LibroUpdate.getNumeroEjemplaresOcupados());
            
            libroService.save(Libro);
            return new ResponseEntity<>(Libro, HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Error libro NO Encontrado", HttpStatus.BAD_REQUEST);
        }
    }
}
