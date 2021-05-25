var gamesAnalysed = 0;

async function fetchLine(line){
    var baseUrl = "https://mychessopening.com/api/openings/bookMoves.php?line=";
    var fetcher = await fetch(baseUrl + line, {method: "GET"})
    .then(function(response){
        return response.json();
    })

    return fetcher;
}

async function checkGameWW(moves){
    var line = "";

    var lastBookMove;

    for (var move = 0; move < moves.length; move++){
        if (move + 1 != moves.length){
            line += moves[move] + " ";
            
            var bookMove = await fetchLine(line + moves[move+1]);
            
            if (!bookMove.isBookMove){
                lastBookMove = await fetchLine(line);
                break;
            }
        }
        else{
            lastBookMove = await fetchLine(line);
            break;
        }
    }

    gamesAnalysed++;
    updateProgressMessage("Identifying opening from game " + gamesAnalysed);
    positions.winsW.push(lastBookMove);
}

async function checkGameWL(moves){
    var line = "";

    var lastBookMove;

    for (var move = 0; move < moves.length; move++){
        if (move + 1 != moves.length){
            line += moves[move] + " ";
            
            var bookMove = await fetchLine(line + moves[move+1]);
            
            if (!bookMove.isBookMove){
                lastBookMove = await fetchLine(line);
                break;
            }
        }
        else{
            lastBookMove = await fetchLine(line);
            break;
        }
    }

    gamesAnalysed++;
    updateProgressMessage("Identifying opening from game " + gamesAnalysed);
    positions.lossW.push(lastBookMove);
}

async function checkGameBW(moves){
    var line = "";

    var lastBookMove;

    for (var move = 0; move < moves.length; move++){
        if (move + 1 != moves.length){
            line += moves[move] + " ";
            
            var bookMove = await fetchLine(line + moves[move+1]);
            
            if (!bookMove.isBookMove){
                lastBookMove = await fetchLine(line);
                break;
            }
        }
        else{
            lastBookMove = await fetchLine(line);
            break;
        }
    }

    gamesAnalysed++;
    updateProgressMessage("Identifying opening from game " + gamesAnalysed);
    positions.winsB.push(lastBookMove);
}

async function checkGameBL(moves){
    var line = "";

    var lastBookMove;

    for (var move = 0; move < moves.length; move++){
        if (move + 1 != moves.length){
            line += moves[move] + " ";
            
            var bookMove = await fetchLine(line + moves[move+1]);
            
            if (!bookMove.isBookMove){
                lastBookMove = await fetchLine(line);
                break;
            }
        }
        else{
            lastBookMove = await fetchLine(line);
            break;
        }
    }

    gamesAnalysed++;
    updateProgressMessage("Identifying opening from game " + gamesAnalysed);
    positions.lossB.push(lastBookMove);
}

async function getLastBookMoves(games){
    var whiteWins = games.winsW;
    var blackWins = games.winsB;
    var whiteLosses = games.lossW;
    var blackLosses = games.lossB;


    for (var game = 0; game < quantityOfGames; game++){
        checkGameWW(whiteWins[game]);
        checkGameBW(blackWins[game]);
        checkGameWL(whiteLosses[game]);
        checkGameBL(blackLosses[game]);
    }
}