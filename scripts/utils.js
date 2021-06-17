async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

function splitAmounts(amount){
    switch (amount){
        case 25:
            return 13;
        case 50:
            return 25;
        case 75:
            return 38;
        case 100:
            return 50;
    }
}

function getSquareName(number){
    var squares = ['a1','a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
                   'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
                   'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'b8',
                   'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'b8',
                   'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'b8',
                   'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'b8',
                   'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'b8',
                   'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'];
    return squares[number];
}

function cartezianToSquare(x, y){
    if (x < 0 || x > 7 || y < 0 || y > 7){
        return null;
    }
    var squares = [['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
                   ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],              
                   ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
                   ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],                            
                   ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
                   ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
                   ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],              
                   ['a8','b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8']];
    return squares[y][x];
}

function sumFunction(pos, func){
    var sum = 0;

    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            sum += func(pos, {x:x, y:y});
        }
    }
    return sum;
}

function colorflip(pos){
    for (var x = 0; x < 8; x++){
        for (var y = 0; y < 8; y++){
            var piece = pos.get(cartezianToSquare(x, y));
            pos.remove(cartezianToSquare(x, y));
            var color;
            if (piece == null){
                continue;
            }
            if (piece == piece.toLowerCase()){
                color = "w";
            }
            else{
                color = "b";
            }

            pos.put({"type": piece.toLowerCase(), "color": color}, cartezianToSquare(x, 7-y));
        }
    }
    return pos;
}