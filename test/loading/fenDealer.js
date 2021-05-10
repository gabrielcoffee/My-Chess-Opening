function parseFen(gamesJsonObj){
    updateProgressMessage("Extracting positions");

    var fenJson = {"winsW": [], "winsB": [], "lossW": [], "lossB": []};

    for (var i = 0; i < parseInt(amount) / 4; i++){
        var moves = gamesJsonObj.winsW[i];
        var board = new Chess();
        for (var move = 0; move < 20; move++){
            board.move(moves[move]);
        }
        fenJson.winsW.push(board.fen());
    }

    for (var i = 0; i < parseInt(amount) / 4; i++){
        var moves = gamesJsonObj.winsB[i];
        var board = new Chess();
        for (var move = 0; move < 20; move++){
            board.move(moves[move]);
        }
        fenJson.winsB.push(board.fen());
    }

    for (var i = 0; i < parseInt(amount) / 4; i++){
        var moves = gamesJsonObj.lossW[i];
        var board = new Chess();
        for (var move = 0; move < 20; move++){
            board.move(moves[move]);
        }
        fenJson.lossW.push(board.fen());
    }

    for (var i = 0; i < parseInt(amount) / 4; i++){
        var moves = gamesJsonObj.lossB[i];
        var board = new Chess();
        for (var move = 0; move < 20; move++){
            board.move(moves[move]);
        }
        fenJson.lossB.push(board.fen());
    }

    return fenJson;
}