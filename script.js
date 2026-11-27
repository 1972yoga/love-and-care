
let cartCount = 0;

function addToCart() {
    cartCount++;
    document.getElementById("cart").textContent = cartCount;

    const message = document.getElementById("cart-message");
    if (message) {
        message.textContent = "Product added to your demo cart!";
    }
}

// Product search
const searchInput = document.getElementById("search");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const searchValue = this.value.toLowerCase();

        document.querySelectorAll(".product").forEach(product => {
            const productName = product.dataset.name.toLowerCase();

            product.style.display =
                productName.includes(searchValue) ? "" : "none";
        });
    });
}
