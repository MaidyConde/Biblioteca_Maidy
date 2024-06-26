// URL de la API
var url = "http://localhost:8080/api/v1/Libro/";
//esto solo permite letras
//document.getElementById("titulo").addEventListener("keypress" , soloLetras);

const letrasPermitidas = [
    'A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 
    'N', 'Ñ', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'á', 'b', 'c', 'd', 'e', 'é', 'f', 'g', 'h', 'i', 'í', 'j', 'k', 'l', 'm',
    'n', 'ñ', 'o', 'ó', 'p', 'q', 'r', 's', 't', 'u', 'ú', 'ü', 'v', 'w', 'x', 'y', 'z', ' '
];
const numerosPermitidos = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
];
const signosPermitidos = [
    '.', ',', '@','-', '_'
];

function soloLetras(event){
    console.log("Llave presionada:"+ event.key);
    console.log("Codigo letra:"+event.keyCode);

    if (!(letrasPermitidas.includes(event.key))){
        event.preventDefault();
        return;
    }else{
        
    }
}

function soloNumeros(event){
    console.log("Llave presionada:"+ event.key);
    console.log("Codigo letra:"+event.keyCode);

    if (!(numerosPermitidos.includes(event.key))){
        event.preventDefault();
        return;
    }else{
        
    }
}

function alfaNumericos(event){
    console.log("Llave presionada:"+ event.key);
    console.log("Codigo letra:"+event.keyCode);

    if (!(numerosPermitidos.includes(event.key)) || (letrasPermitidas.includes(event.key))){
        event.preventDefault();
        return;
    }else{
        
    }
}


// Función para listar los clientes
function listarLibro() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                var trRegistro = document.createElement("tr");
                trRegistro.innerHTML = `
                    <td>${result[i]["idLibro"]}</td>
                    <td class="text-center align-middle">${result[i]["titulo"]}</td>
                    <td class="text-center align-middle">${result[i]["autor"]}</td>
                    <td class="text-center align-middle">${result[i]["isbn"]}</td>
                    <td class="text-center align-middle">${result[i]["genero"]}</td>
                    <td class="text-center align-middle">${result[i]["numeroEjemplaresDisponibles"]}</td>
                    <td class="text-center align-middle">${result[i]["numeroEjemplaresOcupados"]}</td>
                    <td class="text-center align-middle">
                        <i class="fas fa-edit editar"  onclick="RegistrarLibroBandera=false;" data-id="${result[i]["idLibro"]}"></i>
                        <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idLibro"]}"></i>
                    </td>
                `;
                cuerpoTabla.appendChild(trRegistro);
            }
        },
        error: function (error) {
            alert("Error en la petición: " + error);
        }
    });
}

var RegistrarLibroBandera = true;
// Función para registrar un libro
function RegistrarLibro() {

    var Titulo = document.getElementById("Titulo");
    var Autor = document.getElementById("Autor");
    var ISBN = document.getElementById("ISBN");
    var Genero = document.getElementById("Genero");
    var numeroEjemplaresDisponibles = document.getElementById("numeroEjemplaresDisponibles");
    var numeroEjemplaresOcupados = document.getElementById("numeroEjemplaresOcupados");

    // Verificar si algún campo obligatorio está vacío
    if (!validartitulo(Titulo) ||
        !validarautor(Autor) ||
        !validarisbn(ISBN) ||
        !validargenero(Genero) ||
        !validarnumeroEjemplaresDisponibles(numeroEjemplaresDisponibles) ||
        !validarnumeroEjemplaresOcupados(numeroEjemplaresOcupados)) {
        // Mostrar una alerta indicando que todos los campos son obligatorios
        Swal.fire({
            title: "¡Error!",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
        return; // Salir de la función si algún campo está vacío
    }

    var forData = {
        "Titulo": Titulo.value,
        "Autor": Autor.value,
        "ISBN": ISBN.value,
        "Genero": Genero.value,
        "numeroEjemplaresDisponibles": numeroEjemplaresDisponibles.value,
        "numeroEjemplaresOcupados": numeroEjemplaresOcupados.value,
    };

    var metodo = "";
    var urlLocal = "";
    var textoimprimir = "";
    if (RegistrarLibroBandera == true) {
        metodo = "POST";
        urlLocal = url;
        textoimprimir = Swal.fire({
            title: "LISTO",
            text: "Felicidades, Registrado con éxito",
            icon: "success"
        });
    } else {
        metodo = "PUT";
        urlLocal = url + idLibro;
        textoimprimir = Swal.fire({
            title: "LISTO",
            text: "Felicidades, Guardado con éxito",
            icon: "success"
        });
    }

    if (validarCampos()) {
        $.ajax({
            url: urlLocal,
            type: metodo,
            data: forData,
            success: function (response) {
                Swal.fire({
                    title: "Éxito",
                    text: "Felicidades, Guardado con éxito",
                    icon: "success"
                }).then(function () {
                    // Aquí puedes agregar más acciones después del registro exitoso
                    $('#exampleModal').modal('hide');
                    ListarLibro();
                });
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: "Error",
                    text: "¡El número de documento ya se encuentra registrado!",
                    icon: "error"
                });
            }
        });
    } else {
        Swal.fire({
            title: "Error",
            text: "¡Llene todos los campos correctamente!2",
            icon: "error"
        });
    }
};

