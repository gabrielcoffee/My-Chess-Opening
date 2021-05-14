import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

DATASET_NAME = "dataset1"

df = pd.read_csv("G:/Documentos/Projects/Chess-Opening-Finder/model/data/" + DATASET_NAME + ".csv")

print(df.describe())

df["Threats"] = (df["Threats"] - df["Threats"].mean()) / df["Threats"].std()
df["Mobility"] = (df["Mobility"] - df["Mobility"].mean()) / df["Mobility"].std()
df["Space"] = (df["Space"] - df["Space"].mean()) / df["Space"].std()

# mobility over threats
sns.scatterplot(data=df, x="Mobility", y="Threats")
plt.show()

# space over threats
sns.scatterplot(data=df, x="Space", y="Threats", palette="deep")
plt.show()

# both graphs overlapping
sns.scatterplot(data=df, x="Mobility", y="Threats")
sns.scatterplot(data=df, x="Space", y="Threats", palette="deep")
plt.show()