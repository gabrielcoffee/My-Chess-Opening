function correctMonth(month){
    switch(month){
        case 0:
            return "/01";
        case 1:
            return "/02";
        case 2:
            return "/03";
        case 3:
            return "/04";
        case 4:
            return "/05";
        case 5:
            return "/06";
        case 6:
            return "/07";
        case 7:
            return "/08";
        case 8:
            return "/09";
        case 9:
            return "/10";
        case 10:
            return "/11";
        case 11:
            return "/12";
    }
}

async function fetchGames(url){
    let fetcher = await fetch(url, {method: 'GET',})
    .then(function(response){
        return response.json();
    });
    
    return fetcher;
}

async function load_games(username){
    
    var data = new Date(Date.now());
    var year = data.getFullYear();
    var month = correctMonth(data.getMonth()); //correct month returns the actual month - 1;

    var url = "https://api.chess.com/pub/player/"+ username +"/games/" + year + month;

    let response = fetchGames(url);

    response.then(function(gamesJson){
        //process games here
    })

    return response;
}
