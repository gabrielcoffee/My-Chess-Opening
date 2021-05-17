import tensorflow as tf
import numpy as np
import pandas as pd
import os
import matplotlib.pyplot as plt

from converter import convert

# parameters
BATCH_SIZE = 64
DATASET_NAME = "dataset1"

# disable gpu to avoid memory bugs
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

# import the dataset
df = pd.read_csv("G:/Documentos/Projects/Chess-Opening-Finder/model/data/" + DATASET_NAME + ".csv")

# convert each position sample
feature_set = []

for pos in df["position"]:
    feature_set.append(convert(pos))

# create the tf.dataset
features = (feature_set)
labels = ( df["Mobility"], df["Threats"])

dataset = tf.data.Dataset.from_tensor_slices((features, labels)).batch(BATCH_SIZE)


# create the model
model = tf.keras.Sequential()

model.add(tf.keras.layers.Embedding(30, 256))
model.add(tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(units=1024)))
model.add(tf.keras.layers.Dense(128, activation="sigmoid"))
model.add(tf.keras.layers.Dense(2, activation="linear"))

model.summary()

model.compile(loss=tf.keras.losses.mae,
    optimizer=tf.keras.optimizers.Adam(),
    metrics=['mse'])

# train the model
history = model.fit(dataset, epochs=20)

# save the model
model.save("rnn_bidirectional_model.h5")

# show learning curve
plt.plot(history.history["loss"])
plt.plot(history.history["mae"])
plt.title("MAE & MSE over training steps")
plt.savefig("img.png")

plt.savefig("img.png")
