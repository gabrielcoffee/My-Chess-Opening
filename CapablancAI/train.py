import tensorflow as tf
import tensorflowjs as tfjs
import separate_dataset as dt

BATCH_SIZE = 1
EPOCHS = 10

SIZE = dt.size_of_the_dataset

dataset1 = tf.data.Dataset.from_tensor_slices(((dt.winsW), (dt.openingsW))).batch(BATCH_SIZE)
dataset2 = tf.data.Dataset.from_tensor_slices(((dt.winsB), (dt.openingsW))).batch(BATCH_SIZE)
dataset3 = tf.data.Dataset.from_tensor_slices(((dt.defeatsW), (dt.openingsD))).batch(BATCH_SIZE)
dataset4 = tf.data.Dataset.from_tensor_slices(((dt.defeatsB), (dt.openingsD))).batch(BATCH_SIZE)

model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation="sigmoid"),
    tf.keras.layers.Dense(64, activation="sigmoid"),
    tf.keras.layers.Dense(8, activation="sigmoid"),
    tf.keras.layers.Dense(2, activation="sigmoid"),
    tf.keras.layers.GlobalAveragePooling1D()
])

model.compile(optimizer="rmsprop", loss="mae")

model.fit(dataset1, epochs=EPOCHS)
model.fit(dataset2, epochs=EPOCHS)
model.fit(dataset3, epochs=EPOCHS)
model.fit(dataset4, epochs=EPOCHS)

model.save("last_version-{}.h5".format(SIZE*4))

tfjs.converters.save_keras_model(model, "G:/Documentos/Chess-Opening-Finder/model/{}/".format(SIZE*4))
