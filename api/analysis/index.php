<?php
header("Access-Control-Allow-Origin: https://mychessopening.com");
header("Access-Control-Allow-Origin: https://www.mychessopening.com");
header("Access-Control-Allow-Origin: http://mychessopening.com");
header("Access-Control-Allow-Origin: http://www.mychessopening.com");
header("Vary: Origin");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$pos = $_POST["pos"];


if (is_null($pos)){
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

$sql = 'INSERT INTO jsons (jsons) VALUES ("'.addslashes($pos).'")';

$result = $conn->query($sql);

echo $sql;

?>