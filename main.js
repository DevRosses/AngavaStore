/*--->> agrega funcionalidad a los botones <<---*/

let btnOpenMenu = document.getElementById("open-menu");

let btnCloseMenu = document.getElementById("close-menu");

let btnOpenCar = document.getElementById("open-car");

let btnCloseCar = document.getElementById("close-car");

let menu = document.getElementById("mobile-menu");

let MenuCar = document.getElementById("mobile-car");

btnOpenMenu.addEventListener("click", () => {
  menu.classList.remove("disabled");
});

btnCloseMenu.addEventListener("click", () => {
  menu.classList.add("disabled");
});

btnOpenCar.addEventListener("click", () => {
  MenuCar.classList.remove("disabled");
});

btnCloseCar.addEventListener("click", () => {
  MenuCar.classList.add("disabled");
});

















/*--->> inicializar datos de productos  <<---*/
var dataProd = [];

/*--->> crear cards de productos  <<---*/
const contenedorProductos = document.querySelector("#productos-grid");

function crearCard(data) {
    const card = document.createElement("div");
    card.classList.add("card1");

    card.innerHTML = `
    <img
              src="${data.image}"
              class="card-img-top"
              alt="${data.title}" />
            <div class="card-body">
              <h5 class="card-title">${data.title}</h5>
              <p class="card-text">
                ${data.description}
              </p>
              <p>Precio: $${data.price}</p>
              <a href="#" class="btn btn-primary">Lo quiero!</a>
            </div>
  `;

    contenedorProductos.appendChild(card);

}

/*--->> crear cards del carrito <<---*/
function crearCarrito() {
  productos.forEach((dataCar) => {
    const card = document.createElement("div");
    card.classList.add("card-carrito");

    card.innerHTML = `
     <img
              src="${data.imagen}"
              class="card-img-carrito"
              alt="${data.nombre}" />

            <div class="mobile-carrito_texto">
              <h5 class="card-title">${data.nombre}</h5>
              <p>Precio: $${data.precio}</p>
            </div>

            <div class="mobile-carrito_modificar">
              <button class="agregar" id="agregar">
                <i class="bi bi-plus-circle"></i>
              </button>
              <p>0</p>
              <button class="quitar" id="quitar">
                <i class="bi bi-x-circle"></i>
              </button>
            </div>
  `;

    contenedorProductos.appendChild(card);
  });
}

/*--->> Solicitamos la lista de productos <<---*/
async function buscarProductos() {
  try {
    const respuesta = await fetch(
      "https://fakestoreapi.com/products/category/jewelery"
    );
    dataProd = await respuesta.json();

    console.log("productos del Fetch: ", dataProd);
    
    dataProd.forEach((producto) => { crearCard(producto); });
    
  } catch (error) {
    console.error("No se pudo encontrar información de los productos", error);
  }
}

/*--->> Ejecutar la carga de productos <<---*/
document.addEventListener("DOMContentLoaded", () => {
  buscarProductos();
});
