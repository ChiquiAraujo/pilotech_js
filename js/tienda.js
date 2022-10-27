`use strict`

const items = document.querySelector("#items");
const cartHTML = document.querySelector("#cart");
const formHTML = document.querySelector("#form");
const accionHTML = document.querySelector("#botonhtml");
const empy = document.querySelector("#boton-vaciar");
let cart = [];

// Para dejar productos en el carrito

 const renderProduct = async () => {
    const response = await fetch("../articles.json");
    articles = await response.json();
    console.log(articles);
    let itemsDom = document.getElementById("items");
    let productHTML = ""
    articles.forEach((product) => {
        console.log(items);
        productHTML = `
        <div class="cards__products">
        <img src=".${product.img}" alt="${product.name}" class="cards__img">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <b>${product.price}€</b>        
        <button onclick="addToCart(${product.id})"> Añadir al carrito  </button>
        </div>
        `;
        itemsDom.innerHTML += productHTML;
    });
};

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
        <div class="cards__cart">
            <img src=".${object.img}" alt="${object.name}" class="cards__img">
            <h3 class="modelo">${object.name}</h3>      
            <p>Cantidad: ${object.cantidad}</p>
            <b>${object.price}€</b>           
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
        <button id="boton__comprar" onclick="location.href='../pages/compra.html'" >Comprar</button>
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
            <button id="boton__comprar" onclick="location.href='../pages/compra.html'" >Comprar</button>
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



renderProduct();
empy.addEventListener("click", empyCart);


// Vaciar el carrito

function empyCart() {
    cart = [];
    renderCart () ;
    calculateTotal ();
    formHTML.innerHTML = "";
    accionHTML.innerHTML = "";
    Swal.fire(
        'Carrito vacio',
      );
};

