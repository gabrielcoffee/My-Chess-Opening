class Board{
    constructor(){
        this.representation = [
            ["r", "n", "b", "q", "k", "b", "n", "r"],
            ["p", "p", "p", "p", "p", "p", "p", "p"],
            [" ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " ", " "],
            ["P", "P", "P", "P", "P", "P", "P", "P"],
            ["R", "N", "B", "Q", "K", "B", "N", "R"]
        ];

        this.turn = "w";
        
        this.castles = {
            white_kingside: true,
            black_kingside: true,
            white_queenside: true,
            black_queenside: true
        };

        this.en_passant_square = "-";

        this.halfmoves = 0;
        
        this.fullmove = 1;
    }

    fen(){

    }
}

class pgnChessCom{
    constructor(pgn){
        this.pgn = pgn;
        this.moves = this.split_moves();
    }

    split_moves(){
        var moves = [];
        var pgn_elements_array = this.pgn.split(" ");
        for (var move = 29; move < pgn_elements_array.length; move += 4){
            moves.push(pgn_elements_array[move]);
        }
        return moves;
    }
}
