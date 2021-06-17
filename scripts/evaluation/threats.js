function pawnPushThreatWhite(pos, square){
    if (square == null){
        return sumFunction(pos, pawnPushThreatWhite);
    }

    if ("pnbrqk".indexOf(pos.get(cartezianToSquare(square.x, square.y))) < 0){
        return 0;
    }

    for (var ix = -1; ix <= 1; ix += 2){
        if (pos.get(cartezianToSquare(square.x + ix, square.y - 2)) == "P"
        && pos.get(cartezianToSquare(square.x + ix, square.y - 1)) == null
        && pos.get(cartezianToSquare(square.x + ix + 1, square.y)) != "p"
        && pos.get(cartezianToSquare(square.x + ix - 1, square.y)) != "p"
        && (attackWhite(pos, {x: square.x + ix, y: square.y - 1}) || !attackBlack(pos, {x: square.x + ix, y: square.y}))){
            return 1;
        }
        else if (square.y == 4
        && pos.get(cartezianToSquare(square.x + ix, square.y - 3)) == "P"
        && pos.get(cartezianToSquare(square.x + ix, square.y - 2)) == null
        && pos.get(cartezianToSquare(square.x + ix, square.y - 1)) == null
        && pos.get(cartezianToSquare(square.x + ix - 1, square.y)) != "p"
        && pos.get(cartezianToSquare(square.x + ix + 1, square.y)) != "p"
        && (attackWhite(pos, {x: square.x + ix, y: square.y - 1}) || !attackBlack(pos, {x: square.x + ix, y: square.y}))){
            return 1;
        }
    }
    return 0;
}

function pawnPushThreatBlack(pos, square){
    if (square == null){
        return sumFunction(pos, pawnPushThreatBlack);
    }

    if ("PNBRQK".indexOf(pos.get(cartezianToSquare(square.x, square.y))) < 0){
        return 0;
    }

    for (var ix = -1; ix <= 1; ix += 2){
        if (pos.get(cartezianToSquare(square.x + ix, square.y + 2)) == "p"
        && pos.get(cartezianToSquare(square.x + ix, square.y + 1)) == null
        && pos.get(cartezianToSquare(square.x + ix + 1, square.y)) != "P"
        && pos.get(cartezianToSquare(square.x + ix - 1, square.y)) != "P"
        && (attackBlack(pos, {x: square.x + ix, y: square.y + 1}) || !attackWhite(pos, {x: square.x + ix, y: square.y}))){
            return 1;
        }
        else if (square.y == 3
        && pos.get(cartezianToSquare(square.x + ix, square.y + 3)) == "p"
        && pos.get(cartezianToSquare(square.x + ix, square.y + 2)) == null
        && pos.get(cartezianToSquare(square.x + ix, square.y + 1)) == null
        && pos.get(cartezianToSquare(square.x + ix - 1, square.y)) != "P"
        && pos.get(cartezianToSquare(square.x + ix + 1, square.y)) != "P"
        && (attackBlack(pos, {x: square.x + ix, y: square.y + 1}) || !attackWhite(pos, {x: square.x + ix, y: square.y}))){
            return 1;
        }
    }
    return 0;
}

function threatSafePawnWhite(pos, square){
    if (square == null){
        return sumFunction(pos, threatSafePawnWhite);
    }

    else if ("nbrq".indexOf(pos.get(cartezianToSquare(square.x, square.y))) < 0){
        return 0;
    }

    else if (!pawnAttackWhite(pos, square)){
        return 0;
    }

    else if (safePawnWhite(pos, {x: square.x-1, y: square.y-1}) || safePawnWhite(pos, {x: square.x+1, y: square.y-1})){
        return 1;
    }

    return 0;
}

function threatSafePawnBlack(pos, square){
    if (square == null){
        return sumFunction(pos, threatSafePawnBlack);
    }

    else if ("NBRQ".indexOf(pos.get(cartezianToSquare(square.x, square.y))) < 0){
        return 0;
    }

    else if (!pawnAttackBlack(pos, square)){
        return 0;
    }

    else if (safePawnBlack(pos, {x: square.x-1, y: square.y+1}) || safePawnBlack(pos, {x: square.x+1, y: square.y+1})){
        return 1;
    }

    return 0;
}

function safePawnWhite(pos, square){
    if (square == null){
        return sumFunction(pos, safePawnWhite);
    }

    if (pos.get(cartezianToSquare(square.x, square.y)) != "P"){
        return 0;
    }  
    else if (attackWhite(pos, square)){
        return 1;
    }
    else if (!attackBlack(pos, {x: square.x, y: square.y})){
        return 1;
    }
    return 0;
}

