const url = require("url");
const fs = require("fs");
const path = require("path");

const {
  getProductList,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductDetails
} = require("../controller/product")

const {
  addToCart
} = require("../controller/cart")

function handleRequest(req, res) {

  let urlObj = url.parse(req.url, true);
  let method = req.method;

  if (req.url.match(/style.css$/)) {
    let cssPath = path.join(__dirname, "../public/css", req.url);
    let cssReadStream = fs.createReadStream(cssPath, "UTF-8");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/css");
    cssReadStream.pipe(res);

  } else if (req.url.match(/.js$/)) {
    let jsPath = path.join(__dirname, "../public/js", req.url);
    let jsReadStream = fs.createReadStream(jsPath, "UTF-8");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/javascript");
    jsReadStream.pipe(res);

  } else if (req.url.match(/.jpg$/) || req.url.match(/.png$/)) {
    let imgPath = path.join(__dirname, "../public/images", req.url);
    let imgReadStream = fs.createReadStream(imgPath);
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    imgReadStream.pipe(res);

  } else if (urlObj.pathname === '/' && method === 'GET') {
    res.writeHead(200, {
      'content-type': 'text/html'
    });
    fs.readFile('public/welcome.html', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      res.end(data);
    });

  } else if (urlObj.pathname === '/addProduct' && method === 'GET') {
    res.writeHead(200, {
      'content-type': 'text/html'
    });
    fs.readFile('public/add.html', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      res.end(data);
    });

  } else if (urlObj.pathname === '/searchProduct' && method == 'GET') {
    res.writeHead(200, {
      'content-type': 'text/html'
    });
    fs.readFile('public/searchProducts.html', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      res.end(data);
    });

  } else if (urlObj.pathname === '/showProducts' && method === 'GET') {
    let resultData = getProductList(urlObj.query);
    return resultData;

  } else if(urlObj.pathname === '/productdetail' && method === 'GET'){
    let resultData = getProductDetails(urlObj.query);
    return resultData;

  } else if (urlObj.pathname === '/deleteProduct' && method === 'POST') {
    let resultData = deleteProduct(urlObj.query.id);
    return resultData;

  } else if (urlObj.pathname === '/updateProduct' && method === 'POST') {
    let resultData = updateProduct(urlObj.query.id, req.body);
    return resultData;

  } else if (urlObj.pathname === '/addProduct' && method === 'POST') {
    let resultData = addProduct(req.body);
    return resultData;

  } else if (urlObj.pathname === '/addToCart' && method === 'POST') {
    let resultData = addToCart(req.body);
    return resultData;
  }

}

module.exports = handleRequest;
