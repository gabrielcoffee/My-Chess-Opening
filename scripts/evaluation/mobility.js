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

function pinnedWhite(pos, square){
    if ("PNBRQK".indexOf(pos.get(cartezianToSquare(square.x, square.y))) < 0){
        return 0;
    }
    if (pinnedDirectionWhite(pos, square) > 0){
        return true;
    }
    else{
        return false;
    }
}

function knightAttackWhite(pos, position){
    // tells how many white knights are attacking that specific square

    var v = 0;

    for (var i = 0; i < 8; i++){
        var ix = ((i > 3) + 1) * (((i % 4) > 1) * 2 - 1);
        var iy = (2 - (i > 3)) * ((i % 2 == 0) * 2 - 1);

        var piece = pos.get(cartezianToSquare(position.x + ix, position.y + iy));

        if (piece == "N" && !pinnedWhite(pos, {x: position.x + ix, y: position.y + iy})){
            v++;
        }
    }

    return v;
}

function bishopXrayAttackWhite(pos, square){
    // tells how many white bishops are attacking that specific square

    var v = 0;

    for (var i = 0; i < 4; i++){
        var ix = ((i > 1) * 2 - 1);
        var iy = ((i % 2 == 0) * 2 - 1);
    
        for (var d = 1; d < 8; d++){
            var piece = pos.get(cartezianToSquare(square.x + d * ix, square.y + d * iy));

            if (piece == "B"){
                var dir = pinnedDirectionWhite(pos, {x: square.x + d * ix, y: square.y + d * iy});
                if (dir == 0 || Math.abs(ix+iy*3) == dir){
                    v++;
                }
            }
            else if (piece != null && piece != "Q" && piece != "q"){
                break;
            }
        }
    }
    return v;
}

function rookXrayAttackWhite(pos, square){
    // tells how many white rooks are attacking that square

    var v = 0;

    for (var i = 0; i < 4; i++){
        var ix = (i == 0 ? -1 : i == 1 ? 1 : 0);
        var iy = (i == 2 ? -1 : i == 3 ? 1 : 0);
        
        for (var d = 1; d < 8; d++){
            var piece = pos.get(cartezianToSquare(square.x + d * ix, square.y + d * iy));

            if (piece == "R"){
                var dir = pinnedDirectionWhite(pos, {x: square.x + d * ix, y: square.y + d * iy});
                if (dir == 0 || Math.abs(ix+iy*3) == dir){
                    v++;
                }
            }
            else if (piece != null && piece != "Q" && piece != "q"){
                break;
            }
        }
    }

    return v;
}

function queenAttackWhite(pos, square){
    var v = 0;

    for (var i = 0; i < 8; i++){
        var ix = (i + (i > 3)) % 3 - 1;
        var iy = (((i + (i > 3)) / 3) << 0) - 1;

        for (var d = 1; d < 8; d++){
            var piece = pos.get(cartezianToSquare(square.x + d * ix, square.y + d * iy));

            if (piece == "Q"){
                var dir = pinnedDirectionWhite(pos, {x: square.x + d * ix, y: square.y + d * iy});
                if (dir == 0 || Math.abs(ix+iy*3) == dir){
                    v++
                }   
            }
            else if (b != null){
                break;
            }
        }
    }
}

function mobilityWhite(pos, piece, pieceSquare){
    var v = 0;
    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            var position = {x:x, y:y};

            if (!mobilityAreaWhite(pos, position)){
                continue;
            }
            if (piece == "N" && knightAttackWhite(pos, position) && pos.get(cartezianToSquare(x, y)) != "Q"){
                v++;
            }
            else if (piece == "B" && bishopXrayAttackWhite(pos, position) && pos.get(cartezianToSquare(x, y)) != "Q"){
                v++;
            }
            else if (piece == "R" && rookXrayAttackWhite(pos, position)){
                v++;
            }
            else if (piece == "Q" && queenAttackWhite(pos, position)){
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

    var i = "NBRQ".indexOf(pos.get(cartezianToSquare(square.x, square.y)));

    if (i < 0){
        return 0;
    }
    return bonus[i][mobilityWhite(pos, i, square)];    
}

function mobilityMGWhite(fen){
    var mobilityValue = 0;
    
    var pos = new Chess(fen)

    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            var square = {x:x, y:y};
            mobilityValue += mobilityBonusWhite(pos, square);
        }      
        
    }

    return mobilityValue;
}

function mobilityBlack(fen){
    
}

function mobilityMg(fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"){
    return mobilityMGWhite(fen) - mobilityBlack(fen);
}