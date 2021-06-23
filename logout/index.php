<?php
    $logId = $_GET["id"];

    $servername = "host";
    $username = "user";
    $password = "password";
    $database = "db";

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = 'DELETE FROM logged WHERE logId="'.$logId.'"';
    $conn->query($sql);

    ?>
<!DOCTYPE html>
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
            Logout
        </title>
    </head>
    <body>  
        <h1>Wait, we are logging you out</h1>
        <script>
            location.href="../";
        </script>
    </body>
</html>

