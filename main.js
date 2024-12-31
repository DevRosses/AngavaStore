/*--->> agrega funcionalidad a los botones <<---*/

let btnOpenMenu = document.getElementById("open-menu");

let btnCloseMenu = document.getElementById("close-menu");

let btnCloseCar = document.getElementById("close-car");

let menu = document.getElementById("mobile-menu");

let MenuCar = document.getElementById("mobile-car");

let carritoFlotante = document.getElementById("carrito-flotante");

btnOpenMenu.addEventListener("click", () => {
  menu.classList.remove("disabled");
});

btnCloseMenu.addEventListener("click", () => {
  menu.classList.add("disabled");
});

btnCloseCar.addEventListener("click", () => {
  MenuCar.classList.add("disabled");
});

carritoFlotante.addEventListener("click", () => {
  MenuCar.classList.remove("disabled");
});

/*--->> crear cards de productos  <<---*/
const contenedorProductos = document.querySelector("#productos-grid");
const contenedorCarrito = document.querySelector("#mobile-carrito-contenedor");

/*--->> inicializar datos de productos  <<---*/
var dataProd = [];
var carrito = [];

/*--->> Recuperar y decodificar datos del localStorage al inicio  <<---*/
const carritoGuardado = localStorage.getItem("carrito");
carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

/*--->> actualizar el localStorage <<---*/
function actualizarLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarCarrito() {
  contenedorCarrito.innerHTML = "";
  buscarCarrito();
}

function actualizarCantidadCarrito() {
  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );
  const carritoMenu = document.querySelector(".cantidad-carrito");

  if (carritoMenu) {
    carritoMenu.textContent = cantidadTotal; 
  }

  actualizarLocalStorage();
}



/*--->> evento de los botones  <<---*/
function buscarCarrito() {
  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>Tu carrito está vacío</p>";
    return;
  }
  carrito.forEach((producto) => {
    crearCarrito(producto);
  });
}

function agregar(id) {
  const productoSeleccionado = dataProd.find((producto) => producto.id === id);

  if (
    !productoSeleccionado ||
    !productoSeleccionado.id ||
    !productoSeleccionado.title ||
    !productoSeleccionado.price
  ) {
    console.error("Producto inválido al agregar:", productoSeleccionado);
    return;
  }

  const productoEnCarrito = carrito.find((item) => item.id === id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad = (productoEnCarrito.cantidad || 0) + 1;
  } else {
    carrito.push({ ...productoSeleccionado, cantidad: 1 });
  }

  actualizarLocalStorage();
  buscarCarrito();
  actualizarCantidadCarrito();
}

function quitar(id) {
  const productoEnCarrito = carrito.find((item) => item.id === id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad--;

    if (productoEnCarrito.cantidad <= 0) {
      carrito = carrito.filter((item) => item.id !== id);
    }

    actualizarLocalStorage();
    buscarCarrito();
  }

  actualizarCarrito();
  actualizarCantidadCarrito();
}
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
                                  <button class="btn btn-primary" id="agregar" onclick="agregar(${data.id})">
                    Lo quiero!
      </button> 
            </div>
  `;

  contenedorProductos.appendChild(card);
}

/*--->> crear cards del carrito <<---*/
function crearCarrito(data) {
  if (!data || !data.id || !data.title || !data.price || !data.image) {
    console.error("Datos inválidos para el producto en el carrito:", data);
    return;
  }

  const card = document.createElement("div");
  card.classList.add("card-carrito");

  card.innerHTML = `<img
              src="${data.image}"
              class="card-img-carrito"
              alt="${data.title}" />

            <div class="mobile-carrito_texto">
              <h5 class="card-title">${data.title}</h5>
              <p>Precio: $${data.price}</p>
            </div>

            <div class="mobile-carrito_modificar">
              <button class="agregar" data-id="${data.id}">
                <i class="bi bi-plus-circle"></i>
              </button>
              <p>${data.cantidad}</p>
              <button class="quitar" data-id="${data.id}">
                <i class="bi bi-x-circle"></i>
              </button>
            </div>`;

  // Agregar eventos dinámicos a los botones de la tarjeta del carrito
  card
    .querySelector(".agregar")
    .addEventListener("click", () => agregar(data.id));
  card
    .querySelector(".quitar")
    .addEventListener("click", () => quitar(data.id));

  contenedorCarrito.appendChild(card);
}

/*--->> Solicitamos la lista de productos <<---*/
async function buscarProductos() {
  try {
    const respuesta = await fetch(
      "https://fakestoreapi.com/products/category/jewelery"
    );
    dataProd = await respuesta.json();

    console.log("productos del Fetch: ", dataProd);

    dataProd.forEach((producto) => {
      crearCard(producto);
    });
  } catch (error) {
    console.error("No se pudo encontrar información de los productos", error);
  }
}

/*--->> Ejecutar la carga de productos <<---*/
document.addEventListener("DOMContentLoaded", () => {
  buscarProductos();
  actualizarCantidadCarrito();
});
