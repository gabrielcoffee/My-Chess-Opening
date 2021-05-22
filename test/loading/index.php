<?php
    $username = $_POST['username'];
    $website = $_POST['website'];
    $amount = $_POST['amount'];

    session_start();
    $_SESSION["playername"] = $username;
    $_SESSION["sitename"] = $website;

    echo "<script> \n";
    
    echo "var username = '";
    echo $username;

    echo "';\nvar website = '";
    echo $website;

    echo "';\nvar amount = '";
    echo $amount;

    echo "';\n</script>";

    if ($website == "lichess.org"){
        echo "<script src='load_lichessorg.js'></script>\n";
    }
    else{
        echo "<script src='load_chesscom.js'></script>\n";
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
        
        <link rel="stylesheet" type="text/css" href="progress_bar.css">
        <link rel="stylesheet" type="text/css" href="background.css">

        <script>
            // changes the message displayed at the document h1
            function updateProgressMessage(newMessage){
                document.getElementById("status").innerHTML = newMessage;
            }
        </script>

        <script src="../../scripts/chess.js"></script>
        <script src="../../scripts/openingDatabase.js"></script>

        <script>        
            async function main(){    
                var gameMovesJSON = await load_games(username, amount);
                var fensJSON = getLastBookPosition(gameMovesJSON);

                console.log(gameMovesJSON);
            }
        </script>

        <title>
            MyChessOpening
        </title>
    </head>
    <body>
        <h1 id="status">
        </h1>

        <div class="lds-grid">
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
        </div>
    </body>

    <script>
        main();
    </script>

</html>
