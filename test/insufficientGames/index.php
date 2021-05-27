<?php
    session_start();
    if ($_SESSION["amountofgames"] == "100"){
        echo "<script>var messageText = '";
        echo "Since you had chosen 100 games, there is not a way for you to make this analysis, go play some games";
        echo "';</script>";
    }
    else{
        
        echo "<script>var messageText = '";
        echo "You can either reduce the amount of games or go play some more";
        echo "';</script>";
    }
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
            Not enough games
        </title>
    </head>
    <body>
        <h1>
            Not enough games for us to make a good analysis
        </h1>
        
        <li><a href="../../">Home</a></li>
        <li><a href="../../test/">Test</a></li>
        <li><a href="../../openings/">Openings</a></li>
        <li><a href="../../about/">About</a></li>

        <session>
            <!--
                TODO: ESCREVER UMA FRASE MELHOR AQUI KKKKKKKKKK
            -->
            <p id="message">
            </p>
        </session>

        <form method="POST" action="../loading/">
            <input type="text" name="username" placeholder="Type your username" id="username">
            <input id="lichess" type="radio" name="website" value="lichess.org"> 
            <label for="lichess">lichess.org</label>
            <input id="chess" type="radio" name="website" value="chess.com">  
            <label for="chess">chess.com</label>
            <label for="amount">Select the amount of games: </label>
            <select id="amount" name="amount">
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
            </select>
            <input type="submit" value="Analyse games">
        </form>

    </body>

    <script>
        document.getElementById("message").innerHTML = messageText;
    </script>

    <?php
        session_unset();
        session_destroy();
    ?>

</html>
