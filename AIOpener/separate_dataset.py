import json
import numpy as np
from statistics import mode

# import the json file
file = open("G:/Documentos/Projects/Chess-Opening-Finder/datasets/AIOpener/jun2021.json")
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
    
    for game in winsw:
        final_array_winsW.append([game["threats"],game["mobility"]])
        opw.append([game["threats"],game["mobility"]])
    for game in winsb:
        final_array_winsB.append([game["threats"],game["mobility"]])
        opw.append([game["threats"],game["mobility"]])
    for game in defeatw:
        final_array_defeatsW.append([game["threats"],game["mobility"]])
        opb.append([game["threats"],game["mobility"]])
    for game in defeatb:
        final_array_defeatsB.append([game["threats"],game["mobility"]])
        opb.append([game["threats"],game["mobility"]])

    winsW.append(final_array_winsW)
    winsB.append(final_array_winsB)
    defeatsW.append(final_array_defeatsW)
    defeatsB.append(final_array_defeatsB)
    openingsW.append([most_common(opw)])
    openingsD.append([most_common(opb)])
