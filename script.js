
let cart = [];
let total = 0;

function addCart(name, price) {
    cart.push({name, price});
    total += price;

    document.getElementById("cart-items").innerHTML =
        cart.map(item => item.name).join(", ");

    document.getElementById("total").innerHTML =
        "Total: ₹" + total;
}

