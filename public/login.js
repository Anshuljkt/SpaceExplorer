console.log("Login page code running");

const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
const errorText = document.getElementById('dispTitle');

loginButton.addEventListener('click', function (e) {
    username = document.getElementById('login_username').value;
    password = document.getElementById('login_password').value;

    loginRequest = {
        headers:{
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password
        }),
        redirect: "follow"
    }

    fetch(`/login`, loginRequest)
    .then(res => {
        res.redirected && (location.href = res.url)
        if (res.status == 400) {
            console.log("invalid password!")
            errorText.textContent = "Invalid username or password! Please try again."
        }
    })
    .catch(err => {
        alert(err)
    })
})

registerButton.addEventListener('click', function (e) {
    console.log("tryna register huh?")
    username = document.getElementById('register_username').value;
    password = document.getElementById('register_password').value;
    apiKey = document.getElementById('register_apiKey').value;
    
    registerRequest = {
        headers:{
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
            apiKey: apiKey
        }),
        redirect: "follow"
    }

    fetch(`/register`, registerRequest)
    .then(res => res.redirected && (location.href = res.url))
    .catch(err => {
        alert(err)
        console.log(err)
    })

    // request.open('POST', `/setAPIKey/${apiKey}`, false)
    // request.onload = function () {
    //     // data = JSON.parse(this.response);
    //     console.log(this.response)

    //     // console.log(data)
    // }
    // request.send();
})