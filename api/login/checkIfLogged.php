<?php
header("Access-Control-Allow-Origin: https://mychessopening.com");
header("Access-Control-Allow-Origin: https://www.mychessopening.com");
header("Access-Control-Allow-Origin: http://mychessopening.com");
header("Access-Control-Allow-Origin: http://www.mychessopening.com");
header("Vary: Origin");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$loginId = $_POST["loginId"];

if (is_null($loginId)){
  die("No id provided");
}

$servername = "host";
$username = "user";
$password = "password";
$database = "db";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = 'SELECT accountId FROM logged WHERE logId="'.$loginId.'"';
$result = $conn->query($sql);

if ($result->num_rows == 0){
    echo '{"logged": false}';
}
else{
  while ($row = $result->fetch_assoc()){
    $accountId = $row["accountId"];
  }
  $sql = 'SELECT name FROM accounts WHERE id="'.$accountId.'"';
  $result = $conn->query($sql);
  while ($row = $result->fetch_assoc()){
    $name = $row["name"];
  }
  echo '{"logged": true, "name": "'.$name.'"}';
}

?>