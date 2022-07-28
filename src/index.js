import express from 'express'
//importando socket
import {Server as WebSocketServer} from 'socket.io'
//llamamo  el modulo http
import http from 'http'
//mandamos a llamar el identicador univelsar id
import {v4 as uuid} from 'uuid'

//aqui creamos el arreglo para las notas //tambien entender que ese arreglo se puede remplazar por una base de datos
//tanto como mysq sql mongo etc.....
let notas = []


const app = express()
const httpServer = http.createServer(app)
const io = new WebSocketServer(httpServer)


//configuracion
app.set('port',3000)



app.use(express.static(__dirname + '/public'))

//realizamos la conexion websocket io
io.on('connection',(socket) => {
    //aqui por consola mostramos el id que socket io o el servidor genera al abrir otro navegador 
    console.log("nueva conexion:",socket.id)
    console.log("MOSTRANDO LAS NOTAS",notas)
//ahora aremos cargar los datos que ya estan pero en el objeto notas.push
          ///ahora para hacer que se cargen las notas ya creadas no estaremos usando el objeto nota
            //si no que estaremos usan el objeto nota
            socket.emit('server:cargarNotas',notas)

    socket.on("cliente:nota",(data) => {
    
       //aqui vamos a utilizar uuid para a cada dato darle un identifacador universal
       const nota  = {titulo:data.titulo,descripcion:data.descripcion,id:uuid()}
       notas.push({titulo:data.titulo,descripcion:data.descripcion,id:uuid()})
       console.log("notas mostrandose en un arreglo",notas)
       console.log("notas mostrandose en un objeto",nota)
       
       //ahora devolvemos el arreglo al cliente con websocket asi guardando lo que se envia desde el archivo main.j
       //es io.emit --> asi se actualiza con todos los clientes
       io.emit("server:notas",nota)
       console.log("ahora el servidor emitiendo el mensaje de vuelta",notas)

    }) 


    //aqui realizamos la peticion de eliminar una nota con el id del archivo UI tomado en el archivo socket.js y enviado
     //desde alli

     socket.on('cliente:EliminarNotaPorId',(id) => {
        
        console.log("OBTENIENDO EL ID PARA ELIMINAR UNA NOTA",id)
        notas = notas.filter((nota) => nota.id !== id)
        console.log("MOSTRANDO RESULTADO DEL ELIMINAR UNA NOTA",notas)
        //es io.emit --> asi se actualiza con todos los clientes
        io.emit('server:cargarNotas',notas)
     })


     //aqui se realiza la peticion para actualiza los datos con el id 
     socket.on('cliente:obtenerNota', idNota => {
        console.log("RECIBIENDO EL ID PARA ACTUALIZAR UNA NOTA DESDE EL SERVIDOR",idNota)
        const notaEncontrada = notas.find(nota => nota.id === idNota)
        console.log("NOTA ENCONTRADA PARA ACTUALIZAR",notaEncontrada)
        //enviamos de vuelta la nota encontrada
        socket.emit('cliente:notaSeleccionada',notaEncontrada)
     })


     //ahora ya estamos reciendo los 3 parametros enviados para actualizar definitivamente la nota
     socket.on('cliente:ActualizarLaNota',NotaActualizar => {
        console.log("RECIBIENDO LOS DATOS DEFINITIVO PARA ACTUALIZAR LA NOTA",NotaActualizar)

      notas =  notas.map(nota => {
            if(nota.id === NotaActualizar.id){
                nota.titulo = NotaActualizar.titulo
                nota.descripcion = NotaActualizar.descripcion
            }

            return nota
        })
        //es io.emit --> asi se actualiza con todos los clientes
        io.emit('server:cargarNotas',notas)
    
    })



})






httpServer.listen(app.get('port'),() => {
    console.log("servidor corriendo puerto",app.get('port'))
})