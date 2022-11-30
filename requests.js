const https = require('http');

let request = https.get('http://localhost:8983/solr/football/query?q=*:*&q.op=OR&indent=true&rows=100', (res) => {
  if (res.statusCode !== 200) {
    console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
    res.resume();
    return;
  }

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

//   res.on('close', () => {
    // console.log('Retrieved all data');
    // console.log(JSON.parse(data));
//   });
  var reqBody = res.request;
  reqBody = JSON.parse(reqBody);
});

request.on('error', (err) => {
    console.error(`Encountered an error trying to make a request: ${err.message}`);
});