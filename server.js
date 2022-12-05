var express = require('express');
const https = require('http');
const path = require('path');
const axios = require('axios');
var app = express();
var fs = require('fs');
const { response } = require('express');
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

// endpoints

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/query/:field/:value/:num', function (req, res) {
    let _field = req.params.field;
    let _value = req.params.value;
    let _num = req.params.num;
    if (isNan(_num)) {
        _num = 10;
    }

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

app.listen(3000, () => console.log('Listening'));