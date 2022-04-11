const url = require("url");
const {
  getProductList,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controller/product")

function handleRequest(req, res) {

  let urlObj = url.parse(req.url, true);
  let method = req.method;

  if (method === 'GET') {
    if (urlObj.pathname === '/showProducts') {
      let resultData = getProductList(urlObj.query);
      return resultData;
    } else if (urlObj.pathname === '/') {
      return
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
