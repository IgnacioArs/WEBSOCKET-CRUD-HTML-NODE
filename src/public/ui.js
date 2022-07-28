//vamos a poder pintar elementos, ya que aqui esta la interfaz de usuario

  //aqui mandamos a llamar el div con el id de las notas
  const MostrarNotas = document.querySelector('#notes')

//el id de la nota para actualizar
let IdNotaAcutalizar = ''



  //hay que recordar que (data) viene o esta definido por el metodo cargarNotasGuardades
const notitas = (data) => {
                     
   
          //aqui creamos un elemento div
  const div = document.createElement('div')
                 /*  no olvidar el += asi html va realizando un mapeo */
  div.innerHTML += `<div class="card card-body mb-2">
                              <div class="d-flex justify-content-between">
                              <h1 class="h3 card-title">${data.titulo}</h1>
                             <div>
                             <button  class="btn btn-danger delete" data-id="${data.id}">Eliminar</button>
                             <button  class="btn btn-secondary update" data-id="${data.id}">Editar</button>
                             </div>
                              </div>
                              <p>${data.descripcion}</p>  
                             </div>`
  console.log("mostrando los datos para mostrarlo en la pagina",data)

//realizando el boton para eliminar
const btnEliminar = div.querySelector('.delete')
//aqui escuchamos lo que quiera hacer el boton
btnEliminar.addEventListener('click', () => {
  console.log("id de una nota al eliminar desde el UI",btnEliminar.dataset.id)
  EliminarNota(btnEliminar.dataset.id)
})




//aqui se va a crear el boton actualizar
const btnActualizar = div.querySelector('.update')
//aqui escuchamos lo que quiera hacer el boton
btnActualizar.addEventListener('click',()=> {
  console.log("LEYENDO ID DESDE UI",btnActualizar.dataset.id)
  ActualizarNota(btnActualizar.dataset.id)
})



//aqui retornamos el div creado
return div
}


const CargarNotasGuardadas = (notas) => {
      MostrarNotas.innerHTML = ''
 /*  console.log("AHORA LLAMANDO EL METODO CargarNotasGuardadas",notas) */
    notas.forEach((nota) => {
      MostrarNotas.append(notitas(nota))
      
    })
    console.log("CARGANDO LAS NOTAS GUARDADAS",notas)

}

const abrirNotas = nota => {
  MostrarNotas.append(notitas(nota))
  console.log("ESTAS SON LAS NUEVAS NOTRAS CREADAS",nota)
}