// Selectores
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

document.addEventListener('DOMContentLoaded', ()=>{
    articulosCarrito = JSON.parse(localStorage.getItem('Carrito')) || []
    carritoHTML();
})

// Estructura para guardar
let articulosCarrito = [];

// Definir los eventos o Listeners
cargarEventListener();
function cargarEventListener(){
    // Click al boton de agregar al carrito
    listaCursos.addEventListener('click',agregarCurso);

    // Elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Boton vaciar informacion
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = [];
        vaciarCarrito();
    });
}

// Definir las funciones a utilizar

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
        sincronizarAlmacenamiento();
    }
}

function eliminarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        // console.log(cursoId);
        
        const existe = articulosCarrito.some(curso => curso.id === cursoId);
        
        if (existe) {
            const curso = articulosCarrito.map(cursos => {
                console.log(cursos.id);
                if (cursos.id === cursoId) {
                    if(cursos.cantidad > 1){
                        cursos.cantidad--;
                        return cursos;
                    }else{
                        articulosCarrito = articulosCarrito.filter(cursos => cursos.id !== cursoId);
                    }
                }
            })
        }

        carritoHTML();
        sincronizarAlmacenamiento()

    }
}

function vaciarCarrito() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';
    // Froma Rapida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    sincronizarAlmacenamiento()     
}

function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1 
    }

    if (articulosCarrito.some(curso => curso.id === infoCurso.id)) {
        const cursos = articulosCarrito.map(curso =>{
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;               
            }else{
                return curso;
            }
        })           

        articulosCarrito = [...cursos];
        
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML()
}

function carritoHTML(){
    vaciarCarrito();

    articulosCarrito.forEach(cursos =>{
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${cursos.imagen}" width=100>
            </td>
            <td>${cursos.titulo}</td>
            <td>${cursos.precio}</td>
            <td>${cursos.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${cursos.id}"> X </a>
            </td>
        `
        contenedorCarrito.appendChild(row);
    })
}

// 2da Parte

function sincronizarAlmacenamiento(){
    localStorage.setItem('cursos',JSON.stringify(articulosCarrito));
}







//  1. Definir variables o crear selectores

// const carrito = document.querySelector("h1"); //Selector Etiqueta HTML
// const carrito = document.querySelector(".nombreClaseCss") //Selector a clase CSS
// const carrito = document.querySelector("#carrito") //Selector a un ID


// const carrito = document.querySelector("#carrito"); //Selector a un ID
// console.log("#carrito");

// const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
// console.log("#vaciar-carrito");

// const listaCursos = document.querySelector("#lista-cursos");
// console.log("#lista-cursos");

// //  2. Estructura donde vamos a guardar
// let articulosCarrito = [];

// //  3. Definir los eventos
// cargarEventos();
// function cargarEventos(){
//     // Click al boton de agregar carrito
//     listaCursos.addEventListener("click", agregarCurso);
// }

// function agregarCurso(e){
//     e.preventDefault()
//     // console.log("Ingreso a la función")
//     // console.log(e.target);
//     console.log(e.target.classList.contains("agregar-carrito"))

//     if (e.target.classList.contains("agregar-carrito")) {
//         // console.log("boton")        
//         const curso = e.target.parentElement;
//         // console.log(curso)
//         leerDatosCurso(curso)
//     }else{
//         // console.log("No es boton")
//     }
// }

// function leerDatosCurso(cursoLeer){
//     // console.log(cursoLeer);
//     const infoCurso = {

//         imagen:cursoLeer.querySelector("img").src,
//         precio:cursoLeer.querySelector("span").textContent,
//         // precio:cursoLeer.querySelector(".precio span").textContent,
//         nombre:cursoLeer.querySelector("h4").textContent,
//         id:cursoLeer.querySelector("a").getAttribute("data-id"),
//         cantidad:1
//     }   

//     // console.log(infoCurso);
//     // console.log(infoCurso.imagen);
//     // console.log(infoCurso.precio);
//     // console.log(infoCurso.nombre);
//     // console.log(infoCurso.id);

//         if (articulosCarrito.some(item => item.id === infoCurso.id)) {
//             // var item = 0
//             // 2. Caso existe producto
//             const cursos = articulosCarrito.map( i =>{
//                 if (i.id === infoCurso.id){
//                     // i.cantidad = i.cantidad + 1
//                     i.cantidad++
//                     return i;

//                 }else{

//                     return i;
                    
//                 }
//             })

//             console.log(cursos);

//         } else {
//             // 1. Caso Default (Vacio o no Existe)
//             articulosCarrito = [...articulosCarrito, infoCurso];
//             console.log(articulosCarrito); 
//         }















        // Casos a desarrolar
        // 1. Caso por defecto, campo vacio (default)
        // 2. Curso existe, aumentando cantidad
        // 3. restar o eliminar 


        // const agregarCarritoBtn = document.querySelector("#agregar-carrito");
        // console.log("#agregar-carrito");

// }