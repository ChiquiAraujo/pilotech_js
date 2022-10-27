const cart2 = document.querySelector("#pagebuy");
const datos = JSON.parse(localStorage.getItem("cart"));
const pay = document.querySelector("#pay");
console.log(datos);


function renderCart2(){
    datos.forEach((objeto) => {
        let cartsHTML = `
        <div class="cards__cart">
            <img src=".${objeto.img}" alt="${objeto.name}" class="cards__img">
            <h3 class="modelo">${objeto.name}</h3>           
            <p>Cantidad:${objeto.cantidad}</p>
            <b>${objeto.price}€</b>            
        </div>
        `;
        cart2.innerHTML += cartsHTML;
    })     
};
renderCart2();

function calculateTotal() {
    let total = 0;

    datos.forEach((object) => {
        total += object.price * object.cantidad;
    });
    console.log(total);

    const totalToPay = document.getElementById("totalcompra");
    totalToPay.innerHTML = `
    <h4> Total a pagar: ${total} </h4>
    `;
};
calculateTotal();

pay.addEventListener("click", () =>{
    
    Swal.fire(
        'Pedido realizado',
      );
} )
