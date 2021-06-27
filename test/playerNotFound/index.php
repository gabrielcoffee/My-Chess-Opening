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

        <link rel="stylesheet" type="text/css" href="../../styles/profileMenu.css">

        <script src="../../scripts/accounts.js"></script>
        <script src="../../scripts/errormessages.js"></script>

        <script>

            async function verifyPlayerLichess(name){
                var isPlayerValid = true;
                var url = "https://lichess.org/api/user/"+ username;

                var fetcher = await fetch(url, {method: 'GET'})
                .then(function(playerData){
                    console.log(playerData.ok);
                    if (!playerData.ok){
                        throw new Error("Player not found");
                    }
                    return playerData.json();
                })
                .catch(function(err){
                    isPlayerValid = false;
                });
                return isPlayerValid;
            }

            async function verifyPlayerChessCom(name){
                var isPlayerValid = true;
                var url = "https://api.chess.com/pub/player/"+ name;
                
                var fetcher = await fetch(url, {method: 'GET'})
                .then(function(playerData){
                    if (!playerData.ok){
                        throw new Error("Player not found");
                    }
                    return playerData.json();
                })
                .catch(function(err){
                    isPlayerValid = false;
                });
                return isPlayerValid;
            }

            async function checkRedirecting(){
                if (website == "lichess.org"){
                    if (await verifyPlayerLichess(username)){
                        location.href = "../searchInterrupted";
                    }
                    else{
                        playerNotFound(username, website);
                    }
                }   
                else{
                    if (await verifyPlayerChessCom(username)){
                        location.href = "../searchInterrupted";
                    }
                    else{
                        playerNotFound(username, website);
                    }
                }
            }

            checkRedirecting();        
        </script>

        <title>
            Something went wrong
        </title>

    </head>

    <body>
        <header>
            <h1>MyChessOpening</h1>
            <div id="profile">

            </div>
            <nav>
                <ul>
                    <li><a href="../../">Home</a></li>
                    <li><a href="../../test/">Test</a></li>
                    <li href="../../openings/">Openings</li>
                    <li href="../../about/">About</li>
                </ul>
            </nav>
        </header>

        <h2>Player not found</h2>
    </body>
    
    <script>
        async function main(){
            var profiler = await profile();
            if (!profiler){
                location.href = "../../";
            }
        }

        main();
    </script>

    <?php
        session_unset();
        session_destroy();
    ?>
</html>
