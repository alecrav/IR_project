var express = require('express');
const https = require('http');
const path = require('path');
const axios = require('axios');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
const { response } = require('express');
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());

// endpoints

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/get', function (req, res) {
    res.render('index.ejs');
    let _field = req.query.field;
    let _value = req.query.value;
    let _num = req.query.num;
    console.log(JSON.stringify(req.query), _field, _value, _num);
    

    let url = 'http://localhost:8983/solr/football/query?q=' + _field + '%3A' + _value + '&q.op=OR&indent=true&rows=' + _num;
    
    // get the data making another request
    axios({
        method:'get',
        url,
        auth: {
            username: 'the_username',
            password: 'the_password'
        }
    })
    .then(function (response) {
        res.status(200).send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
})

app.get('*', function(req, res){
    res.status(404)
    res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  });

app.listen(3000, () => console.log('Listening'));