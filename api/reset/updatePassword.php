<?php
header("Access-Control-Allow-Origin: https://mychessopening.com");
header("Access-Control-Allow-Origin: https://www.mychessopening.com");
header("Access-Control-Allow-Origin: http://mychessopening.com");
header("Access-Control-Allow-Origin: http://www.mychessopening.com");
header("Vary: Origin");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$password_no_hash = $_POST["password"];
$resetId = $_POST["resetId"];

if (is_null($password_no_hash) || is_null($confirmId)){
    die("Invalid input");
}

$servername = "host";
$username = "user";
$password = "password";
$database = "db";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = 'SELECT * FROM toReset WHERE resetId = "'.$resetId.'"';
$result = $conn->query($sql);

if ($result->num_rows == 0){
    echo '{"message": "Invalid id"}';
}

while ($row = $result->fetch_assoc()){
    $email = $row["email"];
}

$pwd = password_hash($pass_no_hash, PASSWORD_DEFAULT);

$sql = 'UPDATE accounts SET password='.$pwd.' WHERE email="'.$email.'"';
$conn->query($sql);

$sql = 'SELECT id FROM accounts WHERE email="'.$email.'"';
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()){
    $id = $row["id"];
}

$sql = 'DELETE logged WHERE accountId="'.$id.'"';
$conn->query($sql);

echo '{"message":"Password reset sucessfully"}';

?>