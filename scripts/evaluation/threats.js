function pawnPushThreat(pos, square){
    if (square == null){
        return sumFunction(pos, pawnPushThreat);
    }

    if ("pnbrqk".indexOf(pos.get(cartezianToSquare(square.x, square.y))) < 0){
        return 0;
    }

    for (var ix = -1; ix <= 1; ix += 2){
        if (pos.get(cartezianToSquare(square.x + ix, square.y - 2)) == "P"
        && pos.get(cartezianToSquare(square.x + ix, square.y - 1)) == null
        && pos.get(cartezianToSquare(square.x + ix + 1, square.y)) != "p"
        && pos.get(cartezianToSquare(square.x + ix - 1, square.y)) != "p"
        && (attack(pos, {x: square.x + ix, y: square.y - 1}) || !attack(colorflip(pos), {x: square.x + ix, y: 6 - square.y}))){
            return 1;
        }
        else if (square.y == 4
        && pos.get(cartezianToSquare(square.x + ix, square.y - 3)) == "P"
        && pos.get(cartezianToSquare(square.x + ix, square.y - 2)) == null
        && pos.get(cartezianToSquare(square.x + ix, square.y - 1)) == null
        && pos.get(cartezianToSquare(square.x + ix - 1, square.y)) != "p"
        && pos.get(cartezianToSquare(square.x + ix + 1, square.y)) != "p"
        && (attack(pos, {x: square.x + ix, y: square.y - 1}) || !attack(colorflip(pos), {x: square.x + ix, y: 6 - square.y}))){
            return 1;
        }
    }
    return 0;
}

function threatSafePawn(pos, square){
    if (square == null){
        return sumFunction(pos, threatSafePawn);
    }

    else if ("nbrq".indexOf(pos.get(cartezianToSquare(square.x, square.y))) < 0){
        return 0;
    }

    else if (!pawnAttack(pos, square)){
        return 0;
    }

    else if (safePawn(pos, {x: square.x-1, y: square.y-1}) || safePawn(pos, {x: square.x+1, y: square.y-1})){
        return 1;
    }

    return 0;
}

function safePawn(pos, square){
    if (square == null){
        return sumFunction(pos, safePawn);
    }

    if (pos.get(cartezianToSquare(square.x, square.y)) != "P"){
        return 0;
    }  
    else if (attack(pos, square)){
        return 1;
    }
    else if (!attack(colorflip(pos)), {x: square.x, y: 7-square.y}){
        return 1;
    }
    return 0;
}

function queenCount(pos, square){
    if (square == null){
        return sumFunction(pos, queenCount);
    }
    if (pos.get(cartezianToSquare(square.x, square.y)) == "Q"){
        return 1;
    }
    return 0;
}

function queenAttackDiagonal(pos, square, originalSquare){
    var v = 0;

    for (var i = 0; i < 8; i++){
        var ix = (i + (i > 3)) % 3 - 1;
        var iy = (((i + (i > 3)) / 3) << 0) - 1;
    
        if (ix == 0 || iy == 0){
            continue;
        }

        for (var d = 1; d < 8; d++){
            var piece = pos.get(cartezianToSquare(square.x + d * ix, square.y + d * iy));
            if (piece == "Q"
                && (originalSquare == null || originalSquare.x == square.x + d * ix && originalSquare.y == square.y + d * iy)){
                var dir = pinnedDirection(pos, {x: square.x + d * ix, y: square.y + d * ix});
                if (dir == 0 || Math.abs(ix+iy*3) == dir){
                    v++;
                }
            }
            if (piece != null){
                break;
            }
        }
    }
    return v;
}

function sliderOnQueen(pos, square){
    if (square == null){
        return sumFunction(pos, sliderOnQueen);
    }

    var posFlipped = colorflip(pos);

    if (queenCount(posFlipped) < 1){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x, square.y)) == "P"){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x + 1, square.y + 1)) == "p"){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x - 1, square.y + 1)) == "p"){
        return 0;
    }
    else if (attack(pos, square) <= 1){
        return 0;
    }
    else if (!mobilityArea(pos, square)){
        return 0;
    }

    var diagonal = queenAttackDiagonal(posFlipped, {x: square.x, y: 7-square.y});
    var v = queenCount(pos) < 1 ? 2 : 1;

    if (diagonal && bishopXrayAttack(pos, square)){
        return v;
    }
    else if (!diagonal &&
        rookXrayAttack(pos, square) &&
        queenAttack(posFlipped, {x: square.x, y: 7-square.y})){
        return v;
    }

    return 0;
}

function kingThreat(pos, square){
    if (square == null){
        return sumFunction(pos, kingThreat);
    }
    
    if ("pnbrqk".indexOf(pos.get(cartezianToSquare(square.x, square.y)))){
        return 0;
    }
    else if (!weakEnemies(pos, square)){
        return 0;
    }
    else if (!kingAttack(pos, square)){
        return 0;
    }

    return 1;
}

function pawnAttack(pos, square){
    var v = 0;

    if (pos.get(cartezianToSquare(square.x - 1, square.y - 1)) ==  "P"){
        v++;
    }
    if (pos.get(cartezianToSquare(square.x + 1, square.y - 1)) == "P"){
        v++;
    }

    return v;
}

