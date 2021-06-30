<?php
header("Access-Control-Allow-Origin: https://mychessopening.com");
header("Access-Control-Allow-Origin: https://www.mychessopening.com");
header("Access-Control-Allow-Origin: http://mychessopening.com");
header("Access-Control-Allow-Origin: http://www.mychessopening.com");
header("Vary: Origin");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$servername = "host";
$username = "user";
$password = "password";
$database = "db";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = 'SELECT jsons FROM jsons';

$result = $conn->query($sql);

while ($row = $result->fetch_assoc()){
    echo $row['jsons'];
    echo "\n":
}

?>