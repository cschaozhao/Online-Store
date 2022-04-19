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

  const regExpEmployees = new RegExp('^\/employees\/.*', 'i');
  const regExpProducts = new RegExp('^\/showProducts.*');

  if (regExpProducts.test(req.url)) {

    res.writeHead(301, {
      'content-type': 'text/html;charset=UTF-8'
    });

    const result = JSON.parse(JSON.stringify(resultData));
    fs.readFile('public/displayProducts.html', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      res.write(data);
      res.write("<table>");
      for (let i = 0; i < result.length; i += 4) {
        res.write("<tr>");
        for (let j = 0; j < 4 && i + j < result.length; j++) {
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

  getPostData(req).then(function(data) {

    req.body = data;
    let result = router(req, res);

    if (result) {
      result.then(resultData => {
        render(req, res, resultData);
      });

    } else {
      render(req, res, {});
    }

  });

});

webServer.listen(port, function() {
  console.log("Server is up and running!");
});
