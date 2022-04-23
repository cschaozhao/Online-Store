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

  const regExpProductDetail = new RegExp('^\/productdetail.*');
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
      res.write("<table id='productsTable' style='margin: auto;'>");
      for (let i = 0; i < result.length; i += 4) {
        res.write("<tr>");
        for (let j = 0; j < 4 && i + j < result.length; j++) {
          res.write("<td width = '120'>");
          res.write(result[i + j]['product_id'] + "");
          res.write("<br>")
          res.write(result[i + j]["product_name"]);
          res.write("<br>  " + "Price:" + result[i + j]["price"]);
          res.write("</td>");
        }
        res.write("</tr>");
      }
      res.write("</table>");
      res.write("</div>");
      res.write("<script src='productsdisplay.js' charset='urf-8'></script>");
      var footer = fs.readFileSync('public/footer.html');
      res.end(footer);

    });

  } else if(regExpProductDetail.test(req.url)){
    res.writeHead(301, {
       'content-type': 'text/html;charset=UTF-8'
     });

     const result = JSON.parse(JSON.stringify(resultData));
     fs.readFile('public/displayProductDetails.html', 'utf8', (err, data) => {
       if (err) {
         console.log(err);
       }
       res.write(data);
       res.write("<table style='margin:auto;'>");
       res.write("<tr>");
       res.write("<td>product_name</td>");
       res.write("<td> result[0]['product_name'] </td>");
       res.write("<tr>");

       res.write("<tr>");
       res.write("<td>description</td>");
       res.write("<td>"+result[0]['description']+"</td>");
       res.write("<tr>");

       res.write("<tr>");
       res.write("<td>SKU</td>");
       res.write("<td>"+result[0]['SKU']+"</td>");
       res.write("<tr>");

       res.write("<tr>");
       res.write("<td>catagory</td>");
       res.write("<td>"+result[0]['catagory']+"</td>");
       res.write("<tr>");

       res.write("<tr>");
       res.write("<td>price</td>");
       res.write("<td>"+result[0]['price']+"</td>");
       res.write("<tr>");

       res.write("<tr>");
       res.write("<td>stock</td>");
       res.write("<td>"+result[0]['stock']+"</td>");
       res.write("<tr>");

       res.write("<tr>");
       res.write("<td>size</td>");
       res.write("<td>"+result[0]["size"]+"</td>");
       res.write("<tr>");

       res.write("<tr>");
       res.write("<td>reviews</td>");
       res.write("<td>"+result[0]['reviews']+"</td>");
       res.write("<tr>");

       res.write("<tr>");
       res.write("<td>customer_cata</td>");
       res.write("<td>"+result[0]['customer_cata']+"</td>");
       res.write("<tr>");

       res.write("</table>");
       res.write("</div>");

       var footer = fs.readFileSync('public/footer.html');
       res.end(footer);

     });
  }
}

// 程序入口
const webServer = http.createServer((req, res) => {

  let urlObj = url.parse(req.url, true);
  let method = req.method;

  // post数据

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
