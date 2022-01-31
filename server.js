const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log();
let API_KEY = 'DEMO_KEY';
let potdURL = '';
let altText = '';
const API = `https://api.nasa.gov`

const simpleGet = {
  method: 'GET',
  headers: {
    "Accept": 'application/json'
  }
}

app.get('/', function (req, res) {
  // Display Login page
  // Sets picture of the day to a static image
  res.render('login', {
    imgSrc: 'https://i.natgeofe.com/n/8a3e578f-346b-479f-971d-29dd99a6b699/nationalgeographic_2751013_4x3.jpg',
    text: altText
  });
})

app.post('/setAPIKey/:apiKey', function (req, res) {
  // Set an API key to be used by the function after login was successful
  API_KEY = req.params.apiKey
  API_KEY = 'DEMO_KEY'
  
  // res.redirect('/home')

  // successfulLogin = 
  // { result: "success",
  //   message: `Set API Key to: ${API_KEY}`}
  // res.send(JSON.stringify(successfulLogin))
  
})

app.post('/login', function (req, res) {
  payload = req.body
  username = payload.username
  password = payload.password
  console.log(req.body)
  if (password == 'abcd') {
    res.redirect('/home')
  } else {
    res.status(400).send()
  }
})

app.post('/register', function (req, res) {
  payload = req.body
  username = payload.username
  password = payload.password
  API_KEY = payload.apiKey

  
})

app.get('/home', function (req, res) {
  // Display home page
  // Sets picture of the day
  var potdURL;
  var altText;
  url = `${API}/planetary/apod?api_key=${API_KEY}`;
  console.log(url);
  fetch(url, simpleGet)
    .then(resp => resp.json())
    .then(resp => {
      potdURL = resp.url;
      altText = resp.explanation;
      if (potdURL === undefined) {
        potdURL = "https://apod.nasa.gov/apod/image/2201/sunprom3_soho_960.jpg";
      }
      res.render('index', {
        imgSrc: potdURL,
        text: altText
      });
    })
    .catch(err => {
      console.error(err);
    })
})


app.get('/asteroids', function (req, res) {
  //Returns Asteroids using NASA's NeoWS API.
  url = `${API}/neo/rest/v1/feed?detailed=false&api_key=${API_KEY}`;
  console.log(url);
  fetch(url, simpleGet)
    .then(resp => resp.json())
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      console.error(err);
    })
})

app.get('/imagery/:lat/:long', function (req, res) {
  //Returns JSON data linking to an image from NASA's Earth Imagery API
  url = `${API}/planetary/earth/imagery/?lat=${req.params.lat}&lon=${req.params.long}&api_key=${API_KEY}`;
  console.log(url);
  fetch(url, simpleGet)
    .then(resp => resp.json())
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      console.error(err);
    })
})

app.get('/marsImagery/:sols', function (req, res) {
  url = `${API}/mars-photos/api/v1/rovers/curiosity/photos?sol=${req.params.sols}&api_key=${API_KEY}`;
  console.log(url);
  fetch(url, simpleGet)
    .then(resp => resp.json())
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      console.error(err);
    })
})

app.get('/search/:query', function (req, res) {
  url = `https://images-api.nasa.gov/search?q=${req.params.query}`
  console.log(url);
  fetch(url, simpleGet)
    .then(resp => resp.json())
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      console.error(err);
    })
})

app.get('/epicImagery', function (req, res) {
  url = `${API}/EPIC/api/natural/images?api_key=${API_KEY}`
  console.log(url);
  fetch(url, simpleGet)
    .then(resp => resp.json())
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      console.error(err);
    })
})

app.listen(9001, function () {
  console.log(`Listening on port 9001`);
})