function safePawnBlack(pos, square){
    if (square == null){
        return sumFunction(pos, safePawnBlack);
    }

    if (pos.get(cartezianToSquare(square.x, square.y)) != "p"){
        return 0;
    }  
    else if (attackBlack(pos, square)){
        return 1;
    }
    else if (!attackWhite(pos, {x: square.x, y: square.y})){
        return 1;
    }
    return 0;
}

function queenCountWhite(pos, square){
    if (square == null){
        return sumFunction(pos, queenCountWhite);
    }
    if (pos.get(cartezianToSquare(square.x, square.y)) == "Q"){
        return 1;
    }
    return 0;
}

function queenCountBlack(pos, square){
    if (square == null){
        return sumFunction(pos, queenCountBlack);
    }
    if (pos.get(cartezianToSquare(square.x, square.y)) == "q"){
        return 1;
    }
    return 0;
}

function queenAttackDiagonalWhite(pos, square, originalSquare){
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
                var dir = pinnedDirectionWhite(pos, {x: square.x + d * ix, y: square.y + d * ix});
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

function queenAttackDiagonalBlack(pos, square, originalSquare){
    var v = 0;

    for (var i = 0; i < 8; i++){
        var ix = (i + (i > 3)) % 3 - 1;
        var iy = (((i + (i > 3)) / 3) << 0) - 1;
    
        if (ix == 0 || iy == 0){
            continue;
        }

        for (var d = 1; d < 8; d++){
            var piece = pos.get(cartezianToSquare(square.x + d * ix, square.y + d * iy));
            if (piece == "q"
                && (originalSquare == null || originalSquare.x == square.x + d * ix && originalSquare.y == square.y + d * iy)){
                var dir = pinnedDirectionBlack(pos, {x: square.x + d * ix, y: square.y + d * ix});
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

function sliderOnQueenWhite(pos, square){
    if (square == null){
        return sumFunction(pos, sliderOnQueenWhite);
    }

    if (queenCountBlack(pos) < 1){
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
    else if (attackWhite(pos, square) <= 1){
        return 0;
    }
    else if (!mobilityAreaWhite(pos, square)){
        return 0;
    }

    var diagonal = queenAttackDiagonalBlack(pos, {x: square.x, y: square.y});
    var v = queenCountWhite(pos) == 0 ? 2 : 1;

    if (diagonal && bishopXrayAttackWhite(pos, square)){
        return v;
    }
    else if (!diagonal &&
        rookXrayAttackWhite(pos, square) &&
        queenAttackBlack(pos, {x: square.x, y: square.y})){
        return v;
    }

    return 0;
}


function sliderOnQueenBlack(pos, square){
    if (square == null){
        return sumFunction(pos, sliderOnQueenBlack);
    }

    if (queenCountWhite(pos) < 1){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x, square.y)) == "p"){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x + 1, square.y - 1)) == "P"){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x - 1, square.y - 1)) == "P"){
        return 0;
    }
    else if (attackBlack(pos, square) <= 1){
        return 0;
    }
    else if (!mobilityAreaBlack(pos, square)){
        return 0;
    }

    var diagonal = queenAttackDiagonalWhite(pos, {x: square.x, y: square.y});
    var v = queenCountBlack(pos) == 0 ? 2 : 1;

    if (diagonal && bishopXrayAttackBlack(pos, square)){
        return v;
    }
    else if (!diagonal &&
        rookXrayAttackBlack(pos, square) &&
        queenAttackWhite(pos, {x: square.x, y: square.y})){
        return v;
    }

    return 0;
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

function kingThreatBlack(pos, square){
    if (square == null){
        return sumFunction(pos, kingThreatBlack);
    }
    
    if ("PNBRQK".indexOf(pos.get(cartezianToSquare(square.x, square.y)))){
        return 0;
    }
    else if (!weakEnemiesBlack(pos, square)){
        return 0;
    }
    else if (!kingAttackBlack(pos, square)){
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

function pawnAttackBlack(pos, square){
    var v = 0;

    if (pos.get(cartezianToSquare(square.x - 1, square.y + 1)) ==  "p"){
        v++;
    }
    if (pos.get(cartezianToSquare(square.x + 1, square.y + 1)) == "p"){
        v++;
    }

    return v;
}

function kingAttackWhite(pos, square){
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

function kingAttackBlack(pos, square){
    var v = 0;

    for (var i = 0; i < 8; i++){
        var ix = (i + (i > 3)) % 3 - 1;
        var iy = (((i + (i > 3)) / 3) << 0) - 1;
        
        if (pos.get(cartezianToSquare(square.x + ix, square.y + iy)) == "k"){
            v++;
        }
    }
    
    return v;
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

function attackBlack(pos, square){
    var v = 0;

    v += pawnAttackBlack(pos, square);
    v += kingAttackBlack(pos, square);
    v += knightAttackBlack(pos, square);
    v += bishopXrayAttackBlack(pos, square);
    v += rookXrayAttackBlack(pos, square);
    v += queenAttackBlack(pos, square);

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
             attackBlack(pos, {x: square.x, y: square.y}) > 1){
        return 0;
    }
    return 1;
}

function weakEnemiesBlack(pos, square){
    if ("PNBRQK".indexOf(pos.get(cartezianToSquare(square.x, square.y))) < 0){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x - 1, square.y - 1)) == "P"){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x + 1, square.y - 1)) == "P"){
        return 0;
    }
    else if (!attackBlack(pos, square)){
        return 0;
    }
    else if (attackBlack(pos, square) <= 1 &&
             attackWhite(pos, {x: square.x, y: square.y}) > 1){
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
    else if (!attackBlack(pos, {x:square.x, y: square.y})){
        return 1;
    }
    return 0;
}

function hangingBlack(pos, square){
    if (square == null){
        return sumFunction(pos, hangingBlack);
    }
    if (!weakEnemiesBlack(pos, square)){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x, square.y)) != "P" &&
            attackBlack(pos, square) > 1){
        return 1;
    }
    else if (!attackWhite(pos, {x:square.x, y: square.y})){
        return 1;
    }
    return 0;
}

