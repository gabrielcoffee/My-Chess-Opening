// converts the Date.month() output to our known months
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

// turns an pgn string into an array of moves
function split_moves(pgn){
    var moves = [];
    var pgn_elements_array = pgn.split(" ");
    for (var move = 29; move < pgn_elements_array.length; move += 4){
        moves.push(pgn_elements_array[move]);
    }
    return moves;
}

// checks if we got enough games for each result
function areGamesDone(winsWhite, winsBlack, losesWhite, losesBlack, quantityOfGames){
    if (winsWhite == quantityOfGames && winsBlack == quantityOfGames && losesBlack == quantityOfGames && losesWhite == quantityOfGames){
        return true;
    }
    return false;
}

// checks if the player exists
async function verifyPlayer(username){
    var isPlayerValid = true;
    var url = "https://api.chess.com/pub/player/"+ username;
    
    var fetcher = await fetch(url, {method: 'GET'})
    .then(function(playerData){
        if (!playerData.ok){
            sessionStorage.clear();
            throw new Error("Player not found");
        }
        return playerData.json();
    })
    .then(function (playerData){
        var joined = playerData.joined;
        var joinedDate = new Date(joined * 1000);

        yearJoined = joinedDate.getFullYear();
        monthJoined = joinedDate.getMonth();

        return playerData;
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

    var quantityOfGames = parseInt(amount) / 4;

    console.log(amount);
    console.log(quantityOfGames);

    var yearJoined;
    var monthJoined;

    try{
        sessionStorage.setItem("game", '{"winsW": [], "winsB": [], "lossW": [], "lossB": []}');
    }
    catch{
        // TODO criar uma mensagem ou uma pagina de erro avisando ao usuário para ativar o sessionStorage do seu navegador
    }
    
    updateProgressMessage("Downloading games from chess.com API");


    var batch = 0;

    while (true){
        var data = new Date(Date.now());
        var year = data.getFullYear();
        var provisionalMonth =  data.getMonth() - batch;

        //tem um erro aqui, não fiz a verificação para o -2 em diante...
        // preciso converter numeros negativos para o modulo deles entre 0 a 12
        if (provisionalMonth == -1){
            provisionalMonth = 11;
            year -= 1;
        }

        if (provisionalMonth == monthJoined && year == yearJoined){
            updateProgressMessage("Vai jogá fi");
            break;
        }

        var month = correctMonth(provisionalMonth); //date.getmonth() returns the actual month - 1;

        var url = "https://api.chess.com/pub/player/"+ username +"/games/" + year + month;
    
        let response = fetchGames(url);

        console.log(url)
    
        response.then(function(gamesJson){
            var games = gamesJson.games;
            for (var i = 0; i < gamesJson.games.length; i++){
                if (games[i].black.username == username && games[i].black.result == "win" && winsWhite != quantityOfGames){
                    var jsonGames = JSON.parse(sessionStorage.getItem("game"));
                    jsonGames.winsW.push(split_moves(games[i].pgn));
                    sessionStorage.setItem("game", JSON.stringify(jsonGames));
                }
                else if(games[i].white.username == username && games[i].white.result == "win" && winsBlack != quantityOfGames){
                    var jsonGames = JSON.parse(sessionStorage.getItem("game"));
                    jsonGames.winsB.push(split_moves(games[i].pgn));
                    sessionStorage.setItem("game", JSON.stringify(jsonGames));
                }
                else if (games[i].white.username == username && games[i].black.result == "win" && losesWhite != quantityOfGames){
                    var jsonGames = JSON.parse(sessionStorage.getItem("game"));
                    jsonGames.lossW.push(split_moves(games[i].pgn));
                    sessionStorage.setItem("game", JSON.stringify(jsonGames));
                }
                else if (games[i].black.username == username && games[i].white.result == "win" && losesBlack != quantityOfGames){
                    var jsonGames = JSON.parse(sessionStorage.getItem("game"));
                    jsonGames.lossB.push(split_moves(games[i].pgn));
                    sessionStorage.setItem("game", JSON.stringify(jsonGames));
                }
            }
        });

        batch++;

        var gamesJson = JSON.parse(sessionStorage.getItem("game"));

        // BUG: these values are always 0 ????
        var winsWhite = gamesJson.winsW.length;
        var winsBlack = gamesJson.winsB.length;
        var losesWhite = gamesJson.lossW.length;
        var losesBlack = gamesJson.lossB.length;

        console.log(winsBlack);
        console.log(winsWhite);
        console.log(losesBlack);
        console.log(losesWhite);

        if (areGamesDone(winsWhite, winsBlack, losesWhite, losesBlack, quantityOfGames)){
            updateProgressMessage("foi");
            break;
        }
        break;
    }

}
