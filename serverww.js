var express = require('express');
const https = require('http');
const path = require('path');
import fetch from 'node-fetch';
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

const fetch_json = (_value) => {
    const url = 'http://localhost:8983/solr/football/query?q=*'+ _value + '*&q.op=OR&indent=true&rows=10';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            return data;
        })
}

app.get('/get/', async (req, res)=> {
    res.render('index.ejs');
    let _value = req.query.value;
    // let _num = req.query.num;
    console.log(JSON.stringify(req.query), _value);

    const data = await fetch_json(_value);
    console.log(data, 'in the get');
    res.json(data);

})

app.get('*', function(req, res){
    res.status(404)
    res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  });

app.listen(3000, () => console.log('Listening'));