function correctMonth(month){
    switch(month){
        case 0:
            return "/01";
        case 1:
            return "/02";
        case 2:
            return "/03";
        case 3:
            return "/04";
        case 4:
            return "/05";
        case 5:
            return "/06";
        case 6:
            return "/07";
        case 7:
            return "/08";
        case 8:
            return "/09";
        case 9:
            return "/10";
        case 10:
            return "/11";
        case 11:
            return "/12";
    }
}

function updateProgressMessage(newMessage){
    document.getElementById("status").innerHTML = newMessage;
}

function split_moves(pgn){
    var moves = [];
    var pgn_elements_array = pgn.split(" ");
    for (var move = 29; move < pgn_elements_array.length; move += 4){
        moves.push(pgn_elements_array[move]);
    }
    return moves;
}

async function verifyPlayer(username){
    var isPlayerValid = true;
    var url = "https://api.chess.com/pub/player/"+ username;
    
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

async function fetchGames(url){
    let fetcher = await fetch(url, {method: 'GET',})
    .then(function(response){
        return response.json();
    });
    
    return fetcher;
}

async function load_games(username, amount){
    
    updateProgressMessage("Searching player");

    var isPlayerValid = await verifyPlayer(username);

    if (!isPlayerValid){
        location.href = "../playerNotFound";
    }
    else{
        updateProgressMessage("Downloading games from chess.com API");
    }

    var data = new Date(Date.now());
    var year = data.getFullYear();
    var month = correctMonth(data.getMonth()); //date.getmonth() returns the actual month - 1;

    var url = "https://api.chess.com/pub/player/"+ username +"/games/" + year + month;

    let response = fetchGames(url);

    response.then(function(gamesJson){
        var wonGames = [];
        var games = gamesJson.games;
        for (var i = 0; i < gamesJson.games.length; i++){
            if (games[i].black.username == username && games[i].black.result == "win" ||
                games[i].white.username == username && games[i].white.result == "win"){
                wonGames.push(games[i]);
            }
        }
        // TODO add a way to verify that we could get a good amount of games with wonGames.length
        return wonGames;
    });
    response.then(function(gamesArray){
        var positions = [];
        for (var i = 0; i < gamesArray.games.length; i++){
            moves = split_moves(gamesArray.games[i].pgn);

            var board = new Chess();
            for (var move = 0; move <= 10; move++){
                board.move(moves[move]);
            }

            var fen = board.fen();
            console.log(fen);

            positions.push(fen);
        }
        return positions;

    });

    return response;
}
