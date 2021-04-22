import tensorflow as tf
import numpy as np
import pandas as pd

# getting dataset

df = pd.read_csv("C:/Users/huhuhu/dataframe.csv")   # change by your path

features = (df["position"])
labels = (df["Pawns"], df["Knights"], df["Bishops"], df["Rooks"],
        df["Queens"], df["Mobility"], df["King"], df["Threats"],
        df["Passed"], df["Space"])


text_dataset = tf.data.Dataset.from_tensor_slices((features, labels)).batch(15)

model = tf.keras.Sequential()

model.add(tf.keras.layers.InputLayer(input_shape=(1,), dtype=tf.string))
model.add(tf.keras.layers.experimental.preprocessing.TextVectorization(
    max_tokens=30, output_mode="int", output_sequence_length=90))
model.add(tf.keras.layers.Embedding(30, 256))
model.add(tf.keras.layers.LSTM(units=1024))
model.add(tf.keras.layers.Dense(128, activation="sigmoid"))
model.add(tf.keras.layers.Dense(10, activation="linear"))

model.compile(loss=tf.keras.losses.mse,
    optimizer=tf.keras.optimizers.Adam(),
    metrics=['mae'])

model.fit(text_dataset, epochs=20)

model.save("rnn_bidirectional_model", save_format="tf")