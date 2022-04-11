const query = require('../db/conn');

module.exports = {

  async getProductList(urlParams) {
    let {
      product_name,
      price_low,
      price_high,
      size,
      catagory,
      customer_cata
    } = urlParams;
    params = []
    console.log(urlParams);
    let sql = "select * from products where 1=1";

    if (product_name) {
      sql += " and product_name like ?";
      params.push("%"+product_name+"%");
    }
    if (price_low) {
      sql += " and price>=?";
      params.push(price_low);
    }
    if (price_high) {
      sql += " and price<=?";
      params.push(price_high);
    }
    if(size){
      sql += " and size=?";
      params.push(size);
    }
    if(catagory){
      sql += " and catagory=?"
      params.push(catagory);
    }
    if(customer_cata){
      sql += " and customer_cata=?"
      params.push(customer_cata);
    }
    let resultData = await query(sql, params);
    return resultData;
  },

  async addProduct(productObj) {
    let {
      product_name,
      description,
      catagory,
      price,
      quantity
    } = productObj;
    console.log(description);
    let sql = "insert into products (product_name, description, catagory, price, quantity) values (?,?,?,?,?)";
    let resultData = await query(sql, [product_name, description, catagory, price, quantity]);
    if (resultData) {
      return {
        msg: 'Success'
      }
    } else {
      return {
        msg: "Fail"
      }
    }
  },

  async updateProduct(id, productObj) {
    let {
      name,
      price,
      description
    } = productObj;
    let sql = "update products set name = ?, price = ?, description = ? where id = ?";
    let resultData = await query(sql, [name, price, description, id]);
    if (resultData.affectedRows > 0) {
      return {
        msg: 'Success'
      }
    } else {
      return {
        msg: "Fail"
      }
    }
  },

  async deleteProduct(id) {
    let sql = "delete from products where id = ?";
    let resultData = await query(sql, [id]);
    if (resultData.affectedRows > 0) {
      return {
        msg: 'Success'
      }
    } else {
      return {
        msg: "Fail"
      }
    }
  }
};
