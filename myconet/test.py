import tensorflow as tf
import numpy as np

k_init = tf.keras.initializers.Constant(value=0.1)
b_init = tf.keras.initializers.Constant(value=0)
r_init = tf.keras.initializers.Constant(value=0.1)
# LSTM units
units = 1

input_layer = tf.keras.layers.Input(shape=(2,2))
output_layer = tf.keras.layers.LSTM(units, return_state=True, kernel_initializer=k_init, bias_initializer=b_init, recurrent_initializer=r_init)(input_layer)

model = tf.keras.Model(inputs=input_layer, outputs=output_layer)

in_array = np.array([[2,1],[3,5]], ndmin=3)

print(model.predict(in_array))
