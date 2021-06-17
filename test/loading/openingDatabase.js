var gamesAnalysed = 0;
var savedPos = new Object();

async function fetchLine(line){
    var bookMove;
    if (savedPos[line] != undefined){
        bookMove = savedPos[line];
    }
    else{        
        var baseUrl = "https://mychessopening.com/api/openings/bookMoves.php?line=";
        var fetcher = await fetch(baseUrl + line, {method: "GET"})
        .then(function(response){
            return response.json();
        });

        savedPos[line] = fetcher;
        
        bookMove = fetcher;
    }

    return bookMove;
}

async function checkGame(moves, directlyAppend=false, listToAppend=undefined){
    var line = "";

    var lastBookMove;
    var lastBookMoveNumber;

    for (var move = 0; move < moves.length; move++){
        if (move + 1 != moves.length){
            line += moves[move] + " ";
            
            var bookMove = await fetchLine(line + moves[move+1]);
            
            if (!bookMove.isBookMove){
                lastBookMoveNumber = move;
                lastBookMove = await fetchLine(line);
                break;
            }
        }
        else{
            lastBookMoveNumber = 0;
            lastBookMove = await fetchLine(line);
            break;
        }
    }

    gamesAnalysed++;
    
    updateProgressMessage("Identifying opening from game " + gamesAnalysed);

    var positionObject = {"opening": lastBookMove.positions[0].eco + " " + lastBookMove.positions[0].name + ", " + lastBookMove.positions[0].variation, "fen": parseFen(moves, lastBookMoveNumber)}

    if (directlyAppend){
        listToAppend.push(positionObject);
    }

    return positionObject;
}

function splitAmounts(amount){
    switch (amount){
        case 25:
            return 13;
        case 50:
            return 25;
        case 75:
            return 38;
        case 100:
            return 50;
    }
}

async function getLastBookMoves(games){
    var whiteWins = games.winsW;
    var blackWins = games.winsB;
    var whiteLosses = games.lossW;
    var blackLosses = games.lossB;

    var firstPart = splitAmounts(quantityOfGames);

    var positions = {"winsW": [], "winsB": [], "lossW": [], "lossB": []};

    for (var game = 0; game < firstPart; game++){
        checkGame(whiteWins[game], true, positions.winsW);
    }
    for (var game = firstPart; game < quantityOfGames; game++){
        positions.winsW.push(await checkGame(whiteWins[game]));
    }

    for (var game = 0; game < firstPart; game++){
        checkGame(blackWins[game], true, positions.winsB);
    }
    for (var game = firstPart; game < quantityOfGames; game++){
        positions.winsB.push(await checkGame(blackWins[game]));
    }

    for (var game = 0; game < firstPart; game++){
        checkGame(whiteLosses[game], true, positions.lossW);
    }
    for (var game = firstPart; game < quantityOfGames; game++){
        positions.lossW.push(await checkGame(whiteLosses[game]));
    }

    for (var game = 0; game < firstPart; game++){
        checkGame(blackLosses[game], true, positions.lossB);
    }
    for (var game = firstPart; game < quantityOfGames; game++){
        positions.lossB.push(await checkGame(blackLosses[game]));
    }

    return positions;
}