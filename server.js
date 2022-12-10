var express = require('express');
const https = require('http');
const path = require('path');
const { response } = require('express');
const port = 3000;
const app = express();

// solr-node
var SolrNode = require('solr-node');
    var client = new SolrNode({
        host: '127.0.0.1',
        port: '8983',
        core: 'football',
        protocol: 'http'
    });

//////////////
// endpoints
//////////////

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/get/', async (req, res) => { 
    let value = req.query.value
    let query = '*'+ value + '*';
    console.log(query);
    var strQuery = client.query().q(query);
    client.search(strQuery, function (err, result) {
        if (err) {
           console.log(err);
           return;
        }
        console.log('Response:', result.response);
        res.send(result.response);
    });
});
 
app.get('/bonus_exercise/', function(req, res){
    res.status(404)
    res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
});


// Listening
app.listen(3000, () => console.log('Listening'));