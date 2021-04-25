var sample_pgn = 
'[Event "Live Chess"]' +
'[Site "Chess.com"]' +
'[Date "2021.04.23"]' +
'[Round "-"]' +
'[White "Greenx2"]' +
'[Black "NinjaLaranja100"]' +
'[Result "0-1"]' +
'[CurrentPosition "5rk1/pp1R3p/8/8/8/4B3/PbqK2PP/2r2B1R w - -"]' +
'[Timezone "UTC"]' +
'[ECO "D02"]' +
'[ECOUrl "https://www.chess.com/openings/Queens-Pawn-Opening-Zukertort-Chigorin-Variation"]' +
'[UTCDate "2021.04.23"]' +
'[UTCTime "20:09:59"]' +
'[WhiteElo "734"]' +
'[BlackElo "789"]' +
'[TimeControl "180"]' +
'[Termination "NinjaLaranja100 won by checkmate"]' +
'[StartTime "20:09:59"]' +
'[EndDate "2021.04.23"]' +
'[EndTime "20:13:55"]' +
'[Link "https://www.chess.com/game/live/12947672995"]' +

'1. d4 {[%clk 0:03:00]} 1... d5 {[%clk 0:03:00]} 2. Nf3 {[%clk 0:02:59.9]} 2... Nc6 {[%clk 0:02:59.1]} 3. Be3 {[%clk 0:02:58]} 3... e5 {[%clk 0:02:56.9]} 4. dxe5 {[%clk 0:02:55.5]} 4... f6 {[%clk 0:02:54.1]} 5. exf6 {[%clk 0:02:53.6]} 5... Bf5 {[%clk 0:02:53.3]} 6. fxg7 {[%clk 0:02:49.6]} 6... Bxg7 {[%clk 0:02:53.2]} 7. Bg5 {[%clk 0:02:45.4]} 7... Nf6 {[%clk 0:02:50]} 8. e4 {[%clk 0:02:41.8]} 8... Bxe4 {[%clk 0:02:45.6]} 9. Nc3 {[%clk 0:02:37.5]} 9... Qd6 {[%clk 0:02:26.6]} 10. Qe2 {[%clk 0:02:33.9]} 10... O-O {[%clk 0:02:21.7]} 11. Nxe4 {[%clk 0:02:27.9]} 11... dxe4 {[%clk 0:02:21.6]} 12. Nd2 {[%clk 0:02:21.5]} 12... Nd4 {[%clk 0:02:16.9]} 13. Qe3 {[%clk 0:02:10.3]} 13... Nxc2+ {[%clk 0:02:14]} 14. Kd1 {[%clk 0:02:01.9]} 14... Nxe3+ {[%clk 0:02:13.9]} 15. fxe3 {[%clk 0:02:00.7]} 15... Nd5 {[%clk 0:02:09.4]} 16. Nxe4 {[%clk 0:01:58.6]} 16... Nxe3+ {[%clk 0:02:04.8]} 17. Ke2 {[%clk 0:01:57.1]} 17... Qd4 {[%clk 0:01:48.7]} 18. Bxe3 {[%clk 0:01:51.7]} 18... Qxe4 {[%clk 0:01:43.2]} 19. Rc1 {[%clk 0:01:34.9]} 19... Bxb2 {[%clk 0:01:40.5]} 20. Rxc7 {[%clk 0:01:31.6]} 20... Rac8 {[%clk 0:01:38.7]} 21. Rd7 {[%clk 0:01:27]} 21... Rc2+ {[%clk 0:01:32.7]} 22. Kd1 {[%clk 0:01:20.7]} 22... Rc1+ {[%clk 0:01:18.7]} 23. Kd2 {[%clk 0:01:15]} 23... Qc2# {[%clk 0:01:01]} 0-1';

class Board{
    
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
