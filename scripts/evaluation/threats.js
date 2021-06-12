function pawnPushThreatWhite(){
    
}

function kingThreatWhite(pos, square){
    if (square == null){
        return sumFunction(pos, kingThreatWhite);
    }
    
    if ("pnbrqk".indexOf(pos.get(cartezianToSquare(square.x, square.y)))){
        return 0;
    }
    else if (!weakEnemiesWhite(pos, square)){
        return 0;
    }
    else if (!kingAttackWhite(pos, square)){
        return 0;
    }

    return 1;
}

function pawnAttackWhite(pos, square){
    var v = 0;

    if (pos.get(cartezianToSquare(square.x - 1, square.y - 1)) ==  "P"){
        v++;
    }
    if (pos.get(cartezianToSquare(square.x + 1, square.y - 1)) == "P"){
        v++;
    }

    return v;
}

function kingAttackWhite(pos, square){
    for (var i = 0; i < 8; i++){
        var ix = (i + (i > 3)) % 3 - 1;
        var iy = (((i + (i > 3)) / 3) << 0) - 1;
        
        if (pos.get(cartezianToSquare(square.x + ix, square.y + iy)) == "K"){
            return 1;
        }
    }
    
    return 0;
}

function attackWhite(pos, square){
    var v = 0;

    v += pawnAttackWhite(pos, square);
    v += kingAttackWhite(pos, square);
    v += knightAttackWhite(pos, square);
    v += bishopXrayAttackWhite(pos, square);
    v += rookXrayAttackWhite(pos, square);
    v += queenAttackWhite(pos, square);

    return v;
}

function weakEnemiesWhite(pos, square){
    if ("pnbrqk".indexOf(pos.get(cartezianToSquare(square.x, square.y))) < 0){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x - 1, square.y + 1)) == "p"){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x + 1, square.y + 1)) == "p"){
        return 0;
    }
    else if (!attackWhite(pos, square)){
        return 0;
    }
    else if (attackWhite(pos, square) <= 1 &&
             attackWhite(pos, {x: square.x, y: 7-square.y}) > 1){
        return 0;
    }
    return 1;
}

function hangingWhite(pos, square){
    if (square == null){
        return sumFunction(pos, hangingWhite);
    }
    if (!weakEnemiesWhite(pos, square)){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x, square.y)) != "p" &&
            attackWhite(pos, square) > 1){
        return 1;
    }
    else if (!attackWhite(pos, {x:square.x, y: 7-square.y})){
        return 1;
    }
    return 0;
}

function threatsWhite(pos){
    var v = 0;
    v += 69 * hangingWhite(pos);
    v += kingThreatWhite(pos) > 0 ? 24 : 0;
    v += 48 * pawnPushThreatWhite(pos);


    return v;
}

function threatsBlack(pos){
    return 0;
}

function threatsMG(fen){
    var pos = new Chess(fen);
    return threatsWhite(pos) - threatsBlack(pos);
}