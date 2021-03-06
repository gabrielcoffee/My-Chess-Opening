<?php
    session_start();
    
    $username = $_POST['username'];
    $website = $_POST['website'];
    $amount = $_POST['amount'];

    if ($website == "lichess.org"){
        echo "<script src='load_lichessorg.js'></script>\n";
    }
    else if ($website == "chess.com"){
        echo "<script src='load_chesscom.js'></script>\n";
    }
    else{
        echo "<script>location.href = '../invalidValue/'</script>";
    }

    if ($amount == "100" or $amount == "200" or $amount == "300" or $amount == "400"){
        echo "<script> \n";
    
        echo "var username = '";
        echo $username;
    
        echo "';\nvar website = '";
        echo $website;
    
        echo "';\nvar amount = '";
        echo $amount;
    
        echo "';\n</script>";
    }
    else{
        echo "<script>location.href = '../invalidValue/'</script>";
    }

    $_SESSION["playername"] = $username;
    $_SESSION["sitename"] = $website;
    $_SESSION["amountofgames"] = $amount;

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
                document.title = newMessage;
                document.getElementById("status").innerHTML = newMessage;
            }

            var quantityOfGames = parseInt(amount) / 4;  //this value needs to be divided by 4 because there are 4 possible sub-results 
        </script>

        <script src="nn.js"></script>
        <script src="cluster.js"></script>
        <script src="evaluater.js"></script>
        <script src="openingDatabase.js"></script>
        <script src="../../scripts/chess.js"></script>
        <script src="../../scripts/utils.js"></script>
        <script src="../../scripts/accounts.js"></script>
        <script src="../../scripts/fenDealer.js"></script>
        <script src="../../scripts/evaluation/threats.js"></script>
        <script src="../../scripts/evaluation/mobility.js"></script>
        <script src="../../scripts/evaluation/taperedEval.js"></script>

        <!-- importing tensorflow -->
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"> </script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis/dist/tfjs-vis.umd.min.js"></script>

        <script>        
            async function main(){    
                var gameMovesJSON = await load_games(username, amount);
                var fensJSON = await getLastBookMoves(gameMovesJSON);
                var evaluatedPositions = addEvaluation(fensJSON);
                var clusteredPositions = distribute(evaluatedPositions);
                clusteredPositions.playerName = username;
                clusteredPositions.playerElo = getPlayerElo();

                var model = await createModel(amount);
                var result = model.makePrediction(clusteredPositions.winsW);
                
                var data = new FormData();
                data.append("pos", JSON.stringify(clusteredPositions));
                data.append("qntt", amount);
                data.append("threats", results[0]);
                data.append("mobility", results[1]);
                data.append("name", username);
                data.append("user", getCookie("username"));
                data.append("elo", getPlayerElo());
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://mychessopening.com/api/analysis/insert.php", true); 
                xhr.onreadystatechange = function () {
                    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                        location.href = "https://mychessopening.com/result?a="xhr.responseText;
                    }
                }
                xhr.send(data);
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
