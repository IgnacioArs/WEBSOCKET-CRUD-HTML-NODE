"use strict";

//vamos a poder pintar elementos, ya que aqui esta la interfaz de usuario
//aqui mandamos a llamar el div con el id de las notas
var MostrarNotas = document.querySelector('#notes'); //el id de la nota para actualizar

var IdNotaAcutalizar = ''; //hay que recordar que (data) viene o esta definido por el metodo cargarNotasGuardades

var notitas = function notitas(data) {
  //aqui creamos un elemento div
  var div = document.createElement('div');
  /*  no olvidar el += asi html va realizando un mapeo */

  div.innerHTML += "<div class=\"card card-body mb-2\">\n                              <div class=\"d-flex justify-content-between\">\n                              <h1 class=\"h3 card-title\">".concat(data.titulo, "</h1>\n                             <div>\n                             <button  class=\"btn btn-danger delete\" data-id=\"").concat(data.id, "\">Eliminar</button>\n                             <button  class=\"btn btn-secondary update\" data-id=\"").concat(data.id, "\">Editar</button>\n                             </div>\n                              </div>\n                              <p>").concat(data.descripcion, "</p>  \n                             </div>");
  console.log("mostrando los datos para mostrarlo en la pagina", data); //realizando el boton para eliminar

  var btnEliminar = div.querySelector('.delete'); //aqui escuchamos lo que quiera hacer el boton

  btnEliminar.addEventListener('click', function () {
    console.log("id de una nota al eliminar desde el UI", btnEliminar.dataset.id);
    EliminarNota(btnEliminar.dataset.id);
  }); //aqui se va a crear el boton actualizar

  var btnActualizar = div.querySelector('.update'); //aqui escuchamos lo que quiera hacer el boton

  btnActualizar.addEventListener('click', function () {
    console.log("LEYENDO ID DESDE UI", btnActualizar.dataset.id);
    ActualizarNota(btnActualizar.dataset.id);
  }); //aqui retornamos el div creado

  return div;
};

var CargarNotasGuardadas = function CargarNotasGuardadas(notas) {
  MostrarNotas.innerHTML = '';
  /*  console.log("AHORA LLAMANDO EL METODO CargarNotasGuardadas",notas) */

  notas.forEach(function (nota) {
    MostrarNotas.append(notitas(nota));
  });
  console.log("CARGANDO LAS NOTAS GUARDADAS", notas);
};

var abrirNotas = function abrirNotas(nota) {
  MostrarNotas.append(notitas(nota));
  console.log("ESTAS SON LAS NUEVAS NOTRAS CREADAS", nota);
};