"use strict";

var _express = _interopRequireDefault(require("express"));

var _socket = require("socket.io");

var _http = _interopRequireDefault(require("http"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//importando socket
//llamamo  el modulo http
//mandamos a llamar el identicador univelsar id
//aqui creamos el arreglo para las notas //tambien entender que ese arreglo se puede remplazar por una base de datos
//tanto como mysq sql mongo etc.....
var notas = [];
var app = (0, _express["default"])();

var httpServer = _http["default"].createServer(app);

var io = new _socket.Server(httpServer); //configuracion

app.set('port', 3000);
app.use(_express["default"]["static"](__dirname + '/public')); //realizamos la conexion websocket io

io.on('connection', function (socket) {
  //aqui por consola mostramos el id que socket io o el servidor genera al abrir otro navegador 
  console.log("nueva conexion:", socket.id);
  console.log("MOSTRANDO LAS NOTAS", notas); //ahora aremos cargar los datos que ya estan pero en el objeto notas.push
  ///ahora para hacer que se cargen las notas ya creadas no estaremos usando el objeto nota
  //si no que estaremos usan el objeto nota

  socket.emit('server:cargarNotas', notas);
  socket.on("cliente:nota", function (data) {
    //aqui vamos a utilizar uuid para a cada dato darle un identifacador universal
    var nota = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      id: (0, _uuid.v4)()
    };
    notas.push({
      titulo: data.titulo,
      descripcion: data.descripcion,
      id: (0, _uuid.v4)()
    });
    console.log("notas mostrandose en un arreglo", notas);
    console.log("notas mostrandose en un objeto", nota); //ahora devolvemos el arreglo al cliente con websocket asi guardando lo que se envia desde el archivo main.j
    //es io.emit --> asi se actualiza con todos los clientes

    io.emit("server:notas", nota);
    console.log("ahora el servidor emitiendo el mensaje de vuelta", notas);
  }); //aqui realizamos la peticion de eliminar una nota con el id del archivo UI tomado en el archivo socket.js y enviado
  //desde alli

  socket.on('cliente:EliminarNotaPorId', function (id) {
    console.log("OBTENIENDO EL ID PARA ELIMINAR UNA NOTA", id);
    notas = notas.filter(function (nota) {
      return nota.id !== id;
    });
    console.log("MOSTRANDO RESULTADO DEL ELIMINAR UNA NOTA", notas); //es io.emit --> asi se actualiza con todos los clientes

    io.emit('server:cargarNotas', notas);
  }); //aqui se realiza la peticion para actualiza los datos con el id 

  socket.on('cliente:obtenerNota', function (idNota) {
    console.log("RECIBIENDO EL ID PARA ACTUALIZAR UNA NOTA DESDE EL SERVIDOR", idNota);
    var notaEncontrada = notas.find(function (nota) {
      return nota.id === idNota;
    });
    console.log("NOTA ENCONTRADA PARA ACTUALIZAR", notaEncontrada); //enviamos de vuelta la nota encontrada

    socket.emit('cliente:notaSeleccionada', notaEncontrada);
  }); //ahora ya estamos reciendo los 3 parametros enviados para actualizar definitivamente la nota

  socket.on('cliente:ActualizarLaNota', function (NotaActualizar) {
    console.log("RECIBIENDO LOS DATOS DEFINITIVO PARA ACTUALIZAR LA NOTA", NotaActualizar);
    notas = notas.map(function (nota) {
      if (nota.id === NotaActualizar.id) {
        nota.titulo = NotaActualizar.titulo;
        nota.descripcion = NotaActualizar.descripcion;
      }

      return nota;
    }); //es io.emit --> asi se actualiza con todos los clientes

    io.emit('server:cargarNotas', notas);
  });
});
httpServer.listen(app.get('port'), function () {
  console.log("servidor corriendo puerto", app.get('port'));
});