const MODEL_URL = "../model/model.json"

async function run() {
    // Load the model from the CDN.
    const model = await tf.loadLayersModel(MODEL_URL);

    const TEST_VALUE = 950.0

    console.log("Passsei")
    // Print out the architecture of the loaded model.
    // This is useful to see that it matches what we built in Python.
    console.log(model.summary());

    // Create a 1 dimensional tensor with our test value.
    const input = tf.tensor1d([TEST_VALUE]);

    // Actually make the prediction.
    const result = model.predict(input);

}

run();