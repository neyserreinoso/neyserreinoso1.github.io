const carrito = document.getElementById('carrito');
const catalogos = document.getElementById('lista-catalogo');
const listaCatalogos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
cargarEventListeners();

function cargarEventListeners() {
  platillos.addEventListener("click", comprarplatillo);
  carrito.addEventListener("click", eliminarplatillo);
  vaciarcarritoBtn.addEventListener("click", vaciarcarrito);
  document.addEventListener("DOMContentLoaded", leerlocalstorage);
}

function comprarplatillo(e) {
    e.preventdefault();
    if (e.target.classlist.contains('agregar-carrito')){
        const platillo = e.target.parentelement.parentelement;
        leerDatosPlatillo(platillo);
    }
}

function leerDatosPlatillo(platillo){
    const infoplatillo = {
        imagen: platillo.querySelector('img').src,
        titulo: platillo.querySelector('h4').textcontent,
        precio: platillo.querySelector('.precio span').textcontent,
        id: platillo.querySelector('a').getattribute('data-id')
    }

    insertarcarrito(infoplatillo);
}

function insertarcarrito(platillo) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${platillo.imagen}" width=100>
       </td>
       <td>${platillo.titulo}</td>
       <td>${platillo.precio}</td>
       <td>
        <a hreft="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
       </td>
    `;
    listaplatillos.appendChild(row);
    guardarPlatillolocalStorage(platillo);
}

function eliminarplatillo(e) {
    e.preventdefault();

    let platillo,
        platilloId;

    if (e.target.classlist.contains('borrar-platillo')) {
        e.target.parentelement.parentelement.remove();
        platillo = e.target.parentelement.parentelement;
        platilloId = platillo.querySelector('a').getattribute('data-id');
    }
    eliminarplatillolocalstorage(platilloId)
}

function vaciarcarrito(){
    while(listaplatillos.firstChild){
        listaplatillos.removeChild(listaplatillos.firstChild);
    }
    vaciarlocalstorage();

    return false;
}

function guardarPlatillolocalStorage(platillo) {
    let platillos;

    platillos = obtenerPlatilloslocalStorage();
    platillos.push(platillo);
    
    localStorage.setItem('platillos', JSON.stringify(platillos));
}

function obtenerPlatilloslocalStorage() {
    let platilloslS;

    if (localstorage.getitem('platillos') === null) {
        platilloslS = [];
    }else {
        platilloslS = JSON.parse(localStorage.getItem('platillos'));
    }
    return platilloslS;
}

function leerlocalstorage() {
    let platilloslS;

    platilloslS = obtenerPlatilloslocalStorage();

    platilloslS.forEach(function(platillos){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${platillo.imagen}" width=100>
            </td>
            <td>${platillo.titulo}</td>
            <td>${platillo.precio}</td>
            <td>
                <a href="#" class="borrar-platillo" data-id=${platillo.id}>X</a>
            </td>
        `;
        listaplatillos.appendChild(row);
    });
}

function eliminarplatillolocalstorage(platillo) {
    let platilloslS;
    platilloslS = obtenerPlatilloslocalStorage();

    platilloslS.foreach(function(platilloslS, index){
        if(platilloslS.id === platillo) {
            platilloslS.splice(index, 1);
        }
    });

    localStorage.setItem('platillos', JSON.stringify(platilloslS));
}

function vaciarlocalstorage() {
    localStorage.clear();
}



