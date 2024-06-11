package com.libreria.libreria.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libreria.libreria.interfaceService.IusuarioService;
import com.libreria.libreria.models.Usuario;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RequestMapping("/api/v1/Usuario/")
@RestController
public class usuarioController {

    @Autowired
    private IusuarioService usuarioService;

    @PostMapping("/")
     public ResponseEntity<Object> save (@ModelAttribute("Usuario") Usuario Usuario){
        usuarioService.save(Usuario);
        return new ResponseEntity<>(Usuario, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAll(){
        var listaUsuario = usuarioService.findAll();
        return new ResponseEntity<>(listaUsuario,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findOne(@PathVariable String id){
        var Usuario = usuarioService.findOne(id);
        return new ResponseEntity<>(Usuario,HttpStatus.OK);
    }

    @DeleteMapping("/eliminarPermanente/{id}")
    public ResponseEntity<Object> deleteForever(@PathVariable String id){
        usuarioService.deleteForever(id);
        return new ResponseEntity<>("Resgistro eliminado permanentemente",HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("Usuario") Usuario UsuarioUpdate) {
    var Usuario = usuarioService.findOne(id).get();
    if (Usuario != null) {

        Usuario.setNombre(UsuarioUpdate.getNombre());
        Usuario.setDireccion(UsuarioUpdate.getDireccion());
        Usuario.setCorreo(UsuarioUpdate.getCorreo());
        Usuario.setTipoUsuario(UsuarioUpdate.getTipoUsuario());
        
        usuarioService.save(Usuario);
        return new ResponseEntity<>(Usuario, HttpStatus.OK);

    } else {
        return new ResponseEntity<>("Error usuario NO Encontrado", HttpStatus.BAD_REQUEST);
    }
}
    
}
