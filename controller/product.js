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
    let sql = "select * from products where 1=1";

    if (product_name) {
      sql += " and product_name like ?";
      params.push("%" + product_name + "%");
    }
    if (price_low) {
      sql += " and price>=?";
      params.push(price_low);
    }
    if (price_high) {
      sql += " and price<=?";
      params.push(price_high);
    }
    if (size) {
      sql += " and size=?";
      params.push(size);
    }
    if (catagory) {
      sql += " and catagory=?"
      params.push(catagory);
    }
    if (customer_cata) {
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
      SKU,
      catagory,
      price,
      stock,
      size,
      reviews,
      customer_cata
    } = productObj;

    let sql = "insert into products( product_name, description, SKU, catagory, price, stock, size, reviews, customer_cata) values ( ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    let resultData = await query(sql, [product_name, description, SKU, catagory, price, stock, size, reviews, customer_cata]);
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
  },

  async getProductDetails(urlParams) {
    let {
      product_id
    } = urlParams;
    let sql = "select * from products where product_id = ?";
    let resultData = await query(sql, [product_id]);
    return resultData;
  },

};
