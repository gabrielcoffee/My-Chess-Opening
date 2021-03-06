/* these variables are global because i couldn't declare then somewhere else
 * they need to be used inside two different functions while keeping their value */

var yearJoined;
var monthJoined;

// i'll use this variable as global because i'll need this data after the usage of these functions
var elo;

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

//this function will save the elo of the player as the average between the 3 clocks;
function saveHighestElo(obj){
    var bullet = obj.chess_bullet.last.rating;
    var blitz = obj.chess_blitz.last.rating;
    var rapid = obj.chess_rapid.last.rating;

    elo = (bullet+blitz+rapid)/3;
}

function getPlayerElo(){
    return elo;
}

// turns an pgn string into an array of moves
function split_moves(pgn){
    var moves = [];
    var pgn_elements_array = pgn.split(" ");
    for (var move = 29; move < pgn_elements_array.length; move += 4){ //a chess move comes at each 4 spaces after the 29th character
        moves.push(pgn_elements_array[move]);
    }
    return moves;   // this array contains every move of the game
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
    var url = "https://api.chess.com/pub/player/"+ username + "/stats";
    
    var fetcher = await fetch(url, {method: 'GET'})
    .then(function(playerData){
        if (!playerData.ok){
            throw new Error("Player not found");
        }
        return playerData.json();
    })
    .then(function (playerData){
        saveHighestElo(playerData);
        // this piece of code gets when the user first joined chess.com in order to set the time limit for our search
        var joined = playerData.joined;
        var joinedDate = new Date(joined * 1000);

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

// download the games and return a json object array
async function fetchGames(url){
    let fetcher = await fetch(url, {method: 'GET',})
    .then(function(response){
        return response.json();
    });
    
    return fetcher;
}

// the main function
async function load_games(username, amount){
    
    updateProgressMessage("Searching player");

    var isPlayerValid = await verifyPlayer(username);
    
    if (!isPlayerValid){
        location.href = "../playerNotFound";    // leads to a error message page
    }
    else{
        updateProgressMessage("Downloading games from chess.com API 0%");
    }

    var jsonGames = {"winsW": [], "winsB": [], "lossW": [], "lossB": []};
    
    var downloadedGames = 0;


    // gets the current date to start searching
    var data = new Date(Date.now());
    var year = data.getFullYear();
    var provisionalMonth =  data.getMonth();

    while (true){
        
        if (provisionalMonth == monthJoined && year == yearJoined){
            location.href = "../insufficientGames/";
            break;
        }

        var month = correctMonth(provisionalMonth); //date.getmonth() returns the actual month - 1;

        var url = "https://api.chess.com/pub/player/"+ username +"/games/" + year + month;

        let response = await fetchGames(url);
    
        var games = response.games;

        for (var i = 0; i < games.length; i++){

            // ignore other chess variants
            if (games[i].rules != "chess"){
                continue;
            }
            if (games[i].pgn.split(" ")[25].substr(0, 9) == "abandoned"){
                continue;
            }
            if (games[i].pgn.split(" ")[8].indexOf("SetUp") > 0){
                continue;
            }

            // separate the games
            if(games[i].white.username == username && games[i].white.result == "win" && winsBlack != quantityOfGames){
                if (jsonGames.winsW.length != quantityOfGames){
                    var gameMoves = split_moves(games[i].pgn);
                    if (gameMoves.length < 20){
                        continue;
                    }
                    jsonGames.winsW.push({"moves":gameMoves, "white": games[i].white.username, "black": games[i].black.username});
                    downloadedGames++;
                }
            }
            else if (games[i].black.username == username && games[i].black.result == "win" && winsWhite != quantityOfGames){
                if (jsonGames.winsB.length != quantityOfGames){
                    var gameMoves = split_moves(games[i].pgn);
                    if (gameMoves.length < 20){
                        continue;
                    }
                    jsonGames.winsB.push({"moves":gameMoves, "white": games[i].white.username, "black": games[i].black.username});
                    downloadedGames++;
                }
            }
            else if (games[i].white.username == username && games[i].black.result == "win" && losesWhite != quantityOfGames){
                if (jsonGames.lossW.length != quantityOfGames){
                    var gameMoves = split_moves(games[i].pgn);
                    if (gameMoves.length < 20){
                        continue;
                    }
                    jsonGames.lossW.push({"moves":gameMoves, "white": games[i].white.username, "black": games[i].black.username});
                    downloadedGames++;
                }
            }
            else if (games[i].black.username == username && games[i].white.result == "win" && losesBlack != quantityOfGames){
                if (jsonGames.lossB.length != quantityOfGames){
                    var gameMoves = split_moves(games[i].pgn);
                    if (gameMoves.length < 20){
                        continue;
                    }
                    jsonGames.lossB.push({"moves":gameMoves, "white": games[i].white.username, "black": games[i].black.username});
                    downloadedGames++;
                }
            }
        }

        updateProgressMessage("Downloading games from chess.com API " + ((downloadedGames / amount) * 100).toFixed(0) + "%");

        var winsWhite = jsonGames.winsW.length;
        var winsBlack = jsonGames.winsB.length;
        var losesWhite = jsonGames.lossW.length;
        var losesBlack = jsonGames.lossB.length;

        // breaks the loop when all the necessary games are gotten
        if (areGamesDone(winsWhite, winsBlack, losesWhite, losesBlack, quantityOfGames)){
            break;
        }

        if (provisionalMonth == 0){
            provisionalMonth = 11;
            year--;
        }
        else{
            provisionalMonth--;
        }
    }

    return jsonGames;

}
