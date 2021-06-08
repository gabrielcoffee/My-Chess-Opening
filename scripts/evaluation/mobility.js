function pinnedDirectionWhite(pos, square){
    if (pos.get(cartezianToSquare(square.x, square.y)) == null){
        return 0;
    }
    var color = 1;
    if ("PNBRQK".indexOf(pos.get(cartezianToSquare(square.x, square.y))) < 0){
        color = -1;
    }
    for (var i = 0; i < 8; i++){
        var ix = (i + (i > 3)) % 3 - 1;
        var iy = (((i + (i > 3)) / 3) << 0) - 1;
        var king = false;
        for (var d = 1; d < 8; d++){
            var piece =  pos.get(cartezianToSquare(square.x + d * ix, square.y + d * iy));
            if (piece == "K"){
                king = true;
            }
            if (piece != null){
                break;
            }
        }
        if (king){
            for (var d = 1; d < 8; d++){
                var piece =  pos.get(cartezianToSquare(square.x - d * ix, square.y - d * iy));
                if (piece == "q"
                || piece == "b" && ix * iy != 0
                || piece == "r" && ix * iy == 0){
                    return Math.abs(ix + iy * 3) * color;
                }
                if (piece != null){
                    break;
                }
            }
        }
    }
    return 0;
}

function blockerForKingWhite(pos, square){
    if (pinnedDirectionWhite(pos, square)){
        return true;
    }
    return false;
}

function mobilityAreaWhite(pos, square){
    if (pos.get(cartezianToSquare(square.x, square.y)) == "K"){
        return 0;
    }
    if (pos.get(cartezianToSquare(square.x, square.y)) == "Q"){
        return 0;
    }
    if (pos.get(cartezianToSquare(square.x - 1, square.y + 1)) == "p"){
        return 0;
    }
    if (pos.get(cartezianToSquare(square.x + 1, square.y + 1)) == "p"){
        return 0;
    }
    if (pos.get(cartezianToSquare(square.x + 1, square.y + 1)) == "P" &&
        (square.y < 4 || pos.get(square.x, square.y + 1) != null)){
        return 0;
    }
    if (blockerForKingWhite(pos, {x: square.x, y: 7-square.y})){
        return 0;
    }
    return 1;
}

function mobilityWhite(pos, piece){
    var v = 0;
    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            var position = {x:x, y:y};

            if (!mobilityAreaWhite(pos, position)){
                continue;
            }
            if (piece == "N" && knightAttack() && pos.get(cartezianToSquare(x, y)) != "Q"){
                v++;
            }
            
            

        }
    }



    return v;
}

function mobilityBonusWhite(pos, square){
    var bonus = [[-62,-53,-12,-4,3,13,22,28,33],
        [-48,-20,16,26,38,51,55,63,63,68,81,81,91,98],
        [-60,-20,2,3,3,11,22,31,40,40,41,48,57,57,62],
        [-30,-12,-8,-9,20,23,23,35,38,53,64,65,65,66,67,67,72,72,77,79,93,108,108,108,110,114,114,116]];

    var i = "NBRQ".indexOf(pos.get(getSquareName(square)));

    if (i < 0){
        return 0;
    }
    return bonus[i][mobility(pos, i)];    
}

function mobilityWhite(fen){
    var mobilityValue = 0;
    
    var pos = new Chess()

    for (var square = 0; square < 64; square++){      
        mobilityValue += mobilityBonus(pos, square);
    }

    return mobilityValue;
}

function mobilityBlack(fen){
    
}

function mobility_mg(fen){
    return mobilityWhite(fen) - mobilityBlack(fen);
}