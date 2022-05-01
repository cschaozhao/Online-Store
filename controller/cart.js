const query = require('../db/conn');

module.exports = {

  async addToCart(productObj) {
    let {
      user_name,
      product_name,
      SKU,
      size,
      price,
    } = productObj;

    let check_stock_sql = "select stock from products where product_name=?";
    let checkResult = await query(check_stock_sql, [product_name]);
    let a = JSON.parse(JSON.stringify(checkResult))[0]['stock'];
    if (a === '0' || a === 0) {
      return "fail";
    }

    let check_already_sql = "select count(*) from carts where user_name=? and product_name=? and size=?";
    let exit_result = await query(check_already_sql, [user_name, product_name, size]);
    let b = JSON.parse(JSON.stringify(exit_result))[0]['count(*)'];
    if (b === 0) {
      let sql = "insert into carts (user_name, product_name, SKU, size, price, number) values (?,?,?,?,?,1)";
      let resultData = await query(sql, [user_name, product_name, SKU, size, price]);
      if (resultData) {
        return "success";
      } else {
        return "fail";
      }
    } else {
      let sql1 = "select number from carts where user_name=? and product_name=? and size=?"
      let count = await query(sql1, [user_name, product_name, size]);
      let n = JSON.parse(JSON.stringify(count))[0]['number'];
      let sql = "update carts set number=? where user_name=? and product_name=? and size=?";
      let resultData = await query(sql, [1 + n, user_name, product_name, size]);
      if (resultData) {
        return "success";
      } else {
        return "fail";
      }
    }
  }
};
