const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $loader = d.querySelector("#loader");
const $carrito = d.querySelector("#carrito");

let carrito = {};

d.addEventListener("click", function (e) {
  if (e.target.matches(".btn-mas, .btn-menos")) {
    const $producto = e.target.closest(".producto");
    let nombre = $producto.getAttribute("data-nombre");
    let precio = parseFloat($producto.getAttribute("data-precio"));

    // Botón +
    if (e.target.matches(".btn-mas")) {
      if (!carrito[nombre]) carrito[nombre] = { cantidad: 0, precio: precio };
      carrito[nombre].cantidad++;

    // Botón −
    } else if (e.target.matches(".btn-menos") && carrito[nombre]) {
      carrito[nombre].cantidad--;
      if (carrito[nombre].cantidad <= 0) delete carrito[nombre];
    }

    // Actualizar el carrito
    actualizarCarrito();
  }
});

// Actualizar el carrito de compras
function actualizarCarrito() {
  $listaCarrito.innerHTML = "";
  let total = 0;
  for (let producto in carrito) {
    const item = carrito[producto];
    const $itemCarrito = d.createElement("li");
    $itemCarrito.innerText = `${producto} x${item.cantidad} - $${(item.cantidad * item.precio).toFixed(2)}`;
    $listaCarrito.appendChild($itemCarrito);
    total += item.cantidad * item.precio;
  }
  $totalCarrito.innerText = total.toFixed(2);
}

// Simular compra con loader
$btnCompra.addEventListener("click", function () {
  if ($listaCarrito.children.length > 0) {
    $loader.classList.remove("hidden");
    
    setTimeout(() => {
      $loader.classList.add("hidden");
      $mensajeCompra.classList.remove("hidden");
    }, 5000);  // Simulación de 5 segundos
  } else {
    alert("El carrito está vacío, no se puede realizar la compra.");
  }
});
