<?php
header("Access-Control-Allow-Origin: https://mychessopening.com");
header("Access-Control-Allow-Origin: https://www.mychessopening.com");
header("Access-Control-Allow-Origin: http://mychessopening.com");
header("Access-Control-Allow-Origin: http://www.mychessopening.com");
header("Vary: Origin");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$user = $_POST["username"];
$email = $_POST["email"];
$pwd = $_POST["password"];

$servername = host";
$username = "user";
$password = "password";
$database = "db";

$letters = ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890;

function rand_chars($c, $l, $u = FALSE) {
    if (!$u) for ($s = '', $i = 0, $z = strlen($c)-1; $i < $l; $x = rand(0,$z), $s .= $c{$x}, $i++);
    else for ($i = 0, $z = strlen($c)-1, $s = $c{rand(0,$z)}, $i = 1; $i != $l; $x = rand(0,$z), $s .= $c{$x}, $s = ($s{$i} == $s{$i-1} ? substr($s,0,-1) : $s), $i=strlen($s));
    return $s;
}

$confirmId = rand_chars($letters, 32);
$today = date("Y-m-d H:i:s");

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = 'INSERT INTO notConfirmed (name, email, password, confirmation, created) VALUES ("'.$user.'","'.$email.'","'.$pwd.'","'.$confirmId.'","'.$today.'")';

$conn->query($sql);

echo $sql;

?>