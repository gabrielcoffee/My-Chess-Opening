var gamesAnalysed = 0;
var baseUrl = "https://mychessopening.com/api/openings/bookMoves.php?line=";

async function fetchLine(line){
    var fetcher = await fetch(baseUrl + line, {method: "GET"})
    .then(function(response){
        return response.json();
    })

    return fetcher;
}

async function checkGame(moves){
    gamesAnalysed++;
    updateProgressMessage("Identifying opening from game " + gamesAnalysed);

    var line = "";

    for (var move = 0; move < moves.length; move++){
        line += moves[move] + " ";

        var bookMove = await fetchLine(line);

        if (!bookMove.isBookMove){
            break;
        }

        console.log(bookMove);
    }
}

async function getLastBookMoves(games){
    var whiteWins = games.winsW;
    var blackWins = games.winsB;
    var whiteLosses = games.lossW;
    var blackLosses = games.lossB;

    for (var game = 0; game < whiteWins.length; game++){
        await checkGame(whiteWins[game]);
    }
}