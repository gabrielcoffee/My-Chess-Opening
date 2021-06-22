//some functions that check if the user is logged and display menus on the page

var loginId;

// i got this usefull function from https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function createProfileMenu(username){
    var parent = document.getElementById("profile");
    var menu = document.createElement("nav");
    menu.setAttribute("class", "menu");
    var options = document.createElement("ul");
    var label = document.createElement("li");
    var labelTitle = document.createElement("a");
    labelTitle.innerHTML = username;
    label.appendChild(labelTitle);
    options.appendChild(label);
    var submenu = document.createElement("ul");
    var item1 = document.createElement("li");
    var item1Name = document.createElement("a");
    item1Name.innerHTML = "Profile"; 
    var item2 = document.createElement("li");
    var item2Name = document.createElement("a");
    item2Name.innerHTML = "Your analysis";
    var item3 = document.createElement("li");
    var item3Name = document.createElement("a");
    item3Name.innerHTML = "Log out";
    submenu.appendChild(item1);
    submenu.appendChild(item2);
    submenu.appendChild(item3);
    options.appendChild(submenu);
    menu.appendChild(options);
    parent.appendChild(menu);
}

function profile(){
    var cookies = document.cookie;
    if (cookies.indexOf("loginId") < 0 && cookies.indexOf("username") < 0){
        var loginButtons = document.getElementById("profile");
        var loginButton = document.createElement("a");
        loginButton.setAttribute("href", "login/");
        loginButton.innerHTML="Login";
        loginButtons.appendChild(loginButton);
        var registerButton = document.createElement("a");
        registerButton.setAttribute("href", "register/");
        registerButton.innerHTML="Register";
        loginButtons.appendChild(registerButton);
    }
    else{
        loginId = getCookie("loginId");
        var data = new FormData();
        data.append("loginId", loginId);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://mychessopening.com/api/login/checkIfLogged.php", true);
        xhr.onload = function (){
            var responseObj = JSON.parse(xhr.response);
            var isLogged = responseObj.logged;
            if (isLogged){  
                var username = getCookie("username");   
                createProfileMenu(username);
            }
            else{
                document.cookie = "loginId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                var loginButtons = document.getElementById("profile");
                var loginButton = document.createElement("button");
                loginButton.setAttribute("onclick", "onclicklogin()");
                loginButton.innerHTML="Login";
                loginButtons.appendChild(loginButton);
                var registerButton = document.createElement("button");
                registerButton.setAttribute("onclick", "onclickregister()");
                registerButton.innerHTML="Register";
                loginButtons.appendChild(registerButton);  
            }
        }
        xhr.send(data); 
    }  
}

