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
        
        this.castles = "1111";

        this.enPassantSquare = "-";

        this.halfmoves = 0;
        
        this.fullmoves = 1;

        this.currentFen = this.fen();
    }

    fen(){
        var emptySquares = 0;
        var squareCount = 0;

        var positionFen = "";

        for (var row = 0; row < 8; row++){
            for (var column = 0; column < 8; column++){
                if (this.representation[row][column] != " "){
                    if (emptySquares != 0){
                        positionFen += emptySquares.toString();
                        emptySquares = 0;
                    }
                    positionFen += this.representation[row][column];
                }
                else{
                    emptySquares++;
                }

                if (column == 7){
                    if (emptySquares != 0){
                        positionFen += emptySquares.toString();
                        emptySquares = 0;
                    }
                    if (row != 7){
                        positionFen += "/";
                    }
                }
            }
        }

        positionFen += " ";

        positionFen += this.turn;

        positionFen += " ";

        if (this.castles == "0000"){
            positionFen += "- ";
        }
        else{
            if (this.castles[0] == "1"){
                positionFen += "K";
            }
            if (this.castles[1] == "1"){
                positionFen += "Q";
            }
            if (this.castles[2] == "1"){
                positionFen += "k";
            }
            if (this.castles[3] == "1"){
                positionFen += "q";
            }
        }

        positionFen += " ";

        positionFen += this.enPassantSquare;

        positionFen += " ";

        positionFen += this.halfmoves.toString();

        positionFen += " ";

        positionFen += this.fullmoves.toString();

        return positionFen;
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
