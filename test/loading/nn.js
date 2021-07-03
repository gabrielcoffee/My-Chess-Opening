class CapablancAI{
    constructor(amount){
        this.amount = amount.toString();
        this.MODEL_URL = "https://mychessopening.com/CapablancAI/models/"+this.amount+"/model.json";
    }

    async getModel(){
        this.model = await tf.loadLayersModel(this.MODEL_URL);
    }

    makePrediction(data){
        var input_array = [];
        for (var i = 0; i < data.length; i++){
            input_array.push([data[i].threats, data[i].mobility]);
        }

        var prediction = this.model.predict(tf.tensor3d([input_array]), {batchSize: 1}).arraySync()

        return prediction;
    }
}

async function createModel(){
    updateStatusMessage("CapablancAI is making a prediction");
    model = new CapablancAI(amount);
    await model.getModel();

    return model;
}
