# This program converts the string into a np.array that can be fed to the network
import numpy as np

def convert(text):
    text_list = []

    for pos in range(0, 90):
        try:
            if text[pos] == "P":
                text_list.append(1)
            elif text[pos] == "p":
                text_list.append(2)
            elif text[pos] == "n":
                text_list.append(3)
            elif text[pos] == "N":
                text_list.append(4)
            elif text[pos] == "b":
                text_list.append(5)
            elif text[pos] == "B":
                text_list.append(6)
            elif text[pos] == "r":
                text_list.append(7)
            elif text[pos] == "R":
                text_list.append(8)
            elif text[pos] == "q":
                text_list.append(9)
            elif text[pos] == "Q":
                text_list.append(10)
            elif text[pos] == "k":
                text_list.append(11)
            elif text[pos] == "K":
                text_list.append(12)
            elif text[pos] == "w":
                text_list.append(13)
            elif text[pos] == "-":
                text_list.append(14)
            elif text[pos] == "1":
                text_list.append(15)
            elif text[pos] == "2":
                text_list.append(16)
            elif text[pos] == "3":
                text_list.append(17)
            elif text[pos] == "4":
                text_list.append(18)
            elif text[pos] == "5":
                text_list.append(19)
            elif text[pos] == "6":
                text_list.append(20)
            elif text[pos] == "7":
                text_list.append(21)
            elif text[pos] == "8":
                text_list.append(22)
            elif text[pos] == "9":
                text_list.append(23)
            elif text[pos] == "0":
                text_list.append(24)
            else:
                text_list.append(0)
        except IndexError:
            text_list.append(0)

    return np.array(text_list, dtype="int64")