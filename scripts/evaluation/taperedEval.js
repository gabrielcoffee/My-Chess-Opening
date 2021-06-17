function pieceValueBonus(pos, square){
    var a = [124, 781, 825, 1276, 2538];
    var i = "PNBRQ".indexOf(pos.get(cartezianToSquare(square.x, square.y)));
    if (i >= 0){
        return a[i];
    }
    return 0;
}

function nonPawnMaterial(pos, square){
    if (square == null){
        return sumFunction(pos, nonPawnMaterial);
    }
    
    var i = "NBRQ".indexOf(pos.get(cartezianToSquare(square.x, square.y)));
    if (i >= 0){
        return pieceValueBonus(pos, square);
    }
    return 0;
}

function phase(pos) {
    var midgameLimit = 15258, endgameLimit  = 3915;
    var npm = nonPawnMaterial(pos) + nonPawnMaterial(colorflip(pos));
    npm = Math.max(endgameLimit, Math.min(npm, midgameLimit));
    return (((npm - endgameLimit) * 128) / (midgameLimit - endgameLimit)) << 0;
}

function rule50(pos){
    return pos.halfmoves();
}

function tempo(pos){
    return 28 * (pos.get_turn() == "w" ? 1 : -1);
}