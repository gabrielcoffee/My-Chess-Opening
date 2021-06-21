<?php
header("Access-Control-Allow-Origin: https://mychessopening.com");
header("Access-Control-Allow-Origin: https://www.mychessopening.com");
header("Access-Control-Allow-Origin: http://mychessopening.com");
header("Access-Control-Allow-Origin: http://www.mychessopening.com");
header("Vary: Origin");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$email = $_POST["email"];
$password_no_hash = $_POST["password"];

$servername = "host";
$username = "user";
$password = "password";
$database = "db";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = 'SELECT password FROM accounts WHERE email="'.$email.'"';

$result = $conn->query($sql);

if ($result->num_rows == 0){
    echo '{"error_msg":"inexistent email"}';
    exit(0);
}
else{
    while($row = $result->fetch_assoc()){
        $hashed_password = $row["password"];
    }
    $authenticated = password_verify($password_no_hash, $hashed_password);

    if ($authenticated){
        echo '{"error_msg":"none"}';
    }
    else{
        echo '{"error_msg":"wrong password"}';
    }
}

?>