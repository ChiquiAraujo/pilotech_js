let articles = [
    {id: 1, brand: "Samsung", name: "Samsung Galaxy S22", price: 1359, description: "5G, Black, 128 GB, 8 GB RAM, 6.1'' FHD+, Exynos 2200, 3700 mAh, Android 12", img:"./img/galaxy_s22.png",},
    {id: 2, brand: "Samsung", name: "Samsung Galaxy Z Fold 4", price: 1779, description: "Características del movil Android Galaxy Z Fold 4", img:"./img/galaxyfold.png",},
    {id: 3, brand: "Apple", name: "iPhone 14", price: 1599, description: "Características del movil iPhone 14", img:"./img/iphone_14.png", },
    {id: 4, brand: "Apple", name: "iPhone 13 mini", price: 879, description: "Características del movil iPhone 13 mini", img:"./img/iphone-13.png", },
];

let carrito = [];
const items = document.querySelector("#items");
const carritoHTML = document.querySelector("#carrito");

renderizarProductos();
function renderizarProductos(){
    articles.forEach((producto) =>{
        let productoHTML = `
        <div class="cards__products">
            <img src="${producto.img}" alt="${producto.name}" class="cards__img">
            <h3 class="modelo">${producto.name}</h3>           
            <p>${producto.description}</p>  
            <b>${producto.price}€</b>
            <p>Identificador: ${producto.brand} ID ${producto.id} </p>                           
            <button onclick="agregarProductosAlCarrito(${producto.id})"> Anadir al carrito</button>
        </div>
        `;
        items.innerHTML += productoHTML;
    }
    );
}

function agregarProductosAlCarrito(id){
    let producto = articles.find((producto) => producto.id === id );
    console.log(producto.id);

    let productoEnCarrito = carrito.find((producto) => producto.id === id);

    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }
    else{
        producto.cantidad = 1;
        carrito.push(producto);
    }
    renderizarCarrito()
    calcularTotal()
}

function renderizarCarrito(){
    let htmlCarrito = "";

    carrito.forEach((prod, id) =>{
    htmlCarrito+=`
    <div class="cards__products">
            <img src="${prod.img}" alt="${prod.name}" class="cards__img">
            <h3 class="modelo">${prod.name}</h3>           
            <p>${prod.description}</p>  
            <b>${prod.price}€</b>
            <p>Identificador: ${prod.brand} ID ${prod.id} </p> 
            <p>Cantidad:${prod.cantidad}</p>
            <button onclick="eliminarProductosAlCarrito(${id})"> Eliminar</button>
    </div>
    `
    }
    )
    carritoHTML.innerHTML = htmlCarrito;
}

function calcularTotal (){
let total = 0;    

carrito.forEach((prod) =>{
    total += prod.price * prod.cantidad;
});
console.log(total);

const importeTotal = document.getElementById("total");
importeTotal.innerHTML = `
    <h4>${total} € </h4>
`;
}

function eliminarProductosAlCarrito (id){
    carrito[id].cantidad--;
    
    if( carrito[id].cantidad === 0){
        carrito.splice(id, 1);
    }
    renderizarCarrito();
    calcularTotal();
}

function vaciarCarrito(){
    carrito = [];
    renderizarCarrito();
    calcularTotal();
}

const vaciar = document.querySelector("#boton-vaciar");
vaciar.addEventListener("click", vaciarCarrito);