<?php
    session_start();

    echo "<script> \n";
    echo "var username = '";
    echo $_SESSION["playername"];
    echo "';\n var website = '";
    echo $_SESSION["sitename"];
    echo "';\n</script>";
    ?>
<!DOCTYPE html> 
<html>
    <head>
        <link rel="apple-touch-icon" sizes="57x57" href="../../icon/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="../../icon/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="../../icon/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="../../icon/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="../../icon/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="../../icon/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="../../icon/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="../../icon/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="../../icon/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="../../icon/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="../../icon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="../../icon/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="../../icon/favicon-16x16.png">
        <link rel="manifest" href="../../icon/manifest.json">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="../../icon/ms-icon-144x144.png">
        <meta name="theme-color" content="#ffffff">
        <meta charset="utf-8">

        <title>
        </title>

        <script>
            document.title = username + " not found";
        </script>
    </head>
    <body>
        <h1>
            Player Not Found
        </h1>

        <session id="message">
        </session>

        <form method="POST" action="../loading/">
            <input type="text" name="username" placeholder="Type your username" id="username">
            <input id="lichess" type="radio" name="website" value="lichess.org"> 
            <label for="lichess">lichess.org</label>
            <input id="chess" type="radio" name="website" value="chess.com">  
            <label for="chess">chess.com</label>
            <input type="submit" value="Analyse games">
        </form>

    </body>

    <script>
        var message = document.createElement("p");
        message.innerHTML = "We couldn't find player " + username + " in " + website +
        " database, check if the data is correct and try again";

        document.getElementById("message").appendChild(message);
    </script>
</html>
