function mobilityBonus(){
    var bonus = [[-62,-53,-12,-4,3,13,22,28,33],
        [-48,-20,16,26,38,51,55,63,63,68,81,81,91,98],
        [-60,-20,2,3,3,11,22,31,40,40,41,48,57,57,62],
        [-30,-12,-8,-9,20,23,23,35,38,53,64,65,65,66,67,67,72,72,77,79,93,108,108,108,110,114,114,116]];

    
}

function mobilityWhite(fen){
    var mobilityValue = 0;
    
    var board = new Chess();
    
    for (var square = 0; square < 64; square++){      
        if (board.get(getSquareName(square)) != null){
            mobilityValue += mobilityBonus();
        }
    }
}

function mobilityBlack(fen){
    
}

function mobility(fen){
    return mobilityWhite(fen) - mobilityBlack(fen);
}