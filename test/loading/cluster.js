var centroids = [[-1.636254198009784, 0.23298365409637922], [0.05126486620313806, -0.031658181518080156], [0.2862328705948343, 0.299252719895884],
                 [2.04855527547715, -0.020812387468491546], [0.952742302952954, -0.06015398526634926],  [-1.0146094878900547, -0.17759658290542968],
                 [1.4110441323444214, 0.18303806568128403], [0.469161251987824, -0.16202475478751616], [0.04346896623228627, 0.6786195239342433],
                 [-0.7315783441944593, 0.27838663285289433], [1.2146645784390178, -0.5207906261782317], [-0.3934809781849448, 0.5877035906818305],
                 [-0.13689951592653568, 0.272358901546565], [-1.128008084276775, 0.5495023340665937], [-0.22609257174215258, -0.8346897086791283],
                 [0.15949914476228025, -0.4912459944082085], [-0.4496926755726309, -0.031609189511138655], [0.7379709111545613, 0.4310865025720524],
                 [-0.1838239172782518, -0.31886659243604293],  [-1.7846693569382353, -0.41312462032458763]] 
            
function euclideanDistance(x1, x2, y1, y2){
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}

function findNearestCentroid(x, y){
    var closest = 9999;
    var centroid = 0;
    for (var i = 0; i < 20; i++){
        var currentCentroid = centroids[i];
        var distance = euclideanDistance(x, currentCentroid[0], y, currentCentroid[1]);
        if (distance < closest){
            centroid = i;
            closest = distance;
        }
    }
    return {"distance": closest, "centroid": centroid};
}

function distribute(games){
    updateProgressMessage("Clustering games");

    var closestDistance;

    closestDistance = 9999;
    for (var i = 0; i < games.winsW.length; i++){
        games.winsW[i].centroid = findNearestCentroid(games.winsW[i].threats, games.winsW[i].mobility);
        if (games.winsW[i].centroid.distance < closestDistance){
            games.bestGameWinsW = games.winsW[i];
            closestDistance = games.winsW[i].centroid.distance;
        }
    }

    closestDistance = 9999;
    for (var i = 0; i < games.winsB.length; i++){
        games.winsB[i].centroid = findNearestCentroid(games.winsB[i].threats, games.winsB[i].mobility);
        if (games.winsB[i].centroid.distance < closestDistance){
            games.bestGameWinsB = games.winsB[i];
            closestDistance = games.winsB[i].centroid.distance;
        }
    }

    closestDistance = 9999;
    for (var i = 0; i < games.lossW.length; i++){
        games.lossW[i].centroid = findNearestCentroid(games.lossW[i].threats, games.lossW[i].mobility);
        if (games.lossW[i].centroid.distance < closestDistance){
            games.bestGameLossW = games.lossW[i];
            closestDistance = games.lossW[i].centroid.distance;
        }
    }

    closestDistance = 9999;
    for (var i = 0; i < games.lossB.length; i++){
        games.lossB[i].centroid = findNearestCentroid(games.lossB[i].threats, games.lossB[i].mobility);
        if (games.lossB[i].centroid.distance < closestDistance){
            games.bestGameLossB = games.lossB[i];
            closestDistance = games.lossB[i].centroid.distance;
        }
    }

    return games;
}