/*
this script file is a purely remake of the stockfish evaluations's mobility
i wrote this part again adapting it to javascript and using the chess.js api

i got all information about the code from:
https://hxim.github.io/Stockfish-Evaluation-Guide/
*/

function pinnedWhite(pos, square){
    // tells if the piece is pinned

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

function pinnedBlack(pos, square){
    // tells if the piece is pinned

    if ("pnbrqk".indexOf(pos.get(cartezianToSquare(square.x, square.y))) < 0){
        return 0;
    }
    if (pinnedDirectionBlack(pos, square) > 0){
        return true;
    }
    else{
        return false;
    }
}

function knightAttackWhite(pos, position, originalSquare){
    // tells how many white knights are attacking that specific square

    var v = 0;

    for (var i = 0; i < 8; i++){
        var ix = ((i > 3) + 1) * (((i % 4) > 1) * 2 - 1);
        var iy = (2 - (i > 3)) * ((i % 2 == 0) * 2 - 1);

        var piece = pos.get(cartezianToSquare(position.x + ix, position.y + iy));

        if (piece == "N" && !pinnedWhite(pos, {x: position.x + ix, y: position.y + iy}) &&
            originalSquare.x == position.x + ix && originalSquare.y == position.y + iy){
            v++;
        }
    }

    return v;
}

function knightAttackBlack(pos, position, originalSquare){
    // tells how many black knights are attacking that specific square

    var v = 0;

    for (var i = 0; i < 8; i++){
        var ix = ((i > 3) + 1) * (((i % 4) > 1) * 2 - 1);
        var iy = (2 - (i > 3)) * ((i % 2 == 0) * 2 - 1);

        var piece = pos.get(cartezianToSquare(position.x + ix, position.y + iy));

        if (piece == "n" && !pinnedBlack(pos, {x: position.x + ix, y: position.y + iy}) &&
            originalSquare.x == position.x + ix && originalSquare.y == position.y + iy){
            v++;
        }
    }

    return v;
}

function bishopXrayAttackWhite(pos, square, originalSquare){
    // tells how many white bishops are attacking that specific square

    var v = 0;

    for (var i = 0; i < 4; i++){
        var ix = ((i > 1) * 2 - 1);
        var iy = ((i % 2 == 0) * 2 - 1);
    
        for (var d = 1; d < 8; d++){
            var piece = pos.get(cartezianToSquare(square.x + d * ix, square.y + d * iy));

            if (piece == "B" && originalSquare.x == square.x + d * ix && originalSquare.y == square.y + d * iy){
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

function bishopXrayAttackBlack(pos, square, originalSquare){
    // tells how many black bishops are attacking that specific square

    var v = 0;

    for (var i = 0; i < 4; i++){
        var ix = ((i > 1) * 2 - 1);
        var iy = ((i % 2 == 0) * 2 - 1);
    
        for (var d = 1; d < 8; d++){
            var piece = pos.get(cartezianToSquare(square.x + d * ix, square.y + d * iy));

            if (piece == "b" && originalSquare.x == square.x + d * ix && originalSquare.y == square.y + d * iy){
                var dir = pinnedDirectionBlack(pos, {x: square.x + d * ix, y: square.y + d * iy});
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

function rookXrayAttackWhite(pos, square, originalSquare){
    // tells how many white rooks are attacking that square

    var v = 0;

    for (var i = 0; i < 4; i++){
        var ix = (i == 0 ? -1 : i == 1 ? 1 : 0);
        var iy = (i == 2 ? -1 : i == 3 ? 1 : 0);
        
        for (var d = 1; d < 8; d++){
            var piece = pos.get(cartezianToSquare(square.x + d * ix, square.y + d * iy));

            if (piece == "R" && originalSquare.x == square.x + d * ix && originalSquare.y == square.y + d * iy){
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

function rookXrayAttackBlack(pos, square, originalSquare){
    // tells how many black rooks are attacking that square

    var v = 0;

    for (var i = 0; i < 4; i++){
        var ix = (i == 0 ? -1 : i == 1 ? 1 : 0);
        var iy = (i == 2 ? -1 : i == 3 ? 1 : 0);
        
        for (var d = 1; d < 8; d++){
            var piece = pos.get(cartezianToSquare(square.x + d * ix, square.y + d * iy));

            if (piece == "r" && originalSquare.x == square.x + d * ix && originalSquare.y == square.y + d * iy){
                var dir = pinnedDirectionBlack(pos, {x: square.x + d * ix, y: square.y + d * iy});
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

function queenAttackWhite(pos, square, originalSquare){
    // tells how many white queens are attacking that specific square

    var v = 0;

    for (var i = 0; i < 8; i++){
        var ix = (i + (i > 3)) % 3 - 1;
        var iy = (((i + (i > 3)) / 3) << 0) - 1;

        for (var d = 1; d < 8; d++){
            var piece = pos.get(cartezianToSquare(square.x + d * ix, square.y + d * iy));

            if (piece == "Q" && originalSquare.x == square.x + d * ix && originalSquare.y == square.y + d * iy){
                var dir = pinnedDirectionWhite(pos, {x: square.x + d * ix, y: square.y + d * iy});
                if (dir == 0 || Math.abs(ix+iy*3) == dir){
                    v++
                }   
            }
            else if (piece != null){
                break;
            }
        }
    }
    return v;
}

function queenAttackBlack(pos, square, originalSquare){
    // tells how many black queens are attacking that specific square

    var v = 0;

    for (var i = 0; i < 8; i++){
        var ix = (i + (i > 3)) % 3 - 1;
        var iy = (((i + (i > 3)) / 3) << 0) - 1;

        for (var d = 1; d < 8; d++){
            var piece = pos.get(cartezianToSquare(square.x + d * ix, square.y + d * iy));

            if (piece == "q" && originalSquare.x == square.x + d * ix && originalSquare.y == square.y + d * iy){
                var dir = pinnedDirectionBlack(pos, {x: square.x + d * ix, y: square.y + d * iy});
                if (dir == 0 || Math.abs(ix+iy*3) == dir){
                    v++
                }   
            }
            else if (piece != null){
                break;
            }
        }
    }
    return v;
}

function pinnedDirectionWhite(pos, square){
    // tells in which direction the piece is pinned 

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

function pinnedDirectionBlack(pos, square){
    // tells in which direction the piece is pinned

    if (pos.get(cartezianToSquare(square.x, square.y)) == null){
        return 0;
    }
    var color = 1;
    if ("pnbrqk".indexOf(pos.get(cartezianToSquare(square.x, square.y))) < 0){
        color = -1;
    }
    for (var i = 0; i < 8; i++){
        var ix = (i + (i > 3)) % 3 - 1;
        var iy = (((i + (i > 3)) / 3) << 0) - 1;
        var king = false;
        for (var d = 1; d < 8; d++){
            var piece =  pos.get(cartezianToSquare(square.x + d * ix, square.y + d * iy));
            if (piece == "k"){
                king = true;
            }
            if (piece != null){
                break;
            }
        }
        if (king){
            for (var d = 1; d < 8; d++){
                var piece =  pos.get(cartezianToSquare(square.x - d * ix, square.y - d * iy));
                if (piece == "Q"
                || piece == "B" && ix * iy != 0
                || piece == "R" && ix * iy == 0){
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
    // tells if a piece is a blocker for the king

    if (pinnedDirectionWhite(pos, square)){
        return true;
    }
    return false;
}

function blockerForKingBlack(pos, square){
    // checks if the piece is a blocker for the black king

    if (pinnedDirectionBlack(pos, square)){
        return true;
    }
    return false;
}

function mobilityAreaWhite(pos, square){
    // checks if the square is for a part of the mobility area for the white pieces

    if (pos.get(cartezianToSquare(square.x, square.y)) == "K"){
        return false;
    }
    if (pos.get(cartezianToSquare(square.x, square.y)) == "Q"){
        return false;
    }
    if (pos.get(cartezianToSquare(square.x - 1, square.y + 1)) == "p"){
        return false;
    }
    if (pos.get(cartezianToSquare(square.x + 1, square.y + 1)) == "p"){
        return false;
    }
    if (pos.get(cartezianToSquare(square.x, square.y)) == "P" &&
        (square.y < 4 || pos.get(cartezianToSquare(square.x, square.y + 1)) != null)){
        return false;
    }
    if (blockerForKingWhite(pos, {x: square.x, y: 7-square.y})){
        return false;
    }
    return true;
}

function mobilityAreaBlack(pos, square){
    // checks if the square is part of the mobility area for the black pieces

    if (pos.get(cartezianToSquare(square.x, square.y)) == "k"){
        return false;
    }
    if (pos.get(cartezianToSquare(square.x, square.y)) == "q"){
        return false;
    }
    if (pos.get(cartezianToSquare(square.x - 1, square.y - 1)) == "P"){
        return false;
    }
    if (pos.get(cartezianToSquare(square.x + 1, square.y - 1)) == "P"){
        return false;
    }
    if (pos.get(cartezianToSquare(square.x, square.y)) == "p" && 
        (square.y > 3 || pos.get(cartezianToSquare(square.x, square.y)) != null)){
            return false;
    }
    if (blockerForKingBlack(pos, {x: square.x, y: 7-square.x})){
        return false;
    }
    return true;
}

function mobilityWhite(pos, piece, pieceSquare){
    // tells how many squares are being attacked by a white piece

    var v = 0;
    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            var position = {x:x, y:y};
            if (!mobilityAreaWhite(pos, position)){
                continue;
            }
            else if (piece == "N" && knightAttackWhite(pos, position, pieceSquare) && pos.get(cartezianToSquare(x, y)) != "Q"){
                v++;
            }
            else if (piece == "B" && bishopXrayAttackWhite(pos, position, pieceSquare) && pos.get(cartezianToSquare(x, y)) != "Q"){
                v++;
            }
            else if (piece == "R" && rookXrayAttackWhite(pos, position, pieceSquare)){
                v++;
            }
            else if (piece == "Q" && queenAttackWhite(pos, position, pieceSquare)){
                v++;
            }
        }
    }
    return v;
}

function mobilityBlack(pos, piece, pieceSquare){
    // tells how many squares are being attacked for a black piece

    var v = 0;
    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            var position = {x:x, y:y};

            if (!mobilityAreaBlack(pos, position)){
                continue;
            }
            else if (piece == "n" && knightAttackBlack(pos, position, pieceSquare) && pos.get(cartezianToSquare(x, y)) != "q"){
                v++
            }
            else if (piece == "b" && bishopXrayAttackBlack(pos, position, pieceSquare) && pos.get(cartezianToSquare(x, y)) != "q"){
                v++;
            }
            else if (piece == "r" && rookXrayAttackBlack(pos, position, pieceSquare)){
                v++;
            }
            else if (piece == "q" && queenAttackBlack(pos, position, pieceSquare)){
                v++;
            }
        }
    }
    return v;
}

function mobilityBonusWhite(pos, square){
    // converts the amount of avaliable squares to a pre-defined value

    var bonus = [[-62,-53,-12,-4,3,13,22,28,33],
        [-48,-20,16,26,38,51,55,63,63,68,81,81,91,98],
        [-60,-20,2,3,3,11,22,31,40,40,41,48,57,57,62],
        [-30,-12,-8,-9,20,23,23,35,38,53,64,65,65,66,67,67,72,72,77,79,93,108,108,108,110,114,114,116]];

    var i = "NBRQ".indexOf(pos.get(cartezianToSquare(square.x, square.y)));

    if (i < 0){
        return 0;
    }
    return bonus[i][mobilityWhite(pos, "NBRQ"[i], square)];    
}

function mobilityBonusBlack(pos, square){
    // converts the amount of avaliable squares to a pre-defined value

    var bonus = [[-62,-53,-12,-4,3,13,22,28,33],
        [-48,-20,16,26,38,51,55,63,63,68,81,81,91,98],
        [-60,-20,2,3,3,11,22,31,40,40,41,48,57,57,62],
        [-30,-12,-8,-9,20,23,23,35,38,53,64,65,65,66,67,67,72,72,77,79,93,108,108,108,110,114,114,116]];

    var i = "nbrq".indexOf(pos.get(cartezianToSquare(square.x, square.y)));

    if (i < 0){
        return 0;
    }  

    return bonus[i][mobilityBlack(pos, "nbrq"[i], square)];
}

function mobilityMGWhite(fen){
    // tells the mobility value for the white pieces

    var mobilityValue = 0;
    
    var pos = new Chess(fen);

    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            var square = {x:x, y:y};
            mobilityValue += mobilityBonusWhite(pos, square);
        }      
    }

    return mobilityValue;
}

function mobilityMGBlack(fen){
    // tells the mobility for black pieces

    var mobilityValue = 0;

    var pos = new Chess(fen);

    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            var square = {x:x, y:y};
            mobilityValue += mobilityBonusBlack(pos, square);
        }
    }

    return mobilityValue;
}

function mobilityMg(fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"){
    // calculates the mobility value
    return mobilityMGWhite(fen) - mobilityMGBlack(fen);
}