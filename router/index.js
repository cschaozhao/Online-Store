const url = require("url");
const fs = require("fs");
const path = require("path");


const {
  getProductList,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controller/product")

const {
  addToCart
} = require("../controller/cart")


function handleRequest(req, res) {


  let urlObj = url.parse(req.url, true);
  let method = req.method;

  if (method === 'GET') {
    if (urlObj.pathname === '/showProducts') {
      let resultData = getProductList(urlObj.query);
      return resultData;

    } else if (urlObj.pathname === '/') {
      // res.writeHead(301, {
      //   "Location": "http://" + req.headers['host'] + '/queryProduct.html'
      // });
      // res.write("<h1>fuck</h1>")
      // console.log("here");
      // fs.readFile('views/queryProduct.html', 'utf8', (err, data) =>{
        // console.log(data);
        // if(err){
          // console.log(err);
        // }
        // return data;
        // res.write(data);
        // console.log(res);
      // });

      // return new Promise((resolve, reject) => {
      //   resolve({"success": "success"});
      // });

    }
  } else if (method === 'POST') {

    if (urlObj.pathname === '/deleteProduct') {
      let resultData = deleteProduct(urlObj.query.id);
      return resultData;
    } else if (urlObj.pathname === '/updateProduct') {
      let resultData = updateProduct(urlObj.query.id, req.body);
      return resultData;
    } else if (urlObj.pathname === '/addProduct') {
      let resultData = addProduct(req.body);
      return resultData;
    } else if (urlObj.pathname === '/addToCart') {
      let resultData = addToCart(req.body);
      return resultData;
    }
  } else if (method === 'DELETE') {
    if (urlObj.pathname === '/') {
      console.log("a");
    } else if (urlObj.pathname === '/') {
      console.log('b');
    }
  } else {
    if (urlObj.pathname === '/') {
      console.log('c');
    } else if (urlObj.pathname === '/') {
      console.log('d');
    }
  }
}

module.exports = handleRequest;