function knightOnQueenWhite(pos, square){
    if (square == null){
        return sumFunction(pos, knightOnQueenWhite);
    }
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
    if (queenCountBlack(pos) < 1){
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
    else if (attackWhite(pos, square) <= 1 && attackBlack(pos, {x: square.x, y: square.y}) > 1){
        return 0;
    }
    else if (!mobilityAreaWhite(pos, square)){
        return 0;
    }
    else if (!knightAttackWhite(pos, square)){
        return 0;
    }

    var v = queenCountWhite(pos) == 0 ? 2 : 1;
    
    if (Math.abs(qx+square.x) == 2 && Math.abs(qy-square.y) == 1){
        return v;
    }
    else if (Math.abs(qx+square.x) == 1 && Math.abs(qy-square.y) == 2){
        return v;
    }

    return 0;
}

function knightOnQueenBlack(pos, square){
    if (square == null){
        return sumFunction(pos, knightOnQueenBlack);
    }
    var qx = -1, qy = -1;
    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            if (pos.get(cartezianToSquare(square.x, square.y)) == "Q"){
                if (qx >= 0 || qy >= 0){
                    return 0;
                }
                qx = x;
                qy = y;
            }
        }
    }
    if (queenCountWhite(pos) < 1){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x, square.y) == "p")){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x - 1, square.y - 1)) == "P"){
        return 0;
    }
    else if (pos.get(cartezianToSquare(square.x + 1, square.y - 1)) == "P"){
        return 0;
    }
    else if (attackBlack(pos, square) <= 1 && attackWhite(pos, {x: square.x, y: square.y}) > 1){
        return 0;
    }
    else if (!mobilityAreaBlack(pos, square)){
        return 0;
    }
    else if (!knightAttackBlack(pos, square)){
        return 0;
    }

    var v = queenCountBlack(pos) == 0 ? 2 : 1;
    
    if (Math.abs(qx+square.x) == 2 && Math.abs(qy+square.y) == 1){
        return v;
    }
    else if (Math.abs(qx+square.x) == 1 && Math.abs(qy+square.y) == 2){
        return v;
    }

    return 0;
}

function restrictedWhite(pos, square){
    if (square == null){
        return sumFunction(pos, restrictedWhite);
    }

    if (attackWhite(pos, square) == 0){
        return 0;
    }
    else if (!attackBlack(pos, {x: square.x, y: square.y})){
        return 0;
    }
    else if (pawnAttackBlack(pos, {x: square.x, y: square.y}) > 0){
        return 0;
    }
    else if (attackBlack(pos, {x: square.x, y: square.y}) > 1 && attackWhite(pos, square) == 1){
        return 0;
    }
    return 1;
}

function restrictedBlack(pos, square){
    if (square == null){
        return sumFunction(pos, restrictedBlack);
    }

    if (attackBlack(pos, square) == 0){
        return 0;
    }
    else if (!attackWhite(pos, {x: square.x, y: square.y})){
        return 0;
    }
    else if (pawnAttackWhite(pos, {x: square.x, y: square.y}) > 0){
        return 0;
    }
    else if (attackWhite(pos, {x: square.x, y: square.y}) > 1 && attackBlack(pos, square) == 1){
        return 0;
    }
    return 1;
}

function weakQueenProtectionWhite(pos, square){
    if (square == null){
        return sumFunction(pos, weakQueenProtectionWhite);
    }
    
    if (!weakEnemiesWhite(pos, square)){
        return 0;
    }
    else if (!queenAttackBlack(pos, {x: square.x, y: square.y})){
        return 0;
    }
    
    return 1;
}

