const https = require('http');

function req(first, second, num) {
    let query = 'http://localhost:8983/solr/football/query?q=' + first + '%3A' + second + '&q.op=OR&indent=true&rows=' + num;
    console.log(query);
    let request = https.get(query, (res) => {
        if (res.statusCode !== 200) {
          console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
          res.resume();
          return;
        }
    
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('close', () => {
            console.log('Retrieved all data');
            console.log(data)
        });
    
    });
    
    request.on('error', (err) => {
        console.error(`Encountered an error trying to make a request: ${err.message}`);
    });
}

const myArgs = process.argv.slice(2)

req(myArgs[0], myArgs[1], myArgs[2])
