import tensorflow as tf
import numpy as np
import pandas as pd
import os
import matplotlib.pyplot as plt

from converter import convert

# parameters
BATCH_SIZE = 16
DATASET_NAME = "test"

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
model = tf.keras.models.load_model("C:/Users/huhuhu/rnn_bidirectional_model3.h5", compile=False)

# our loss function
def loss_euclidean_distance(y_true, y_pred):
    return tf.math.sqrt(tf.experimental.numpy.sum(tf.math.square(y_pred - y_true), axis=1))

model.compile(loss=loss_euclidean_distance,
    optimizer=tf.keras.optimizers.Adam(),
    metrics=['mae'])

# test the model
history = model.evaluate(dataset)
