"use strict";

var socket = io(); //creamos y emitimos las notas

var crearNotas = function crearNotas(titulo, descripcion) {
  socket.emit('cliente:nota', {
    titulo: titulo.value,
    descripcion: descripcion.value
  });
}; //aqui eliminamos las notas 


var EliminarNota = function EliminarNota(id) {
  console.log("ELIMINANDO LA NOTA VIENDO POR CONSOLA DEL SERVIDOR", id); //ahora desde aqui emitimos una peticion para eliminar un dato

  socket.emit('cliente:EliminarNotaPorId', id);
}; //aqui actualizaremos las notas


var ActualizarNota = function ActualizarNota(id) {
  socket.emit('cliente:obtenerNota', id);
  console.log("ENVIANDO ID PARA ACTUALIZAR DESDE EL SOCKET", id);
}; //aqui estamos tomando el emit del index.js o servidor cuando mandamos los datos
//para actualizar una nota ya que nos manda una respuesta


socket.on('cliente:notaSeleccionada', function (notaObtenida) {
  console.log("NOTA OBTENIDA DESDE EL SERVIDOR BUSCADA POR EL ID", notaObtenida); //aqui mandamos a llamar los input para rellenarlos con los datos obtenidos

  var titulo = document.querySelector('#titulo');
  var descripcion = document.querySelector('#descripcion');
  titulo.value = notaObtenida.titulo;
  descripcion.value = notaObtenida.descripcion;
  IdNotaAcutalizar = notaObtenida.id;
});

var ActualizarLaNota = function ActualizarLaNota(id, titulo, descripcion) {
  console.log("OBTENIENDO LOS DATOS PARA YA TERMINAR LA ACTUALIZACION", id, titulo, descripcion);
  socket.emit('cliente:ActualizarLaNota', {
    id: id,
    titulo: titulo,
    descripcion: descripcion
  });
}; //ahora aqui empezamos a recibir la respuesta que hemos tenido


socket.on('server:notas', abrirNotas);
/* (data) => { */

/*     console.log("recibiendo los datos de vuelta desde el servidor",data) */

/*  += */

/* ayuda a que se añada 1+1 */

/*     abrirNotas(data) */

/* }) */
//aqui recivimos el arreglo del servidor la cual ahora lo utilizamos en la parte de la interfaz

socket.on('server:cargarNotas', CargarNotasGuardadas);