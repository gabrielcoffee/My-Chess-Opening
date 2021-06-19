<?php

// this file makes part of a program to evaluate all of the openings in the database
// it returns all of the games to a javascript file that will evaluate them and post the value
// since it has already fulfilled it purpose, i'll deny direct acess to it inside the site to avoid overworking the server

header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

$servername = "host";
$username = "user";
$password = "password";
$database = "db";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = 'SELECT * FROM book';

$result = $conn->query($sql);

$size = $result->num_rows;

if ($size > 0){
  echo '{"isBookMove": true, "bookPositions": '.$size.', "positions": [';
  
  $position = 1;
  while ($row = $result->fetch_assoc()){
    echo '{"eco": "'.$row["eco"].'", "name": "'.$row["opening"].'", "variation": "'.$row["variation"].'" , "moves": "';
    echo $row["moves"];
    if ($position != $size){
      echo '"},';
    }
    else{
      echo '"}';
    }
    $position = $position + 1;
  }
  echo "]}";
}
else{
  echo '{"isBookMove": false}';
}

?>