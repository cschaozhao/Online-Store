// jshint esversion:6

const fs = require("fs");
const _ = require("lodash");
const http = require("http");
const querystr = require("querystring");
const port = (process.env.PORT || 3000);
const router = require('./router/index');

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({'not':"not"});
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk;
    });
    req.on('end', () => {
      if (postData) {
        resolve(JSON.parse(postData));
      } else {
        resolve({});
      }
    });
  });
}

const webServer = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'application/json;charset=UTF-8'
  });

  getPostData(req).then((data) => {
    if(data === {'not':"not"}){
        router(req, res);
    }
    req.body = data;
    let result = router(req, res);
    if (result) {
      result.then(resultData => {
        res.end(JSON.stringify(resultData));
      });
    } else {
      res.writeHead(404, {
        'content-type': 'text/html'
      });
      res.end('404 not found');
    }
  });
});

webServer.listen(port, function() {
  console.log("Server is up and running!");
});
