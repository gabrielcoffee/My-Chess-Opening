<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");

header('Content-Type: application/json');

$line = $_GET["line"];

$servername = "host";
$username = "user";
$password = "password";
$database = "db";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if (is_null($line)){
  $sql = 'SELECT * FROM book';
}
else{
  $sql = 'SELECT * FROM book WHERE moves LIKE "'.$line.'%"';
}

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