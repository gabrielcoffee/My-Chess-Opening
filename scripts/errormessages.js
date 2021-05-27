function playerNotFound(username, website){
    document.title = username + " not found";
    
    var ul = document.createElement("ul");

    // TODO APPEND NAV LINKS HERE ^^^^^^^^^^

    var messageSession = document.createElement("session");
    messageSession.setAttribute("id", "message");

    document.body.appendChild(messageSession);

    var message = document.createElement("p");
    message.innerHTML = "We couldn't find player " + username + " in " + website +
    " database, check if the data is correct and try again";

    document.getElementById("message").appendChild(message);

    var formulary = document.createElement("form");
    formulary.setAttribute("method", "POST");
    formulary.setAttribute("action", "../loading/");

    var input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("name", "username");
    input1.setAttribute("placeholder", "Type your username");
    input1.setAttribute("id", "username");

    formulary.appendChild(input1);

    var input2 = document.createElement("input");
    input2.setAttribute("type", "radio");
    input2.setAttribute("name", "website");
    input2.setAttribute("value", "lichess.org");
    input2.setAttribute("id", "lichess");

    formulary.appendChild(input2);

    var labellichess = document.createElement("label");
    labellichess.setAttribute("for", "lichess");
    labellichess.innerHTML = "lichess.org";
    
    formulary.appendChild(labellichess);

    var input3 = document.createElement("input");
    input3.setAttribute("type", "radio");
    input3.setAttribute("name", "website");
    input3.setAttribute("value", "chess.com");
    input3.setAttribute("id", "chess");

    formulary.appendChild(input3);

    var labelchess = document.createElement("label");
    labelchess.setAttribute("for", "chess");
    labelchess.innerHTML = "chess.com";

    formulary.appendChild(labelchess);

    var input4 = document.createElement("input");
    input4.setAttribute("type", "submit");
    input4.setAttribute("value", "Analyse games");

    formulary.appendChild(input4);

    var selects = document.createElement("select");
    selects.setAttribute("id", "amount");
    selects.setAttribute("name", "amount");

    var opt1 = document.createElement("option");
    opt1.innerHTML = 100;
    opt1.setAttribute("value", "100");
    selects.appendChild(opt1);

    var opt2 = document.createElement("option");
    opt2.innerHTML = 200;
    opt2.setAttribute("value", "200");
    selects.appendChild(opt2);
    
    var opt3 = document.createElement("option");
    opt3.innerHTML = 300;
    opt3.setAttribute("value", "300");
    selects.appendChild(opt3);
    
    var opt4 = document.createElement("option");
    opt4.innerHTML = 400;
    opt4.setAttribute("value", "400");
    selects.appendChild(opt4);

    formulary.appendChild(selects);

    document.body.appendChild(formulary);
}
