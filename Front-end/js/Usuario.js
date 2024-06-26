var url = "http://localhost:8080/api/v1/Usuario/";
// Función para listar los clientes
function listarUsuario() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                var trRegistro = document.createElement("tr");
                trRegistro.innerHTML = `
                    <td>${result[i]["idUsuario"]}</td>
                    <td class="text-center align-middle">${result[i]["nombre"]}</td>
                    <td class="text-center align-middle">${result[i]["direccion"]}</td>
                    <td class="text-center align-middle">${result[i]["correo"]}</td>
                    <td class="text-center align-middle">${result[i]["tipoUsuario"]}</td>
                    <td class="text-center align-middle">
                        <i class="fas fa-edit editar"  onclick="RegistrarUsuarioBandera=false;" data-id="${result[i]["idUsuario"]}"></i>
                        <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idUsuario"]}"></i>
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

var RegistrarUsuarioBandera = true;
// Función para registrar un libro
function RegistrarUsuario() {

    var Nombre = document.getElementById("Nombre");
    var Direccion = document.getElementById("Direccion");
    var Correo = document.getElementById("Correo");
    var tipoUsuario = document.getElementById("tipoUsuario");

    // Verificar si algún campo obligatorio está vacío
    if (!validarnombre(Nombre) ||
        !validardireccion(Direccion) ||
        !validarcorreo(Correo) ||
        !validartipoUsuario(tipoUsuario)) {
        // Mostrar una alerta indicando que todos los campos son obligatorios
        Swal.fire({
            title: "¡Error!",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
        return; // Salir de la función si algún campo está vacío
    }

    var forData = {
        "Nombre": Nombre.value,
        "Direccion": Direccion.value,
        "Correo": Correo.value,
        "tipoUsuario": tipoUsuario.value,
    };

    var metodo = "";
    var urlLocal = "";
    var textoimprimir = "";
    if (RegistrarUsuarioBandera == true) {
        metodo = "POST";
        urlLocal = url;
        textoimprimir = Swal.fire({
            title: "LISTO",
            text: "Felicidades, Registrado con éxito",
            icon: "success"
        });
    } else {
        metodo = "PUT";
        urlLocal = url + idUsuario;
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
                    ListarUsuario();
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
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
    }
};

// Función para validar campos
// Función Documento Identidad
function validarCampos() {
    var Nombre = document.getElementById("Nombre");
    return validarnombre(Nombre);
}

// Función para validar el documento de identidad
function validarnombre(cuadroNumero) {
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


function validarCamposdireccion() {
    var Direccion = document.getElementById("Direccion");
    return validardireccion(Direccion);
}

function validardireccion(cuadroNumero) {
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
function validarCamposcorreo() {
    var Correo = document.getElementById("Correo");
    return validarcorreo(Correo);
}

function validarcorreo(cuadroNumero) {
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

function validarCampostipoUsuario() {
    var tipoUsuario = document.getElementById("tipoUsuario");
    return validartipoUsuario(tipoUsuario);
}

function validartipoUsuario(cuadroNumero) {
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

function AplicarFiltros(filtro) {
    if (filtro=== '') {
        listarUsuario(); // Mostrar todos los médicos si estado es vacío
    }else{
        $.ajax({
            url: "http://localhost:8080/api/v1/Usuario/busquedafiltro/" + filtro,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";
    
                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idUsuario"]}</td>
                        <td class="text-center align-middle">${result[i]["Nombre"]}</td>
                        <td class="text-center align-middle">${result[i]["Direccion"]}</td>
                        <td class="text-center align-middle">${result[i]["Correo"]}</td>
                        <td class="text-center align-middle">${result[i]["tipoUsuario"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="RegistrarUsuarioBandera=false;" data-id="${result[i]["idUsuario"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idUsuario"]}"></i>
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
    document.getElementById("Nombre").value = "";
    document.getElementById("Nombre").className = "form-control";
    document.getElementById("Direccion").value = "";
    document.getElementById("Direccion").className = "form-control";
    document.getElementById("Correo").value = "";
    document.getElementById("Correo").className = "form-control";
    document.getElementById("tipoUsuario").value = "";
    document.getElementById("tipoUsuario").className = "form-control";
}

var idUsuario = "";
// Asociar eventos de clic a los iconos dentro de la tabla
$(document).on("click", ".editar", function () {
    limpiar();
    idUsuario = $(this).data("id");

    $.ajax({
        url: url + idUsuario,
        type: "GET",
        success: function (usuario) {
            document.getElementById("Nombre").value = usuario.nombre;
            document.getElementById("Direccion").value = usuario.direccion;
            document.getElementById("Correo").value = usuario.correo;
            document.getElementById("tipoUsuario").value = usuario.tipoUsuario;
            $('#exampleModal').modal('show');
        },
        error: function (error) {
            alert("Error al obtener los datos del usuario: " + error.statusText);
        }
    });
});

$(document).on("click", ".eliminar", function () {
    // Obtener el ID del médico desde el atributo data del elemento clicado
    var idLibro = $(this).data("id");

    // Mostrar un cuadro de diálogo para confirmar la eliminación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas eliminar este usuario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        // Si el usuario confirma la eliminación, proceder con la solicitud AJAX
        if (result.isConfirmed) {
            $.ajax({
                url: url + "eliminarPermanente/" + idUsuario,
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
                    listarUsuario();
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
    listarUsuario();
});
function actualizarlistarLibro() {
    listarUsuario();
}