// Función para validar campos
// Función Documento Identidad
function validarCampos() {
    var Titulo = document.getElementById("Titulo");
    return validartitulo(Titulo);
}

// Función para validar el documento de identidad
function validartitulo(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 5 || valor.length > 13) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}


function validarCamposautor() {
    var Autor = document.getElementById("Autor");
    return validarautor(Autor);
}

function validarautor(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 11) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-select is-valid";
    } else {
        cuadroNumero.className = "form-select is-invalid";
    }

    return valido;
}

// Función nombrecliente
function validarCamposisbn() {
    var ISBN = document.getElementById("ISBN");
    return validarisbn(ISBN);
}

function validarisbn(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 45) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

function validarCamposgenero() {
    var Genero = document.getElementById("Genero");
    return validargenero(Genero);
}

function validargenero(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 45) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función apellidocliente
function validarCamposnumeroEjemplaresDisponibles() {
    var numeroEjemplaresDisponibles = document.getElementById("numeroEjemplaresDisponibles");
    return validarnumeroEjemplaresDisponibles(numeroEjemplaresDisponibles);
}

function validarnumeroEjemplaresDisponibles(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 45) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}


function validarCamposnumeroEjemplaresOcupados() {
    var numeroEjemplaresOcupados = document.getElementById("numeroEjemplaresOcupados");
    return validarnumeroEjemplaresOcupados(numeroEjemplaresOcupados);
}

function validarnumeroEjemplaresOcupados(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 13) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

function AplicarFiltros(filtro) {
    if (filtro=== '') {
        listarLibro(); // Mostrar todos los médicos si estado es vacío
    }else{
        $.ajax({
            url: "http://localhost:8080/api/v1/Libro/busquedafiltro/" + filtro,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";
    
                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idLibro"]}</td>
                        <td class="text-center align-middle">${result[i]["Titulo"]}</td>
                        <td class="text-center align-middle">${result[i]["Autor"]}</td>
                        <td class="text-center align-middle">${result[i]["ISBN"]}</td>
                        <td class="text-center align-middle">${result[i]["Genero"]}</td>
                        <td class="text-center align-middle">${result[i]["numeroEjemplaresDisponibles"]}</td>
                        <td class="text-center align-middle">${result[i]["numeroEjemplaresOcupados"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="RegistrarLibroBandera=false;" data-id="${result[i]["idLibro"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idLibro"]}"></i>
                        </td>
                    `;
                    cuerpoTabla.appendChild(trRegistro);
                }
            },
            error: function (error) {
                alert("Error en la petición: " + error);
            }
        });
    }
    
}

// Función para limpiar campos del formulario
function limpiar() {
    document.getElementById("Titulo").value = "";
    document.getElementById("Titulo").className = "form-control";
    document.getElementById("Autor").value = "";
    document.getElementById("Autor").className = "form-control";
    document.getElementById("ISBN").value = "";
    document.getElementById("ISBN").className = "form-control";
    document.getElementById("Genero").value = "";
    document.getElementById("Genero").className = "form-control";
    document.getElementById("numeroEjemplaresDisponibles").value = "";
    document.getElementById("numeroEjemplaresDisponibles").className = "form-control";
    document.getElementById("numeroEjemplaresOcupados").value = "";
    document.getElementById("numeroEjemplaresOcupados").className = "form-control";
}

var idLibro = "";
// Asociar eventos de clic a los iconos dentro de la tabla
$(document).on("click", ".editar", function () {
    limpiar();
    idLibro = $(this).data("id");

    $.ajax({
        url: url + idLibro,
        type: "GET",
        success: function (libro) {
            document.getElementById("Titulo").value = libro.titulo;
            document.getElementById("Autor").value = libro.autor;
            document.getElementById("ISBN").value = libro.isbn;
            document.getElementById("Genero").value = libro.genero;
            document.getElementById("numeroEjemplaresDisponibles").value = libro.numeroEjemplaresDisponibles;
            document.getElementById("numeroEjemplaresOcupados").value = libro.numeroEjemplaresOcupados;
            $('#exampleModal').modal('show');
        },
        error: function (error) {
            alert("Error al obtener los datos del libro: " + error.statusText);
        }
    });
});

$(document).on("click", ".eliminar", function () {
    // Obtener el ID del médico desde el atributo data del elemento clicado
    var idLibro = $(this).data("id");

    // Mostrar un cuadro de diálogo para confirmar la eliminación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas eliminar este libro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        // Si el usuario confirma la eliminación, proceder con la solicitud AJAX
        if (result.isConfirmed) {
            $.ajax({
                url: url + "eliminarPermanente/" + idLibro,
                type: "DELETE",
                success: function (eliminarPermanente) {
                    // Mostrar un mensaje de éxito
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Registro Eliminado",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Actualizar la lista de médicos después de eliminar
                    listarLibro();
                },
                error: function (xhr, status, error) {
                    // Manejo de errores
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'El registro tiene un ingreso.'
                    });
                }
            });
        }
    });
});




// Llamar a la función para listar médicos al cargar la página
$(document).ready(function () {
    listarLibro();
});
function actualizarlistarLibro() {
    listarLibro();
}