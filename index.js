`use strict`

const items = document.querySelector("#items");
const cartHTML = document.querySelector("#cart");
const formHTML = document.querySelector("#form");
const accionHTML = document.querySelector("#botonhtml");
const empy = document.querySelector("#boton-vaciar");
let cart = [];

// Para dejar productos en el carrito

 const renderProduct = async () => {
    const response = await fetch("./articles.json");
    articles = await response.json();
    console.log(articles);
    let itemsDom = document.getElementById("items");
    let productHTML = ""
    articles.forEach((product) => {
        console.log(items);
        productHTML = `
        <div class="cards__products">
        <h3>${product.name}</h3>
        <img src="${product.img}" alt="${product.name}" class="cards__img">
        <p>${product.description}</p>
        <b>${product.price}€</b>
        <p>Identificador: ${product.brand} ${product.id} </p> 
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
    Swal.fire(
        'Carrito vacio',
      );
}

renderProduct();
empy.addEventListener("click", empyCart);

// redencizar las marcas
const marcs = document.querySelector("#marcas");
marcs.innerHTML =`
<div>
  <img src="./img/branch/apple.svg" alt="">
</div>
<div>
  <img src="./img/branch/samsung.svg" alt="">
</div>
<div>
  <img src="./img/branch/xiaomi.svg" alt="">
</div>
`;