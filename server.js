var express = require('express');
var SolrNode = require('solr-node');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());

var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'football',
    protocol: 'http'
});

// endpoints

app.get('/', function (req, res) {
    res.render('index.ejs')

});

app.get('/get', function (req, res) {
    let _value = '*' + req.query.value + '*';
    console.log(JSON.stringify(req.query), _value);

    client_query = client.query()
        .q(_value)
        .addParams({
            wt: 'json',
            indent: true
        })
        .start(0)
        .rows(100)
        ;

    console.log(client_query);

    client.search(client_query, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        toRender = result.response
        console.log('Response:', toRender);

        if (req.accepts("text/html")) {

            let css = 'public/style.css'

            let model = {
                css,
                toRender,
            }

            res.render('results.ejs', model)

        }
        else if (req.accepts("application/json")) {
            res.status(200).json(result);
        } else {
            res.status(406).end();
        }
    })
})

app.get('*', function (req, res) {
    res.status(404)
    res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
});

app.listen(3000, () => console.log('Listening'));