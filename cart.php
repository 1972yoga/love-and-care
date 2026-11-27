
<?php
require 'db.php';

$message = "";

if (isset($_POST['place_order'])) {

    $name = trim($_POST['name']);
    $phone = trim($_POST['phone']);
    $address = trim($_POST['address']);

    if ($name && $phone && $address && !empty($_SESSION['cart'])) {

        $total = 0;
        $ids = array_keys($_SESSION['cart']);

        $stmt = $conn->prepare("SELECT price FROM products WHERE id=?");

        foreach ($ids as $id) {
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $product = $stmt->get_result()->fetch_assoc();

            if ($product) {
                $total += $product['price'] * $_SESSION['cart'][$id];
            }
        }

        $stmt = $conn->prepare(
            "INSERT INTO orders(customer_name,phone,address,total)
             VALUES(?,?,?,?)"
        );
        $stmt->bind_param("sssd", $name, $phone, $address, $total);

        if ($stmt->execute()) {
            $_SESSION['cart'] = [];
            $message = "Order placed successfully!";
        }
    } else {
        $message = "Please fill all details and add products.";
    }
}

$total = 0;
?>

<!DOCTYPE html>
<html>
<head>
<title>PetKart Cart</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <h2>🐾 PetKart</h2>
    <nav>
        <a href="index.php">Home</a>
        <a href="products.php">Products</a>
        <a href="cart.php">Cart</a>
    </nav>
</header>

<h1 class="heading">My Shopping Cart 🛒</h1>

<p class="success">
<?php echo htmlspecialchars($message); ?>
</p>

<div class="cart-box">

<?php
$cart = $_SESSION['cart'] ?? [];

foreach($cart as $id => $qty) {

    $stmt = $conn->prepare("SELECT * FROM products WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $product = $stmt->get_result()->fetch_assoc();

    if (!$product) continue;

    $subtotal = $product['price'] * $qty;
    $total += $subtotal;
?>

<div class="cart-item">
    <h3><?php echo htmlspecialchars($product['name']); ?></h3>
    <p>Quantity: <?php echo $qty; ?></p>
    <p>Price: ₹<?php echo number_format($subtotal,2); ?></p>
</div>

<?php } ?>

<h2>Total: ₹<?php echo number_format($total,2); ?></h2>

<h2>Checkout Details</h2>

<form method="POST">
    <input type="text" name="name"
           placeholder="Customer Name" required>

    <input type="tel" name="phone"
           placeholder="Phone Number"
           pattern="[0-9]{10}" required>

    <textarea name="address"
              placeholder="Delivery Address" required></textarea>

    <button name="place_order" class="btn"
            <?php echo empty($cart) ? 'disabled' : ''; ?>>
        Place Order
    </button>
</form>

</div>

</body>
</html>
