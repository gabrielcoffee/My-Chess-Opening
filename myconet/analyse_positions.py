import stockfish_port
import pandas as pd

st = stockfish_port.Stockfish("G:/Downloads/stockfish_13_win_x64_bmi2/stockfish_13_win_x64_bmi2/stockfish_13_win_x64_bmi2.exe")

with open("G:/Documentos/Projects/positions.txt", "r") as positions:
    positions_list = positions.readlines()

final_positions = []

indexes = ["Material", "Imbalance", "Pawns", "Knights", "Bishops",
            "Rooks", "Queens", "Mobility", "King safety", "Threats",
            "Passed", "Space", "Winnable"]

values_dict = {"position": [], "Pawns":[], "Knights":[], "Bishops":[],
                        "Rooks":[], "Queens":[], "Mobility":[], "King":[], "Threats":[],
                        "Passed":[], "Space":[]}



for position in positions_list:
    st.set_fen_position(position[0:-2])
    try:
        for element in st.put_in("eval")[3:-1]:
            value = element[0].split()[8]
            if value == "|":
                value = element[0].split()[9]
            
            if element[0].split()[0] == "Pawns":
                values_dict["Pawns"].append(float(value))
            elif element[0].split()[0] == "Knights":
                values_dict["Knights"].append(float(value))
            elif element[0].split()[0] == "Bishops":
                values_dict["Bishops"].append(float(value))
            elif element[0].split()[0] == "Rooks":
                values_dict["Rooks"].append(float(value))
            elif element[0].split()[0] == "Queens":
                values_dict["Queens"].append(float(value))
            elif element[0].split()[0] == "Mobility":
                values_dict["Mobility"].append(float(value))
            elif element[0].split()[0] == "King":
                values_dict["King"].append(float(value))
                values_dict["position"].append(position[0:-1]) 
            elif element[0].split()[0] == "Threats":
                values_dict["Threats"].append(float(value))
            elif element[0].split()[0] == "Passed":
                values_dict["Passed"].append(float(value))
            elif element[0].split()[0] == "Space":
                values_dict["Space"].append(float(value))
        

    except IndexError:
        print("Socorro")
        continue

for keys in values_dict.keys():
    print(len(values_dict[keys]))
dataframe = pd.DataFrame(values_dict)

print(dataframe.head())