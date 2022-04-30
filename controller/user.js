const query = require('../db/conn');

module.exports = {

  async registerUser(userObj) {
    let {
      user_name,
      password,
      email
    } = userObj;

    let verify_sql = "select count(*) from users where user_name = ?";

    let verify_result = await query(verify_sql, [user_name]);
    let a = JSON.parse(JSON.stringify(verify_result))[0]['count(*)'];
    if (a > 0) {
      return "fail";
    }

    let sql = "insert into users (user_name, password, email) values (?,?,?)";
    let resultData = await query(sql, [user_name, password, email]);
    if (resultData) {
      return 'success'
    } else {
      return "fail";
    }
  },

  async login_verify(userObj) {
    let {
      user_name,
      password
    } = userObj;
    let verify_sql = "select count(*) from users where user_name = ? and password = ?";
    let verify_result = await query(verify_sql, [user_name, password]);
    let a = JSON.parse(JSON.stringify(verify_result))[0]['count(*)'];
    if (a === 0) {
      return "fail";
    } else {
      return "success";
    }
  }
};
