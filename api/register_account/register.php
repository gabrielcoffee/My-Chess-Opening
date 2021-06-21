<?php
header("Access-Control-Allow-Origin: https://mychessopening.com");
header("Access-Control-Allow-Origin: https://www.mychessopening.com");
header("Access-Control-Allow-Origin: http://mychessopening.com");
header("Access-Control-Allow-Origin: http://www.mychessopening.com");
header("Vary: Origin");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$userfirstname = $_POST["firstname"];
$userlastname = $_POST["lastname"];
$email = $_POST["email"];
$pass_no_hash = $_POST["password"];

$pwd = password_hash($pass_no_hash, PASSWORD_DEFAULT);

$servername = "host";
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

$sql = 'INSERT INTO notConfirmed (name, surname, email, password, confirmation, created) VALUES ("'.$userfirstname.'","'.$userlastname.'","'.$email.'","'.$pwd.'","'.$confirmId.'","'.$today.'")';

$conn->query($sql);

$mymail = "accounts@mychessopening.com";
$subj = "Verify your account";
$message = '
  <html>
    <head>
      <title>Check your account</title>
    </head>
    <body>
      <p>
        To start using MyChessOpening you have to verify your
        email account by <a href="https://mychessopening.com/confirm?confirmId='.$confirmId.'">clicking this link</a>
      </p>
    </body>
  </html>
';

$headers = "MIME-Version: 1.0" . "\r\n"; 
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n"; 
$headers .= 'From: '.$mymail; 

mail($email, $subj, $message, $headers);

echo $userfirstname;

?>