function weakQueenProtectionBlack(pos, square){
    if (square == null){
        return sumFunction(pos, weakEnemiesBlack);
    }

    if (!weakEnemiesBlack(pos, square)){
        return 0;
    }
    else if (!queenAttackWhite(pos, {x: square.x, y: square.y})){
        return 0;
    }

    return 1;
}

function minorThreatWhite(pos, square){
    if (square == null){
        return sumFunction(pos, minorThreatWhite);
    }

    var type = "pnbrqk".indexOf(pos.get(cartezianToSquare(square.x, square.y)));

    if (type < 0){
        return 0;
    }

    if (!knightAttackWhite(pos, square) && !bishopXrayAttackWhite(pos, square)){
        return 0;
    }
    else if ((pos.get(cartezianToSquare(square.x, square.y)) == "p"
            || !(pos.get(cartezianToSquare(square.x - 1, square.y + 1)) == "p"
            || pos.get(cartezianToSquare(square.x + 1, square.y + 1)) == "p"
            || (attackWhite(pos, square) <= 1 && attackBlack(pos, {x: square.x, y: square.y}) > 1)))
            && !weakEnemiesWhite(pos, square)){
        return 0;
    }
    return type + 1;
}

function minorThreatBlack(pos, square){
    var type = "PNBRQK".indexOf(pos.get(cartezianToSquare(square.x, square.y)));

    if (type < 0){
        return 0;
    }

    if (!knightAttackBlack(pos, square) && !bishopXrayAttackBlack(pos, square)){
        return 0;
    }
    else if ((pos.get(cartezianToSquare(square.x, square.y)) == "P"
            || !(pos.get(cartezianToSquare(square.x - 1, square.y - 1)) == "P"
            || pos.get(cartezianToSquare(square.x + 1, square.y - 1)) == "P"
            || (attackWhite(pos, square) <= 1 && attackBlack(pos, {x: square.x, y: square.y}) > 1)))
            && !weakEnemiesBlack(pos, square)){
        return 0;
    }
    return type + 1;
}

function rookThreatWhite(pos, square){
    var type = "pnbrqk".indexOf(pos.get(cartezianToSquare(square.x, square.y)));

    if (type < 0){
        return 0;
    }
    if (!weakEnemiesWhite(pos, square)){
        return 0;
    }
    else if (!rookXrayAttackWhite(pos, square)){
        return 0;
    }

    return type + 1;
}

function rookThreatBlack(pos, square){
    var type = "PNBRQK".indexOf(pos.get(cartezianToSquare(square.x, square.y)));

    if (type < 0){
        return 0;
    }
    if (!weakEnemiesBlack(pos, square)){
        return 0;
    }
    else if (!rookXrayAttackBlack(pos, square)){
        return 0;
    }

    return type + 1;
}

function threatsWhite(pos){
    var v = 0;
    v += 69 * hangingWhite(pos);
    v += kingThreatWhite(pos) > 0 ? 24 : 0;
    v += 48 * pawnPushThreatWhite(pos);
    v += 173 * threatSafePawnWhite(pos);
    v += 60 * sliderOnQueenWhite(pos);
    v += 16 * knightOnQueenWhite(pos);
    v += 7 * restrictedWhite(pos);
    v += 14 * weakQueenProtectionWhite(pos);

    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            var s = {x:x, y:y};
            v += [0,5,57,77,88,79,0][minorThreatWhite(pos, s)];
            v += [0,3,37,42,0,58,0][rookThreatWhite(pos, s)];
        }
    }
    return v;
}

function threatsBlack(pos){
    var v = 0;
    v += 69 * hangingBlack(pos);
    v += kingThreatBlack(pos) > 0 ? 24 : 0;
    v += 48 * pawnPushThreatBlack(pos);
    v += 173 * threatSafePawnBlack(pos);
    v += 60 * sliderOnQueenBlack(pos);
    v += 16 * knightOnQueenBlack(pos);
    v += 7 * restrictedBlack(pos);
    v += 14 * weakQueenProtectionBlack(pos);

    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            var s = {x:x, y:y};
            v += [0,5,57,77,88,79,0][minorThreatBlack(pos, s)];
            v += [0,3,37,42,0,58,0][rookThreatBlack(pos, s)];
        }
    }
    return v;
}

function threatsMg(fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"){
    var pos = new Chess(fen);
    var mg = threatsWhite(pos) - threatsBlack(pos);
    var eg = 0; //we are only evaluating positions at the end of the opening and the beginning of the middlegame
    var p = phase(pos);
    var rule50moves = rule50(pos);
    var v = (((mg * p + ((eg * (128 - p)) << 0)) / 128) << 0);
    v = ((v / 16) << 0) * 16;
    v += tempo(pos);
    v = (v * (100 - rule50moves) / 100) << 0;
    return v / 200;
}