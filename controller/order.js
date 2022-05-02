const query = require('../db/conn');
const date = require("silly-datetime");

module.exports = {

    async placeOrder(orderObj) {

        let {
            user_name,
            product_name,
            retail_price,
            product_quantity,
            SKU,
            product_size,
            total_price
        } = orderObj

        const today = date.format(new Date(), 'YYY-MM-DD');
        const order_id = user_name + "" + Math.floor(Date.now() / 1000);

        let sql = "insert into orders (order_id,user_name,product_name,order_time,retail_price,product_quantity,SKU,total_price,product_size) values (?,?,?,?,?,?,?,?,?)";
        for (let i = 0; i < product_name.length; i++) {
            await query(sql, [order_id, user_name, product_name[i], today, retail_price[i], product_quantity[i], SKU[i], total_price, product_size[i]]);
        }
        return "success";
    },

    async showOrders(urlParams) {
        let {
            user_name
        } = urlParams;
        let sql = "SELECT DISTINCT order_id, order_time, total_price from (SELECT * from orders where user_name=?) as T";
        let resultData = await query(sql, [user_name]);
        return resultData;
    },

    async showOrderDetail(urlParams){
        let{
            order_id
        } = urlParams;
        let sql = "select * from orders where order_id=?";
        let resultData = await query(sql, [order_id]);
        return resultData;
    }


};
