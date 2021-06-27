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
    labelTitle.setAttribute("href", "#");
    labelTitle.innerHTML = username;
    label.appendChild(labelTitle);
    var submenu = document.createElement("ul");
    var item1 = document.createElement("li");
    var item1Name = document.createElement("a");
    item1Name.setAttribute("href", "#");
    item1Name.innerHTML = "Profile"; 
    item1.appendChild(item1Name);
    var item2 = document.createElement("li");
    var item2Name = document.createElement("a");
    item2Name.setAttribute("href", "#");
    item2Name.innerHTML = "Your analysis"; 
    item2.appendChild(item2Name);
    var item3 = document.createElement("li");
    var item3Name = document.createElement("a");
    item3Name.setAttribute("href", "https://mychessopening.com/logout?id=" + loginId);
    item3Name.innerHTML = "Log out"; 
    item3.appendChild(item3Name);
    submenu.appendChild(item1);
    submenu.appendChild(item2);
    submenu.appendChild(item3);
    label.appendChild(submenu);
    options.appendChild(label);
    menu.appendChild(options);
    parent.appendChild(menu);
}

async function profile(){
    var isUserLogged = true;

    var cookies = document.cookie;
    if (cookies.indexOf("loginId") < 0 || cookies.indexOf("username") < 0){
        document.cookie = "loginId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        var loginButtons = document.getElementById("profile");
        var loginButton = document.createElement("a");
        loginButton.setAttribute("href", "https://mychessopening.com/login/");
        loginButton.innerHTML="Login";
        loginButtons.appendChild(loginButton);
        var registerButton = document.createElement("a");
        registerButton.setAttribute("href", "https://mychessopening.com/register/");
        registerButton.innerHTML="Register";
        loginButtons.appendChild(registerButton);
        isUserLogged = false;
    }
    else{
        loginId = getCookie("loginId");
        var data = new FormData();
        data.append("loginId", loginId);
        var fetcher = await fetch("https://mychessopening.com/api/login/checkIfLogged.php", {method: "POST", body: data})
        .then(function (responseData){
            return responseData.json();
        })
        .then(function (responseObj){
            var isLogged = responseObj.logged;
            if (isLogged){  
                var username = getCookie("username");   
                createProfileMenu(username);
                isUserLogged = true;
            }
            else{
                document.cookie = "loginId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                var loginButtons = document.getElementById("profile");
                var loginButton = document.createElement("a");
                loginButton.setAttribute("href", "https://mychessopening.com/login/");
                loginButton.innerHTML="Login";
                loginButtons.appendChild(loginButton);
                var registerButton = document.createElement("a");
                registerButton.setAttribute("href", "https://mychessopening.com/register/");
                registerButton.innerHTML="Register";
                loginButtons.appendChild(registerButton);
                isUserLogged = false;
            }
        });
    }  
    return isUserLogged;
}

