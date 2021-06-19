const movesForward = 16;

function parseFen(moves, start){
    var board = new Chess();
    for (var move = 0; move < start + movesForward; move++){
        try{
            board.move(moves[move]);
        }
        catch{
            return board.fen();
        }
    }
    return board.fen();
}

function getFen(moves){
    var board = new Chess();
    for (var move = 0; move < moves.length; move++){
        try{
            board.move(moves[move]);
        }
        catch{
            return board.fen();
        }
    }
    return board.fen();
}
