function parseFen(moves, start){
    var board = new Chess();
    for (var move = start; move < start + 10; move++){
        try{
            board.move(moves[move]);
        }
        catch{
            return board.fen();
        }
    }
    return board.fen();
}
