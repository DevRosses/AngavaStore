/*--->> agrega funcionalidad a los botones <<---*/

const btnOpenMenu = document.getElementById("open-menu");
const btnCloseMenu = document.getElementById("close-menu");
const btnCloseCar = document.getElementById("close-car");
const menu = document.getElementById("mobile-menu");
const MenuCar = document.getElementById("mobile-car");
const carritoFlotante = document.getElementById("carrito-flotante");
const btnBuy = document.getElementById("floating-button");
const totalPrecioElemento = document.getElementById("total-precio");
const btnFinalizarCompra = document.getElementById("finalizar-compra");

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

function cerrarMenu() {
  menu.classList.add("disabled");
}

function cerrarBtnCarrito() {
  btnBuy.classList.add("disabled");
}

function abrirBtnCarrito() {
  btnBuy.classList.remove("disabled");
}

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
}

// calcular el total del carrito
function calcularTotal() {
  return carrito.reduce(
    (total, producto) => total + producto.price * producto.cantidad,
    0
  );
}

// Actualizar el total en el DOM
function mostrarTotal() {
  const total = calcularTotal();
  totalPrecioElemento.textContent = total.toFixed(2); // Mostrar con dos decimales
}

// redirigir a WhatsApp
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const total = calcularTotal();
  const resumenProductos = carrito
    .map(
      (producto) =>
        `- ${producto.title}: $${producto.price} x ${producto.cantidad} = $${(
          producto.price * producto.cantidad
        ).toFixed(2)}`
    )
    .join("\n");

  const mensaje = encodeURIComponent(
    `Hola, me interesa realizar el siguiente pedido:\n\n${resumenProductos}\n\nTotal: $${total.toFixed(
      2
    )}`
  );

  const numeroWhatsApp = "5491123034989";
  window.location.href = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
}

// Eventos
btnFinalizarCompra.addEventListener("click", finalizarCompra);

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
  mostrarTotal();
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
  mostrarTotal();
}

mostrarTotal();

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
