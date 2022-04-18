// jshint esversion:6

const fs = require("fs");
const _ = require("lodash");
const http = require("http");
const querystr = require("querystring");
const port = (process.env.PORT || 3000);
const router = require('./router/index');
const url = require('url');
const path = require('path');

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
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


function render(req, res, resultData) {

  const regExpEmployees = new RegExp('^\/employees\/.*','i');
  const regExpProducts = new RegExp('^\/showProducts.*');

  if(req.url.match(/.css$/)){
    let cssPath = path.join(__dirname,"public",req.url);
    let cssReadStream = fs.createReadStream(cssPath,"UTF-8");
    res.statusCode = 200;
    res.setHeader("Content-Type","text/css");
    cssReadStream.pipe(res);
  }

  if(req.url.match(/.js$/)){
    let jsPath = path.join(__dirname,"public",req.url);
    let jsReadStream = fs.createReadStream(jsPath,"UTF-8");
    res.statusCode = 200;
    res.setHeader("Content-Type","application/javascript");
    cssReadStream.pipe(res);
  }

  if(regExpProducts.test(req.url)){

    res.writeHead(301, {
      'content-type': 'text/html;charset=UTF-8'
    });

    const result = JSON.parse(JSON.stringify(resultData));

    fs.readFile('public/displayProducts.html', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
      res.write(data);
      res.write("<table>");
      for(let i = 0; i < result.length; i += 4){
        res.write("<tr>");
        for(let j = 0; j < 4; j++){
          res.write("<td width = '70'>");
          res.write(result[i + j]["product_name"]);
          res.write("  <br>  " + "Price:" + result[i + j]["price"]);
          res.write("</td>");
        }
        res.write("</tr>");
      }
      res.write("</table>");
      res.write("</body>");
      res.end("</html>");
    });
  }

}


const webServer = http.createServer((req, res) => {
  let urlObj = url.parse(req.url, true);
  let method = req.method;
  if (urlObj.pathname === '/' && method == 'GET') {
    res.writeHead(200, {
      'content-type': 'text/html'
    });
    fs.readFile('public/searchProducts.html', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      res.end(data);
    });

  } else {
    res.writeHead(301, {
      'content-type': 'application/json;charset=UTF-8'
    });
    getPostData(req).then(function(data) {
      req.body = data;
      let result = router(req, res);
      if (result) {
        result.then(resultData => {
          render(req, res, resultData);
        });
      } else {
        res.writeHead(404, {
          'content-type': 'text/html'
        });
        res.end('404 not found');
      }
    });
  }
});

webServer.listen(port, function() {
  console.log("Server is up and running!");
});
