<?php
header("Access-Control-Allow-Origin: https://mychessopening.com");
header("Access-Control-Allow-Origin: https://www.mychessopening.com");
header("Access-Control-Allow-Origin: http://mychessopening.com");
header("Access-Control-Allow-Origin: http://www.mychessopening.com");
header("Vary: Origin");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

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
  die("no line");
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