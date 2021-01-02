<?php
include 'includes/db.php';
// $products = $_POST['products'];

// $product_id = $_POST['product_id'];
// $price = $_POST['price'];
// $quantity = $_POST['quantity'];

// echo $products;
// echo "test";

// $products = json_decode(file_get_contents('php://input'), true);
// print_r($products);
// echo $products["products"];

// $arr = array();
// $arr[0] = "Mark Reed";
// $arr[1] = "34";
// $arr[2] = "Australia";
// header("Content-Type: application/json");
// echo json_encode($arr);




$products = $_POST['products'];

$sql = "INSERT INTO `order_details`( `product_id`, `price`, `quantity`) 
	VALUES ('$products','$products','$products')";
if (mysqli_query($Conn, $sql)) {
	echo json_encode(array("statusCode" => 200));
} else {
	echo json_encode(array("statusCode" => 201));
}
mysqli_close($Conn);








// echo json_encode($products["products"]);



// foreach($products as $product){
// 	echo $product."\n";
// }



// $query = "INSERT INTO users (user_email, user_pass) VALUES (:user_email, :user_pass)";
// $stmt = $this->Conn->prepare($query);

// return $stmt->execute([
// 	"user_email" => $user_data["email"],
// 	"user_pass" => $hashed_password
// ]);


// $item_data_decode = json_decode($products, true);
// $meta_array = array_combine(array_column($item_data_decode['meta_data'], 'key'), $item_data_decode['meta_data']);

// if (!empty($meta_array['First Name'])) {
//   $fName = $meta_array['First Name']['value'];
// }