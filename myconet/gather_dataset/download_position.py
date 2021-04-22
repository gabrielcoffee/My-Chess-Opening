# this program uses lichess api to download games from any 
# user and then appends the fen of the 10th move to a file

import chess
import requests
import pgn

while True:

    username = input("Username: ")
    
    if username == "exit":
        break

    games = int(input("Amount of games: "))

    r = requests.get('https://lichess.org/api/games/user/{}?max={}&perfType=blitz,rapid,classical'.format(username, str(games)))

    games = pgn.loads(r.text)

    for game in games:
        board = chess.Board()
        lance = 0
        for move in game.moves:
            lance += 1
            try:
                board.push(board.parse_san(move))
            except ValueError:
                break
            if lance == 20:
                break
        if lance == 20:
            currentFen = board.fen()
            toAppend =  True
            try:
                with open("positions.txt", "r") as fileRead:
                    lines = fileRead.readlines()
                    if (currentFen + "\n") in lines:
                        toAppend = False
                    fileRead.close()
            except FileNotFoundError:
                toAppend = True
            if toAppend:
                print(board.fen())
                with open("positions.txt", "a+") as fileWrite:
                    fileWrite.write(board.fen() + "\n")
                    fileWrite.close()
