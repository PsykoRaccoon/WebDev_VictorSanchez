const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $loader = d.querySelector("#loader");

let carrito = {};

fetch('https://fakestoreapi.com/products')
  .then((response) => response.json())
  .then((products) => renderProducts(products))
  .catch((error) => console.error("Error al cargar los productos:", error));

function renderProducts(products) {
  const productList = d.getElementById("product-list");
  products.forEach((product) => {
    const productCard = d.createElement("div");
    productCard.className = "card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <div class="card-body producto" data-nombre="${product.title}" data-precio="${product.price}">
        <h2 class="card-title">${product.title}</h2>
        <p class="card-description">${product.description}</p>
        <p class="card-price">$${product.price}</p>
        <p class="card-rating">Rating: ${product.rating.rate} ⭐ (${product.rating.count} reviews)</p>
        <div class="card-buttons">
          <button class="btn-menos">-</button>
          <button class="btn-mas">+</button>
        </div>
      </div>
    `;
    productList.appendChild(productCard);
  });
}

d.addEventListener("click", function (e) {
  if (e.target.matches(".btn-menos, .btn-mas")) {
    const $producto = e.target.closest(".producto");
    let nombre = $producto.getAttribute("data-nombre");
    let precio = parseFloat($producto.getAttribute("data-precio"));

    if (e.target.matches(".btn-mas")) {
      if (!carrito[nombre]) carrito[nombre] = { cantidad: 0, precio: precio };
      carrito[nombre].cantidad++;
    } else if (e.target.matches(".btn-menos") && carrito[nombre]) {
      carrito[nombre].cantidad--;
      if (carrito[nombre].cantidad <= 0) delete carrito[nombre];
    }

    actualizarCarrito();
  }
});

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

$btnCompra.addEventListener("click", function () {
  if ($listaCarrito.children.length > 0) {
    $loader.classList.remove("hidden");

    setTimeout(() => {
      $loader.classList.add("hidden");
      $mensajeCompra.classList.remove("hidden");
    }, 5000);
  } else {
    alert("El carrito está vacío, no se puede realizar la compra.");
  }
});
