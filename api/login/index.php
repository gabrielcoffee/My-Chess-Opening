<?php
header("Access-Control-Allow-Origin: https://mychessopening.com");
header("Access-Control-Allow-Origin: https://www.mychessopening.com");
header("Access-Control-Allow-Origin: http://mychessopening.com");
header("Access-Control-Allow-Origin: http://www.mychessopening.com");
header("Vary: Origin");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$email = $_POST["email"];
$password_no_hash = $_POST["password"];

if (is_null($email) || is_null($password_no_hash)){
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

$sql = 'SELECT id, password FROM accounts WHERE email="'.$email.'"';

$result = $conn->query($sql);

if ($result->num_rows == 0){
    echo '{"error_msg":"inexistent email"}';
    exit(0);
}
else{
    while($row = $result->fetch_assoc()){
        $hashed_password = $row["password"];
        $accountID = $row["id"];
    }
    $authenticated = password_verify($password_no_hash, $hashed_password);
    $today = date("Y-m-d H:i:s");
    $day = date("d", $today);
    $month = date("m", $today);
    $year = (int)date("Y", $today);
    $until = date("Y-m-d H:i:s", strval($year+1).'-'.$month.'-'.$day);

    $letters = ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890;

    function rand_chars($c, $l, $u = FALSE) {
        if (!$u) for ($s = '', $i = 0, $z = strlen($c)-1; $i < $l; $x = rand(0,$z), $s .= $c{$x}, $i++);
        else for ($i = 0, $z = strlen($c)-1, $s = $c{rand(0,$z)}, $i = 1; $i != $l; $x = rand(0,$z), $s .= $c{$x}, $s = ($s{$i} == $s{$i-1} ? substr($s,0,-1) : $s), $i=strlen($s));
        return $s;
    }

    $logId = rand_chars($letters, 8);
    
    if ($authenticated){
        $sql = 'INSERT INTO logged (accountId, logId, since, until) VALUES ('.$accountID.',"'.$logId.'","'.$today.'","'.$until.'")';
        $conn->query($sql);
        echo '{"error_msg":"none", "id":"'.$logId.'", "expires":"'.$until.'"}';
    }
    else{
        echo '{"error_msg":"wrong password"}';
    }
}

?>