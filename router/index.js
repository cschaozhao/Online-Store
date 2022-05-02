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
  addToCart,
  showCartItems,
  cleanCart,
  updateCart
} = require("../controller/cart");

const {
  registerUser,
  login_verify
} = require("../controller/user");

const {
  placeOrder,
  showOrders,
  showOrderDetail
} = require("../controller/order")

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

  } else if (urlObj.pathname === '/productdetail' && method === 'GET') {
    let resultData = getProductDetails(urlObj.query);
    return resultData;

  } else if (urlObj.pathname === '/register') {
    if (method == 'GET') {
      res.writeHead(200, {
        'content-type': 'text/html'
      });
      fs.readFile('public/register.html', 'utf8', (err, data) => {
        if (err) {
          console.log(err);
        }
        res.end(data);
      });
    } else if (method == 'POST') {
      let resultData = registerUser(req.body);
      resultData.then(data => {
        if (data === 'success') {
          res.writeHead(200, {
            'content-type': 'text/html'
          });
          res.end();
        } else {
          res.writeHead(500, {
            'content-type': 'text/html'
          });
          res.end();
        }
      });
    }
  } else if (urlObj.pathname === '/login') {
    if (method == 'GET') {
      res.writeHead(200, {
        'content-type': 'text/html'
      });
      fs.readFile('public/login.html', 'utf8', (err, data) => {
        if (err) {
          console.log(err);
        }
        res.end(data);
      });
    } else if (method == 'POST') {
      let resultData = login_verify(req.body);
      resultData.then(data => {
        if (data === 'fail') {
          res.writeHead(500, {
            'content-type': 'text/html'
          });
          res.end();
        } else if (data === 'success') {
          res.writeHead(200, {
            'content-type': 'text/html'
          });
          res.end();
        }
      });
    }
  } else if (urlObj.pathname === '/addToCart' && method === 'POST') {
    let resultData = addToCart(req.body);
    resultData.then(data => {
      if (data === 'fail') {
        res.writeHead(500, {
          'content-type': 'text/html'
        });
        res.end();
      } else if (data === 'success') {
        res.writeHead(200, {
          'content-type': 'text/html'
        });
        res.end();
      }
    });
  } else if (urlObj.pathname === '/personalPage' && method === 'GET') {
    res.writeHead(200, {
      'content-type': 'text/html'
    });
    fs.readFile('public/memberPage.html', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      res.end(data);
    });
  } else if (urlObj.pathname === '/showCart' && method === 'GET') {
    let resultData = showCartItems(urlObj.query);
    if (resultData) {
      resultData.then(data => {
        let cart_content = JSON.stringify(data);
        res.writeHead(200, {
          'content-type': 'application/json'
        });
        res.end(cart_content);
      });

    } else {
      res.writeHead(400, {
        'content-type': 'application/json'
      });
      res.end();
    }
  } else if (urlObj.pathname === '/placeOrder' && method === 'POST') {

    let resultData_1 = placeOrder(req.body);
    let resultData_2 = cleanCart(req.body);
    resultData_1.then(data => {
      console.log(data);
    });
    res.writeHead(200, {
      'content-type': 'application/json'
    });
    res.end();
  } else if (urlObj.pathname === "/showOrders" && method === 'GET') {
    let resultData = showOrders(urlObj.query);
    if (resultData) {
      resultData.then(data => {
        let orders = JSON.stringify(data);
        res.writeHead(200, {
          'content-type': 'application/json'
        });
        res.end(orders);
      });

    } else {
      res.writeHead(400, {
        'content-type': 'application/json'
      });
      res.end();
    }
  } else if (urlObj.pathname === '/orderDetail' && method === 'GET') {
    let resultData = showOrderDetail(urlObj.query);
    if (resultData) {
      resultData.then(data => {
        let order_detail = JSON.stringify(data);
        res.writeHead(200, {
          'content-type': 'application/json'
        });
        res.end(order_detail);
      });

    } else {
      res.writeHead(400, {
        'content-type': 'application/json'
      });
      res.end();
    }
  } else if (urlObj.pathname === '/emptyCart' && method === 'POST') {
    let resultData = cleanCart(req.body);
    res.writeHead(200, {
      'content-type': 'application/json'
    });
    res.end();
  }




  else if (urlObj.pathname === '/deleteProduct' && method === 'POST') {
    let resultData = deleteProduct(urlObj.query.id);
    return resultData;

  } else if (urlObj.pathname === '/updateProduct' && method === 'POST') {
    let resultData = updateProduct(urlObj.query.id, req.body);
    return resultData;

  } else if (urlObj.pathname === '/addProduct' && method === 'POST') {
    let resultData = addProduct(req.body);
    return resultData;

  }

}

module.exports = handleRequest;
