import tensorflow as tf
import numpy as np
import pandas as pd
import os

from converter import converter

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

# getting dataset
df = pd.read_csv("D:/dataframe.csv")   # change by your path

feature_set = []

for pos in df["position"]:
    feature_set.append(converter(pos))

features = (feature_set)
labels = (df["Pawns"], df["Knights"], df["Bishops"], df["Rooks"],
        df["Queens"], df["Mobility"], df["King"], df["Threats"],
        df["Passed"], df["Space"])

text_dataset = tf.data.Dataset.from_tensor_slices((features, labels)).batch(64)

model = tf.keras.Sequential()

model.add(tf.keras.layers.Embedding(30, 256))
model.add(tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(units=1024)))
model.add(tf.keras.layers.Dense(128, activation="sigmoid"))
model.add(tf.keras.layers.Dense(10, activation="linear"))

model.summary()

model.compile(loss=tf.keras.losses.mse,
    optimizer=tf.keras.optimizers.Adam(),
    metrics=['mae'])

model.fit(text_dataset, epochs=20)

history = model.fit(text_dataset, epochs=2)

model.save("rnn_bidirectional_model.h5")
