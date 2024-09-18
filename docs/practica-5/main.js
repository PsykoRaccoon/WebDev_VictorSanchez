let productos = 
[
    { nombre: "Camiseta", precio: 15, stock: 10 },
    { nombre: "Pantalones", precio: 25, stock: 8 },
    { nombre: "Zapatos", precio: 50, stock: 5 },
    { nombre: "Sombrero", precio: 10, stock: 20 }
];

let carrito = [];

function agregarAlCarrito(productoNombre, cantidad) 
{
    for (let producto of productos) 
    {
      if (producto.nombre === productoNombre) 
        {
            if (producto.stock >= cantidad) 
            {
                carrito.push({
                nombre: productoNombre,
                cantidad: cantidad,
                precio: producto.precio,
                });
  
                producto.stock -= cantidad;
                console.info(`${cantidad} ${productoNombre}(s) agregado(s) al carrito`);
            } 
            else 
            {
                console.error(`No hay suficiente stock de ${productoNombre}`);
            }
            return;
        }
    }
    console.error(`El producto "${productoNombre}" no existe.`);
}

function calcularTotal()
{
    let total = 0;
    for (let item of carrito) 
    {
        total +=item.precio*item.cantidad;
    }
    return total;
}

function aplicarDescuento(total)
{
    if (total> 100)
    {
        return total * .9;
    }

    return total; 
}

function procesarCompra()
{
    console.log("Procesando compra...");
    setTimeout(function()
    {
        let total = calcularTotal();
        total = aplicarDescuento(total);
        console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
    }, 3000); 
}

agregarAlCarrito("Pantalones", 3)
agregarAlCarrito("Pantalones", 4)
agregarAlCarrito("Pantalones", 2)
console.log(carrito);

procesarCompra();
