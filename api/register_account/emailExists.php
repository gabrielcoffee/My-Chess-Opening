<?php
header("Access-Control-Allow-Origin: https://mychessopening.com");
header("Access-Control-Allow-Origin: https://www.mychessopening.com");
header("Access-Control-Allow-Origin: http://mychessopening.com");
header("Access-Control-Allow-Origin: http://www.mychessopening.com");
header("Vary: Origin");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$email = $_POST["email"];

if (is_null($email)){
  die("No email provided");
}

$servername = "host";
$username = "user";
$password = "password";
$database = "db";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = 'SELECT * FROM accounts WHERE email="'.$email.'"';
$result = $conn->query($sql);
$size1 = $result->num_rows;

$sql = 'SELECT * FROM notConfirmed WHERE email="'.$email.'"';
$result = $conn->query($sql);
$size2 = $result->num_rows;

if ($size1 == 0 && $size2 == 0){
    echo '{"exists": false}';
}
else{
  echo '{"exists": true}';
}

?>