var express = require('express');
const https = require('http');
const path = require('path');
var app = express();
var fs = require('fs');
const { response } = require('express');
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

function req_function(first, second, num) {
    let query = 'http://localhost:8983/solr/football/query?q=' + first + '%3A' + second + '&q.op=OR&indent=true&rows=' + num;
    
    let req = https.get(query, (res) => {
        if (res.statusCode !== 200) {
          console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
          res.resume();
          return;
        }
    
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('Retrieved all data');
            try {
                console.log(data);
                return data;
            } catch(e) {
                console.error(e);
            }
        });

    });
    
    req.on('error', (err) => {
        console.error(`Encountered an error trying to make a request: ${err.message}`);
    });
    req.end();

}

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/query/:field/:value/:num', function (req, res) {
    let _field = req.params.field;
    let _value = req.params.value;
    let _num = req.params.num;

    if (req.accepts('application/json')) {
        res.status(200).type('application/json').json(req_function(_field, _value, _num));
    }
})

app.listen(3000, () => console.log('Listening'));