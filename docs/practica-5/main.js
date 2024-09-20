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

function eliminarDelCarrito(productoNombre, cantidad) 
{
    let index = 0; 
    for (let item of carrito) 
    {
        if (item.nombre === productoNombre) 
        {
            if (item.cantidad >= cantidad) 
            {
                item.cantidad -= cantidad;
                if (item.cantidad === 0) 
                {
                    carrito.splice(index, 1);  
                }

                for (let producto of productos) 
                {
                    if (producto.nombre === productoNombre) 
                    {
                        producto.stock += cantidad;
                        break;
                    }
                }
                console.info(`${cantidad} ${productoNombre}(s) eliminado(s) del carrito`);
            } 
            else 
            {
                console.error(`No tienes suficientes ${productoNombre} en el carrito para eliminar.`);
            }
            return;
        }
        index++;
    }
    console.error(`El producto "${productoNombre}" no está en el carrito.`);
}


function calcularTotal()
{
    let total = 0;
    for (let item of carrito) 
    {
        total += item.precio * item.cantidad;
    }
    return total;
}

function aplicarDescuento(total)
{
    if (total > 100)
    {
        return total * 0.9;
    }

    return total; 
}

function cuentaRegresiva(callback)
{
    let tiempoRestante = 3;
    let intervalId = setInterval(function() 
    {
        console.log(`Compra confirmada en ${tiempoRestante}...`);
        tiempoRestante--;

        if (tiempoRestante < 0) 
        {
            clearInterval(intervalId);
            callback();
        }
    }, 1000);
}

function procesarCompra()
{
    console.log("Procesando compra...");
    cuentaRegresiva(function() 
    {
        let total = calcularTotal();
        total = aplicarDescuento(total);
        console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
    });
}

// Pruebas
agregarAlCarrito("Pantalones", 1);
agregarAlCarrito("Camiseta", 4);
agregarAlCarrito("Zapatos", 3);
agregarAlCarrito("Sombrero", 2);

console.log(carrito);

eliminarDelCarrito("Camiseta", 2);
eliminarDelCarrito("Zapatos", 1);

console.log(carrito);

procesarCompra();
