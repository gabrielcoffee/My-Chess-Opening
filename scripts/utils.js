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
