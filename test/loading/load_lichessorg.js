function updateProgressMessage(newMessage)
{
    document.getElementById("status").innerHTML = newMessage;
}

async function verifyPlayer(username)
{
    var isPlayerValid = true;
    var url = "https://lichess.org/api/user/"+ username;

    var fetcher = await fetch(url, {method: 'GET'})
    .then(function(playerData){
        if (!playerData.ok){
            throw new Error("Player not found");
        }
        return playerData.json();
    })
    .catch(e => isPlayerValid = false);
    return isPlayerValid;
}

async function fetchGames(url)
{
    var myHeader = new Headers({'Accept': 'application/x-ndjson'});

    var myInit = {
        method: 'GET',
        headers: myHeader,
    };

    let fetcher = await fetch(url, myInit)
    .then(function(response){
        return response.json();
    });
    
    return fetcher;
}

async function load_games(username)
{
    
    updateProgressMessage("Searching player");

    var isPlayerValid = await verifyPlayer(username);

    if (!isPlayerValid){
        location.href = "../playerNotFound";
    }
    else{
        updateProgressMessage("Downloading games from lichess.org API");
    }

    var url = "https://lichess.org/api/games/user/" + username + "?max=20";

    let response = fetchGames(url);

    response.then(function(gamesJson){
        console.log(gamesJson);
        var wonGames = [];
        var games = gamesJson.games;
        for (var i = 0; i < gamesJson.games.length; i++){
            if (games[i].black.username == username && games[i].black.result == "win" ||
                games[i].white.username == username && games[i].white.result == "win"){
                wonGames.push(games[i]);
            }
        }
        // add a way to verify that we could get a good amount of games with wonGames.length
        return wonGames;
    });
    response.then(function(gamesArray){
        for (var i = 0; i < gamesArray.games.length; i++){
            console.log(gamesArray.games[i].pgn);
        }
        
    });

    return response;
}