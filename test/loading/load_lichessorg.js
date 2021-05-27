var yearJoined;
var monthJoined;

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
    .then(function (playerData){
        if (!playerData.username != username){
            throw new Error("Try to check capital letters");
        }

        var joined = playerData.createdAt;
        var joinedDate = new Date(joined);

        yearJoined = joinedDate.getFullYear();
        monthJoined = joinedDate.getMonth();

        // subtract 1 from the month to make sure that the first month is included
        if (monthJoined == 0){
            monthJoined = 11;
            yearJoined--;
        }
        else{
            monthJoined--;
        }

        return playerData;
    })
    .catch(e => isPlayerValid = false);
    return isPlayerValid;
}

function currentBatch(timestamp){
    return "?since=" + timestamp + "&until=" + (timestamp + 2678400000);
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
        return response.text();
    })
    .then(function(text){
        newtext = text.split("\n");
        gamesJson = {"games": []};
        for (var i = 0; i < newtext.length - 1; i++){
            gamesJson.games.push(JSON.parse(newtext[i]));
        }
        return gamesJson;
    });
    
    return fetcher;
}

function areGamesDone(winsWhite, winsBlack, losesWhite, losesBlack, quantityOfGames){
    if (winsWhite == quantityOfGames && winsBlack == quantityOfGames && losesBlack == quantityOfGames && losesWhite == quantityOfGames){
        return true;
    }
    return false;
}

async function load_games(username, amount)
{
    
    updateProgressMessage("Searching player");

    var isPlayerValid = await verifyPlayer(username);

    if (!isPlayerValid){
        location.href = "../playerNotFound";
    }
    else{
        updateProgressMessage("Downloading games from lichess.org API");
    }

    var baseUrl = "https://lichess.org/api/games/user/" + username;

    var jsonGames = {"winsW": [], "winsB": [], "lossW": [], "lossB": []};
    
    var downloadedGames = 0;

    updateProgressMessage("Downloading games from lichess.org API 0%");

    // gets the current date to start searching
    var today = new Date(Date.now());
    var thisMonth = today.getMonth();
    var thisYear = today.getFullYear();

    while (true){
        if (thisMonth == monthJoined && thisYear == yearJoined){
            // TODO create redirect page
            updateProgressMessage("Vai jogá fi");
            break;
        }

        var currentDate = new Date(thisYear, thisMonth);

        let response = await fetchGames(baseUrl + currentBatch(currentDate.getTime()));

        var games = response.games;

        for (var i = 0; i < games.length; i++){
            
            if (games[i].variant != "standard"){
                continue;
            }
            if (games[i].players.white.hasOwnProperty("aiLevel") || games[i].players.black.hasOwnProperty("aiLevel")){
                continue;
            }

            if (games[i].winner == "white" && games[i].players.white.user.name == username){
                if (jsonGames.winsW.length != quantityOfGames){
                    var gameSplited = games[i].moves.split(" ");
                    if (gameSplited.lenght < 15){
                        continue;
                    }
                    jsonGames.winsW.push(gameSplited);
                    downloadedGames++;
                }
            }
            else if (games[i].winner == "black" && games[i].players.black.user.name == username){
                if (jsonGames.winsB.length != quantityOfGames){
                    var gameSplited = games[i].moves.split(" ");
                    if (gameSplited.lenght < 15){
                        continue;
                    }
                    jsonGames.winsB.push(gameSplited);
                    downloadedGames++;
                }
            }
            else if (games[i].winner == "white" && games[i].players.black.user.name == username){
                if (jsonGames.lossW.length != quantityOfGames){
                    var gameSplited = games[i].moves.split(" ");
                    if (gameSplited.lenght < 15){
                        continue;
                    }
                    jsonGames.lossW.push(gameSplited);
                    downloadedGames++;
                }
            }
            else if(games[i].winner == "black" && games[i].players.white.user.name == username){
                if (jsonGames.lossB.length != quantityOfGames){
                    var gameSplited = games[i].moves.split(" ");
                    if (gameSplited.lenght < 15){
                        continue;
                    }
                    jsonGames.lossB.push(gameSplited);
                    downloadedGames++;
                }
            }
        }

        updateProgressMessage("Downloading games from lichess.org API " + ((downloadedGames / amount) * 100).toFixed(0) + "%");

        var winsWhite = jsonGames.winsW.length;
        var winsBlack = jsonGames.winsB.length;
        var losesWhite = jsonGames.lossW.length;
        var losesBlack = jsonGames.lossB.length;

        if (areGamesDone(winsWhite, winsBlack, losesWhite, losesBlack, quantityOfGames)){
            break;
        }        

        
        if (thisMonth == 0){
            thisMonth = 11;
            thisYear--;
        }
        else{
            thisMonth--;
        }

    }

    return jsonGames;
}
