<?php

header("Access-Control-Allow-Origin: https://mychessopening.com");
header("Access-Control-Allow-Origin: https://www.mychessopening.com");
header("Access-Control-Allow-Origin: http://mychessopening.com");
header("Access-Control-Allow-Origin: http://www.mychessopening.com");
header("Vary: Origin");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

$id = $_GET["confirmId"];

if (strlen($id) != 32){
    header('Status: 302 Moved Temporaly', false, 302);
    header('Location: ../');
}

$servername = "host";
$username = "user";
$password = "password";
$database = "db";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = 'SELECT * FROM notConfirmed WHERE confirmation="'.$id.'"';

$result = $conn->query($sql);

if ($result->num_rows == 0){
    echo '
        <html>
            <head>
                <link rel="apple-touch-icon" sizes="57x57" href="../icon/apple-icon-57x57.png">
                <link rel="apple-touch-icon" sizes="60x60" href="../icon/apple-icon-60x60.png">
                <link rel="apple-touch-icon" sizes="72x72" href="../icon/apple-icon-72x72.png">
                <link rel="apple-touch-icon" sizes="76x76" href="../icon/apple-icon-76x76.png">
                <link rel="apple-touch-icon" sizes="114x114" href="../icon/apple-icon-114x114.png">
                <link rel="apple-touch-icon" sizes="120x120" href="../icon/apple-icon-120x120.png">
                <link rel="apple-touch-icon" sizes="144x144" href="../icon/apple-icon-144x144.png">
                <link rel="apple-touch-icon" sizes="152x152" href="../icon/apple-icon-152x152.png">
                <link rel="apple-touch-icon" sizes="180x180" href="../icon/apple-icon-180x180.png">
                <link rel="icon" type="image/png" sizes="192x192"  href="../icon/android-icon-192x192.png">
                <link rel="icon" type="image/png" sizes="32x32" href="../icon/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="96x96" href="../icon/favicon-96x96.png">
                <link rel="icon" type="image/png" sizes="16x16" href="../icon/favicon-16x16.png">
                <link rel="manifest" href="../icon/manifest.json">
                <meta name="msapplication-TileColor" content="#ffffff">
                <meta name="msapplication-TileImage" content="../icon/ms-icon-144x144.png">
                <meta name="theme-color" content="#ffffff">
                <meta charset="utf-8">
                <title>
                    Error on confirmation
                </title>
            </head>
            <body>
                <header>
                    <h1>MyChessOpening</h1>
                    <nav>
                        <ul>
                            <li><a href="../">Home</a></li>
                            <li><a href="../test/">Test</a></li>
                            <li href="../openings/">Openings</li>
                            <li href="../about/">About</li>
                        </ul>
                    </nav>
                </header>
                <p>This confirmation link is invalid or this account has already been confirmed. If you have created an account, please try to <a href="../login/">login</a></p>
            </body>

        </html>
    ';
}
else{
    while ($row = $result->fetch_assoc()){
        $sql = 'INSERT INTO accounts (name, surname, email, password, created) VALUES ("'.$row["name"].'","'.$row["surname"].'","'.$row["email"].'","'.$row["password"].'","'.$row["created"].'")';
        $conn->query($sql);
        $sql = 'DELETE FROM `notConfirmed` WHERE `notConfirmed`.`id` ='.$row["id"];
        $conn->query($sql);
        $firstname = $row["name"];
    }
    echo '
        <html>
            <head>
                <link rel="apple-touch-icon" sizes="57x57" href="../icon/apple-icon-57x57.png">
                <link rel="apple-touch-icon" sizes="60x60" href="../icon/apple-icon-60x60.png">
                <link rel="apple-touch-icon" sizes="72x72" href="../icon/apple-icon-72x72.png">
                <link rel="apple-touch-icon" sizes="76x76" href="../icon/apple-icon-76x76.png">
                <link rel="apple-touch-icon" sizes="114x114" href="../icon/apple-icon-114x114.png">
                <link rel="apple-touch-icon" sizes="120x120" href="../icon/apple-icon-120x120.png">
                <link rel="apple-touch-icon" sizes="144x144" href="../icon/apple-icon-144x144.png">
                <link rel="apple-touch-icon" sizes="152x152" href="../icon/apple-icon-152x152.png">
                <link rel="apple-touch-icon" sizes="180x180" href="../icon/apple-icon-180x180.png">
                <link rel="icon" type="image/png" sizes="192x192"  href="../icon/android-icon-192x192.png">
                <link rel="icon" type="image/png" sizes="32x32" href="../icon/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="96x96" href="../icon/favicon-96x96.png">
                <link rel="icon" type="image/png" sizes="16x16" href="../icon/favicon-16x16.png">
                <link rel="manifest" href="../icon/manifest.json">
                <meta name="msapplication-TileColor" content="#ffffff">
                <meta name="msapplication-TileImage" content="../icon/ms-icon-144x144.png">
                <meta name="theme-color" content="#ffffff">
                <meta charset="utf-8">
                <title>
                    '.$firstname.' account successfully confirmed
                </title>
            </head>
            <body>
                <header>
                    <h1>MyChessOpening</h1>
                    <nav>
                        <ul>
                            <li><a href="../">Home</a></li>
                            <li><a href="../test/">Test</a></li>
                            <li href="../openings/">Openings</li>
                            <li href="../about/">About</li>
                        </ul>
                    </nav>
                </header>

                <p>'.$firstname.', your account has been successfully confirmed, you can already start <a href="../test/">analysing your games</a></p>
            </body>
        </html>
    ';
}

?>