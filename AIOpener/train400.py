import tensorflow as tf
import separate_dataset as dt
import numpy as np


BATCH_SIZE = 1
EPOCHS = 10


dataset1 = tf.data.Dataset.from_tensor_slices(((dt.winsW), (dt.openingsW))).batch(BATCH_SIZE)
dataset2 = tf.data.Dataset.from_tensor_slices(((dt.winsB), (dt.openingsW))).batch(BATCH_SIZE)
dataset3 = tf.data.Dataset.from_tensor_slices(((dt.defeatsW), (dt.openingsD))).batch(BATCH_SIZE)
dataset4 = tf.data.Dataset.from_tensor_slices(((dt.defeatsB), (dt.openingsD))).batch(BATCH_SIZE)

model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation="sigmoid"),
    tf.keras.layers.Dense(64, activation="sigmoid"),
    tf.keras.layers.Dense(8, activation="sigmoid"),
    tf.keras.layers.LSTM(1, activation="sigmoid")
])

model.compile(optimizer="rmsprop", loss="mae")

model.fit(dataset1, epochs=EPOCHS)
model.fit(dataset2, epochs=EPOCHS)
model.fit(dataset3, epochs=EPOCHS)
model.fit(dataset4, epochs=EPOCHS)

model.save("model.h5")
