
<!DOCTYPE html>
<html>
<head>
    <title>Pet Products</title>
    <link rel="stylesheet" href="assets/style.css">
    <script src="assets/script.js" defer></script>
</head>
<body>
<header>
    <h2>🐾 Love & Care</h2>
    <nav>
        <a href="index.php">Home</a>
        <a href="pets.php">Products</a>
        <a href="contact.php">Contact</a>
    </nav>
</header>

<h1>Our Pet Products</h1>

<div class="items">
    <div class="product">
        <h2>🐶</h2>
        <h3>Dog Food</h3>
        <p>₹499</p>
        <button onclick="addCart('Dog Food',499)">Add to Cart</button>
    </div>

    <div class="product">
        <h2>🐱</h2>
        <h3>Cat Toy</h3>
        <p>₹199</p>
        <button onclick="addCart('Cat Toy',199)">Add to Cart</button>
    </div>

    <div class="product">
        <h2>🐰</h2>
        <h3>Rabbit Care Kit</h3>
        <p>₹349</p>
        <button onclick="addCart('Rabbit Care Kit',349)">Add to Cart</button>
    </div>

    <div class="product">
        <h2>🦜</h2>
        <h3>Bird Feeder</h3>
        <p>₹249</p>
        <button onclick="addCart('Bird Feeder',249)">Add to Cart</button>
    </div>
</div>

<h2 id="cart">Shopping Cart</h2>
<p id="cart-items">Your cart is empty</p>
<h3 id="total">Total: ₹0</h3>
</body>
</html>

