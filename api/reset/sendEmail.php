<?php
header("Access-Control-Allow-Origin: https://mychessopening.com");
header("Access-Control-Allow-Origin: https://www.mychessopening.com");
header("Access-Control-Allow-Origin: http://mychessopening.com");
header("Access-Control-Allow-Origin: http://www.mychessopening.com");
header("Vary: Origin");
header("Access-Control-Allow-Methods: POST");

$email = $_POST["email"];

if (is_null($email)){
  die("Invalid input");
}

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

$resetId = rand_chars($letters, 32);

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = 'INSERT INTO toReset (email, resetId) VALUES ("'.$email.'","'.$resetId.'")';

$conn->query($sql);

$mymail = "accounts@mychessopening.com";
$subj = "Reset you password";
$message = '
  <html>
    <head>
      <title>Check your account</title>
    </head>
    <body>
      <p>
        You made a request to reset your password, to do so
        <a href="https://mychessopening.com/reset_password/createNewPassword?id='.$resetId.'">click this link</a>
        and create a new password
      </p>
      <p>
        If you did not request a password reset, please ignore this email
      </p>
    </body>
  </html>
';

$headers = "MIME-Version: 1.0" . "\r\n"; 
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n"; 
$headers .= 'From: '.$mymail; 

mail($email, $subj, $message, $headers);

?>