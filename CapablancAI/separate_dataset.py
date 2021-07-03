import json
import numpy as np
from statistics import mode

FILE_PATH = input("File path: ")

size_of_the_dataset = int(int(input("Size of the dataset: "))/4)

# import the json file
file = open(FILE_PATH)
obj = json.load(file)
file.close()

def most_common(List):
    return max(List, key = List.count)

openingsW = []
openingsD = []

winsW = []
defeatsW = []
winsB = []
defeatsB = []

for set in obj:
    final_array_winsW = []
    final_array_winsB = []
    final_array_defeatsW = []
    final_array_defeatsB = []
    
    winsw = set["winsW"]
    winsb = set["winsB"]
    defeatw = set["lossW"]
    defeatb = set["lossB"]

    opw = []
    opb = []

    for a in range(size_of_the_dataset):
        game = winsw[a]
        final_array_winsW.append([game["threats"],game["mobility"]])
        opw.append([game["threats"],game["mobility"]])
    for a in range(size_of_the_dataset):
        game = winsb[a]
        final_array_winsB.append([game["threats"],game["mobility"]])
        opw.append([game["threats"],game["mobility"]])
    for a in range(size_of_the_dataset):
        game = defeatw[a]
        final_array_defeatsW.append([game["threats"],game["mobility"]])
        opb.append([game["threats"],game["mobility"]])
    for a in range(size_of_the_dataset):
        game = defeatb[a]
        final_array_defeatsB.append([game["threats"],game["mobility"]])
        opb.append([game["threats"],game["mobility"]])

    winsW.append(final_array_winsW)
    winsB.append(final_array_winsB)
    defeatsW.append(final_array_defeatsW)
    defeatsB.append(final_array_defeatsB)
    openingsW.append([most_common(opw)])
    openingsD.append([most_common(opb)])
