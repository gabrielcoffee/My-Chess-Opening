import tensorflow as tf
import tensorflowjs as tfjs
import separate_dataset as dt

BATCH_SIZE = 1
EPOCHS = 10

SIZE = input("Size: ")

dataset1 = tf.data.Dataset.from_tensor_slices(((dt.winsW), (dt.openingsW))).batch(BATCH_SIZE)
dataset2 = tf.data.Dataset.from_tensor_slices(((dt.winsB), (dt.openingsW))).batch(BATCH_SIZE)
dataset3 = tf.data.Dataset.from_tensor_slices(((dt.defeatsW), (dt.openingsD))).batch(BATCH_SIZE)
dataset4 = tf.data.Dataset.from_tensor_slices(((dt.defeatsB), (dt.openingsD))).batch(BATCH_SIZE)

model = tf.keras.models.load_model('last_version-{}.h5'.format(SIZE*4))

model.fit(dataset1, epochs=EPOCHS)
model.fit(dataset2, epochs=EPOCHS)
model.fit(dataset3, epochs=EPOCHS)
model.fit(dataset4, epochs=EPOCHS)

model.save("/last_version-{}.h5".format(SIZE*4))

tfjs.converters.save_keras_model(model, "G:/Documentos/Chess-Opening-Finder/model/{}".format(SIZE*4))
