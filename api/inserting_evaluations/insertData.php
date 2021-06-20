<?php

// this page was only created to populate the threats and mobility columns at the openings database
// since it has already fulfilled it purpose, i'll deny direct acess to it inside the site to avoid overworking the server

header("Access-Control-Allow-Methods: POST");

$servername = "host";
$username = "user";
$password = "password";
$database = "db";

$mob = $_POST["mobility"];
$thr = $_POST["threats"];
$id = $_POST["id"];

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = 'UPDATE book SET mobility='.$mob.', threats='.$thr.' WHERE id='.$id;

$result = $conn->query($sql);

echo $sql;
?>