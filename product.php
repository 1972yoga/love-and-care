
<?php
require 'db.php';

if (isset($_POST['add'])) {
    $id = (int)$_POST['product_id'];

    $stmt = $conn->prepare("SELECT id FROM products WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    if ($stmt->get_result()->num_rows > 0) {
        $stmt = $conn->prepare(
            "INSERT INTO cart(product_id,quantity)
             VALUES(?,1)
             ON DUPLICATE KEY UPDATE quantity=quantity+1"
        );

        // The cart table needs a unique product_id for this query.
        // Use the session cart below instead.
        $_SESSION['cart'][$id] =
            ($_SESSION['cart'][$id] ?? 0) + 1;
    }

    header("Location: products.php");
    exit;
}

$result = $conn->query("SELECT * FROM products");
?>

<!DOCTYPE html>
<html>
<head>
<title>PetKart Products</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <h2>🐾 PetKart</h2>
    <nav>
        <a href="index.php">Home</a>
        <a href="products.php">Products</a>
        <a href="cart.php">Cart 🛒</a>
    </nav>
</header>

<h1 class="heading">Our Pet Products</h1>

<div class="product-grid">

<?php while($row = $result->fetch_assoc()) { ?>

<div class="card">

<img src="images/<?php echo htmlspecialchars($row['image']); ?>">

<h3><?php echo htmlspecialchars($row['name']); ?></h3>

<p>₹<?php echo number_format($row['price'],2); ?></p>

<form method="POST">
    <input type="hidden" name="product_id"
           value="<?php echo $row['id']; ?>">

    <button name="add" class="btn">Add To Cart</button>
</form>

</div>

<?php } ?>

</div>

</body>
</html>
