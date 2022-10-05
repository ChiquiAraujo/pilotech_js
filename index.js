`use strict`

const articles = [
    {id: 1, brand: "Samsung", name: "Samsung Galaxy S22", price: 1359, description: "5G, Black, 128 GB, 8 GB RAM, 6.1'' FHD+, Exynos 2200, 3700 mAh, Android 12", img:"./img/galaxy_s22.png",},
    {id: 2, brand: "Samsung", name: "Samsung Galaxy Z Fold 4", price: 1779, description: "Características del movil Android Galaxy Z Fold 4", img:"./img/galaxyfold.png",},
    {id: 3, brand: "Apple", name: "iPhone 14", price: 1599, description: "Características del movil iPhone 14", img:"./img/iphone_14.png", },
    {id: 4, brand: "Apple", name: "iPhone 13 mini", price: 879, description: "Características del movil iPhone 13 mini", img:"./img/iphone-13.png", },
];

console.log(articles);

const items = document.querySelector("#items");
const cartHTML = document.querySelector("#cart");
const formHTML = document.querySelector("#form");
const accionHTML = document.querySelector("#botonhtml");
const empy = document.querySelector("#boton-vaciar");
let cart = [];


//Renderizar tarjetas de producto
function renderProduct () {
    articles.forEach((product) =>{
        let productHTML = `
        <div class="cards__products">
        <h3>${product.name}</h3>
        <img src="${product.img}" alt="${product.name}" class="cards__img">
        <p>${product.description}</p>
        <b>${product.price}€</b>
        <p>Identificador: ${product.brand} ${product.id} </p> 
        <button onclick="addToCart(${product.id})"> Añadir al carrito  </button>
        </div>
        `;
        items.innerHTML += productHTML;
    }
    );
}

 //Añadir productos al carrito
function addToCart(id){
    let product = articles.find((product) => product.id === id);
    console.log(product.id);

    let productOnCart = cart.find((product) => product.id === id);

    function elsse () {
        product.cantidad = 1;
        cart.push(product);
    }
    productOnCart ? productOnCart.cantidad++ : elsse ()
    
     renderCart();
     calculateTotal(); 

}

//Carrito de la compra
function renderCart(){
    let htmlCart = "";

    cart.forEach((object, id) => {
        htmlCart+= `
        <div class="cards__products">
            <img src="${object.img}" alt="${object.name}" class="cards__img">
            <h3 class="modelo">${object.name}</h3>           
            <p>${object.description}</p>  
            <b>${object.price}€</b>
            <p>Identificador: ${object.brand} ${object.id} </p> 
            <p>Cantidad: ${object.cantidad}</p>
            <button onclick="removeCart(${id})"> Eliminar</button>
        </div>
        `
    let cantidades = object.cantidad;
    console.log(cantidades);
    })
    cartHTML.innerHTML = htmlCart;
        
}
//Sumatoria del total
function calculateTotal() {
    let total = 0;

    cart.forEach((object) => {
        total += object.price * object.cantidad;
    });
    console.log(total);

    function botonComprar() {
        let htmlboton = "";
        htmlboton+=
        `<div>
        <button id="boton__comprar" onclick="location.href='./compra.html'" >Comprar</button>
        </div>
        `
    accionHTML.innerHTML = htmlboton;
    localStorage.setItem("cart", JSON.stringify(cart));
    };

   
    if (total > 1){
        function botonComprar() {
            let htmlboton = "";
            htmlboton+=
            `<div>
            <button id="boton__comprar" onclick="location.href='./compra.html'" >Comprar</button>
            </div>
            `
        accionHTML.innerHTML = htmlboton;
        localStorage.setItem("cart", JSON.stringify(cart));
        };

        botonComprar ();
    };

    const totalToPay = document.getElementById("total");
    totalToPay.innerHTML = `
    <h4> Total a pagar: ${total} </h4>
    `;
}
    

//Eliminar productos del carrito
function removeCart (id){
    cart[id].cantidad--;
    cart[id].cantidad === 0 ? cart.splice(id, 1) : "" 
    renderCart();
    calculateTotal ();    
}

// Vaciar el carrito

function empyCart() {
    cart = [];
    renderCart () ;
    calculateTotal ();
    formHTML.innerHTML = "";
    accionHTML.innerHTML = "";
}

renderProduct();
empy.addEventListener("click", empyCart);

