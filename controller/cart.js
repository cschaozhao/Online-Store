const query = require('../db/conn');

module.exports = {

  async addToCart(productObj) {
    let {
        userid, 
        product_id, 
        number
    } = productObj;
    
    let sql = "insert into carts (userid, product_id, number) values (?,?,?)";
    let resultData = await query(sql, [userid, product_id, number]);
    if (resultData) {
      return {
        msg: 'Added to Bag'
    
      }
    } else {
      return {
        msg: "Something wrong please check"
      }
    }
  }
};
