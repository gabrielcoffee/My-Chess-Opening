import tensorflow as tf
import numpy as np

# vectorizing the text
example_texts = ['abcdefg', 'xyz']

chars = tf.strings.unicode_split(example_texts, input_encoding='UTF-8')
ids_from_chars = tf.keras.layers.experimental.preprocessing.StringLookup(
    vocabulary=list(vocab))

ids = ids_from_chars(chars)
print(ids)