function kingAttack(pos, square){
    var v = 0;
    
    for (var i = 0; i < 8; i++){
        var ix = (i + (i > 3)) % 3 - 1;
        var iy = (((i + (i > 3)) / 3) << 0) - 1;
        
        if (pos.get(cartezianToSquare(square.x + ix, square.y + iy)) == "K"){
            v++;
        }
    }
    
    return v;
}

function attack(pos, square){
    var v = 0;

    v += pawnAttack(pos, square);
    v += kingAttack(pos, square);
    v += knightAttack(pos, square);
    v += bishopXrayAttack(pos, square);
    v += rookXrayAttack(pos, square);
    v += queenAttack(pos, square);

    return v;
}

function weakEnemies(pos, square){
    if ("pnbrqk".indexOf(pos.get(cartezianToSquare(square.x, square.y))) < 0){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x - 1, square.y + 1)) == "p"){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x + 1, square.y + 1)) == "p"){
        return 0;
    }
    else if (!attack(pos, square)){
        return 0;
    }
    else if (attack(pos, square) <= 1 &&
             attack(colorflip(pos), {x: square.x, y: 7-square.y}) > 1){
        return 0;
    }
    return 1;
}

function hanging(pos, square){
    if (square == null){
        return sumFunction(pos, hanging);
    }
    if (!weakEnemies(pos, square)){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x, square.y)) != "p" &&
            attack(pos, square) > 1){
        return 1;
    }
    else if (attack(colorflip(pos), {x:square.x, y: 7-square.y})){
        return 1;
    }
    return 0;
}

function knightOnQueen(pos, square){
    if (square == null){
        return sumFunction(pos, knightOnQueen);
    }

    var posFlipped = colorflip(pos);

    var qx = -1, qy = -1;
    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            if (pos.get(cartezianToSquare(square.x, square.y)) == "q"){
                if (qx >= 0 || qy >= 0){
                    return 0;
                }
                qx = x;
                qy = y;
            }
        }
    }
    if (queenCount(posFlipped) < 1){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x, square.y) == "P")){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x - 1, square.y + 1)) == "p"){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x + 1, square.y + 1)) == "p"){
        return 0;
    }
    else if (attack(pos, square) <= 1 && attack(posFlipped, {x: square.x, y: 7-square.y}) > 1){
        return 0;
    }
    else if (!mobilityArea(pos, square)){
        return 0;
    }
    else if (!knightAttack(pos, square)){
        return 0;
    }

    var v = queenCount(pos) == 0 ? 2 : 1;
    
    if (Math.abs(qx+square.x) == 2 && Math.abs(qy-square.y) == 1){
        return v;
    }
    else if (Math.abs(qx+square.x) == 1 && Math.abs(qy-square.y) == 2){
        return v;
    }

    return 0;
}

function restricted(pos, square){
    if (square == null){
        return sumFunction(pos, restricted);
    }

    var posFlipped = colorflip(pos);

    if (attack(pos, square) == 0){
        return 0;
    }
    else if (!attack(posFlipped, {x: square.x, y: 7-square.y})){
        return 0;
    }
    else if (pawnAttack(posFlipped, {x: square.x, y: 7-square.y}) > 0){
        return 0;
    }
    else if (attack(posFlipped, {x: square.x, y: 7-square.y}) > 1 && attack(pos, square) == 1){
        return 0;
    }
    return 1;
}

function weakQueenProtection(pos, square){
    if (square == null){
        return sumFunction(pos, weakQueenProtection);
    }

    if (!weakEnemies(pos, square)){
        return 0;
    }
    else if (!queenAttack(colorflip(pos), {x: square.x, y: 7-square.y})){
        return 0;
    }

    return 1;
}

function minorThreat(pos, square){
    var type = "pnbrqk".indexOf(pos.get(cartezianToSquare(square.x, square.y)));

    if (type < 0){
        return 0;
    }

    if (!knightAttack(pos, square) && !bishopXrayAttack(pos, square)){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x, square.y)) == "p"
            || !(pos.get(cartezianToSquare(square.x - 1, square.y + 1)) == "p"
            || pos.get(cartezianToSquare(square.x + 1, square.y + 1)) == "p"
            || (attack(pos, square) <= 1 && attack(colorflip(pos), {x: square.x, y: 7-square.y}) > 1))){
        return 0;
    }
    return type + 1;
}

function rookThreat(pos, square){
    var type = "pnbrqk".indexOf(pos.get(cartezianToSquare(square.x, square.y)));

    if (type < 0){
        return 0;
    }
    if (!weakEnemies(pos, square)){
        return 0;
    }
    else if (!rookXrayAttack(pos, square)){
        return 0;
    }

    return type + 1;
}

function threats(pos){
    var v = 0;
    v += 69 * hanging(pos);
    v += kingThreat(pos) > 0 ? 24 : 0;
    v += 48 * pawnPushThreat(pos);
    v += 173 * threatSafePawn(pos);
    v += 60 * sliderOnQueen(pos);
    v += 16 * knightOnQueen(pos);
    v += 7 * restricted(pos);
    v += 14 * weakQueenProtection(pos);

    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            var s = {x:x, y:y};
            v += [0,5,57,77,88,79,0][minorThreat(pos, s)];
            v += [0,3,37,42,0,58,0][rookThreat(pos, s)];
        }
    }
    return v;
}

function threatsMG(fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"){
    var pos = new Chess(fen);

    console.log(threats(pos));
    console.log(threats(colorflip(pos)));
    return threats(pos) - threats(colorflip(pos));
}