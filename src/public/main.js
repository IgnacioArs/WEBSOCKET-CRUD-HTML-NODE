/* io("http://localhost:3000/") */

/* const socket = io() */

/* socket.on("ping",() => {
    console.log("el metodo esta escuchando")
}) */
//aqui llamamos al documento o al formulario html
const form = document.querySelector('#formulario')
//aqui mandamos a llamar los input de la pagina 
const titulo = document.querySelector('#titulo')
const descripcion = document.querySelector('#descripcion')




form.addEventListener('submit', e => {
    e.preventDefault()
    console.log("enviando los datos",titulo.value,descripcion.value)

//aqui empezamos a emitir webscocket solo dos parametros --> con el metodo del archivo sockets.js



      if(IdNotaAcutalizar){
        ActualizarLaNota(IdNotaAcutalizar,titulo.value,descripcion.value)
      }else{
        crearNotas(titulo,descripcion)
      }


  titulo.value = ""
    descripcion.value = ""
})