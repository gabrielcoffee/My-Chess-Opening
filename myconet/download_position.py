"""
This program downloads an amount of games from an user at
lichess.org
and then appends the position at the 10th move
to a text file which will be used to 
train the neural network
"""

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
            print(board.fen())
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
                with open("positions.txt", "a+") as fileWrite:
                    fileWrite.write(board.fen() + "\n")
                    fileWrite.close()
