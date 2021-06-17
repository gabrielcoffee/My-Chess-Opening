function addEvaluation(games){
    
    updateProgressMessage("Evaluating positions");

    for (var i = 0; i < games.winsW.length; i++){
        games.winsW[i].threats = threatsMg(games.winsW[i].fen);
        games.winsW[i].mobility = mobilityMg(games.winsW[i].fen);
        games.winsB[i].threats = threatsMg(games.winsB[i].fen);
        games.winsB[i].mobility = mobilityMg(games.winsB[i].fen);
        games.lossW[i].threats = threatsMg(games.lossW[i].fen);
        games.lossW[i].mobility = mobilityMg(games.lossW[i].fen);
        games.lossB[i].threats = threatsMg(games.lossB[i].fen);
        games.lossB[i].mobility = mobilityMg(games.lossB[i].fen);
    }

    return games;
}