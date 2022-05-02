var path = window.location.href + "";
path = path.substr(0, path.indexOf("personalPage"))

var men = document.getElementById('men').addEventListener("click", () => {
    const url = path + "showProducts?customer_cata=Men";
    window.location.href = url;
});

var women = document.getElementById('women').addEventListener("click", () => {
    const url = path + "showProducts?customer_cata=Women";
    window.location.href = url;
});

var boys = document.getElementById('boys').addEventListener("click", () => {
    const url = path + "showProducts?customer_cata=Boys";
    window.location.href = url;
});

var girls = document.getElementById('girls').addEventListener("click", () => {
    const url = path + "showProducts?customer_cata=Girls";
    window.location.href = url;
});

// const user_name = document.cookie.split(";")[1].split("=")[1];
const user_name = document.cookie.split("=")[1];

var login = document.getElementById("login-part");
if (user_name.length > 0) {
    login.innerHTML = "Welcome, <a href='/personalPage'>" + user_name + "</a>";
}

var place_Order = document.getElementById("placeOrder");
var order = document.getElementById("showOrders");

var itemsInCart = {
    'user_name': user_name,
    'product_name': [],
    'retail_price': [],
    'product_quantity': [],
    'SKU': [],
    'product_size': [],
    'total_price': 0.0
};

setTimeout(showCart, 50)

place_Order.addEventListener('click', e => {
    e.preventDefault();
    placeOrder();
});

// order.addEventListener('click', e => {
//     e.preventDefault();
//     showOrders();
// });
setTimeout(showOrders, 50)

function sendHttpRequest(method, url, data) {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: data ? { 'Content-Type': 'application/json' } : {}
    }).then(response => {
        if (response.status >= 400) {
            alert("Empty cart, go and get something!")
            return response.json().then(errResData => {
                const error = new Error('something went wrong!');
                error.data = errResData;
                throw error;
            });
        } else if (url === "/placeOrder") {
            alert("Congratulations! Order placed!")
            window.location.href = "/personalPage";
        } else if (url === '/emptyCart') {
            alert("Cart clear!")
            window.location.href = "/personalPage";
        }
        return response.json();
    });
}

const cart_table = document.getElementById('cart-content');
const order_table = document.getElementById('orders-content');
const empty_cart = document.getElementById('emptyCart');
const order_detail = document.getElementById('order_detail');

empty_cart.addEventListener('click', e => {
    e.preventDefault();
    emptyCart();
});

function showCart() {
    const url = '/showCart?user_name=' + user_name;
    sendHttpRequest('GET', url).then(responseData => {
        let content = "<tr><td>Item</td><td>Size</td><td>Retail &nbsp price</td><td>Quantity</td><td>Remove</td></tr>";
        let total_price = 0.0;
        for (let i = 0; i < responseData.length; i++) {
            content += "<tr>";
            let item = responseData[i]['product_name'];
            itemsInCart['product_name'].push(item);
            content = content + "<td>" + item + "</td>";
            let size = responseData[i]['size'];
            itemsInCart['product_size'].push(size);
            content = content + "<td>" + size + "</td>";
            let price = responseData[i]['price'];
            itemsInCart['retail_price'].push(price);
            content = content + "<td>" + price + "</td>";
            let quantity = responseData[i]['number'];
            itemsInCart['product_quantity'].push(quantity);
            itemsInCart['SKU'].push(responseData[i]['SKU']);
            content = content + "<td>" + quantity + "</td>";
            total_price = total_price + parseFloat(quantity) * parseFloat(price);
            content = content + "<td id='r" + i + "'></td>"
            content += "</tr>";
        }
        itemsInCart['total_price'] = total_price;
        content = content + "<tr><td>Total:</td><td colspan='3'> $" + total_price + "</td></tr>"
        cart_table.innerHTML = content;
        // console.log("response for db:",responseData);
    }).catch(err => {
        console.log(err, err.data);
    });
}

const emptyCart = () => {
    sendHttpRequest('POST', '/emptyCart', {
        'user_name': user_name
    }).then(responseData => {
        console.log(responseData);
    }).catch(err => {
        console.log(err, err.data);
    });
}

function showOrders() {
    const orders_url = '/showOrders?user_name=' + user_name;
    sendHttpRequest('GET', orders_url).then(responseData => {
        let content = "<tr><td>Order number</td><td>Customer</td><td>Order date</td><td>Amount</td></tr>";
        for (let i = 0; i < responseData.length; i++) {
            let order_number = responseData[i]['order_id'];
            content = content + "<tr><td><a class='order_id'>" + order_number + "</a></td>";
            content = content + "<td>" + user_name + "</td>";
            let order_date = responseData[i]['order_time'];
            content = content + "<td>" + order_date + "</td>";
            let order_amount = responseData[i]['total_price'];
            content = content + "<td>" + order_amount + "</td></tr>";
        }
        order_table.innerHTML = content;
    }).catch(err => {
        console.log(err, err.data);
    });
}

function placeOrder() {
    sendHttpRequest('POST', '/placeOrder', itemsInCart).then(responseData => {
        console.log(responseData);
    }).catch(err => {
        console.log(err, err.data);
    });
}

setTimeout(detail, 1000)

function detail() {
    const order_ids = document.getElementsByClassName("order_id");
    for (let i = 0; i < order_ids.length; i++) {
        order_ids[i].addEventListener('click', e => {
            e.preventDefault();
            let id = order_ids[i].innerHTML;
            showOrderDetail(id);
        });
    }
}



function showOrderDetail(id) {
    const order_detail_url = '/orderDetail?order_id=' + id;
    console.log(order_detail_url);
    sendHttpRequest('GET', order_detail_url).then(responseData => {
        let content = "<tr><td>Order number</td><td>Product Name</td><td>Size</td><td>Retail price</td><td>Quantity</td><td>Date</td></tr>";
        for (let i = 0; i < responseData.length; i++) {
            let order_number = responseData[i]['order_id'];
            content = content + "<tr><td>" + order_number + "</td>";
            let product_name = responseData[i]['product_name'];
            content = content + "<td>" + product_name + "</td>";
            let product_size = responseData[i]['product_size'];
            content = content + "<td>" + product_size + "</td>";
            let price = responseData[i]['retail_price'];
            content = content + "<td>" + price + "</td>";
            let quantity = responseData[i]['product_quantity'];
            content = content + "<td>" + quantity + "</td>";
            let order_date = responseData[i]['order_time'];
            content = content + "<td>" + order_date + "</td></tr>";
        }
        content = content + "<tr><td>Total:</td><td colspan='5'> $" + responseData[0]['total_price'] + "</td></tr>";
        order_detail.innerHTML = content;
    }).catch(err => {
        console.log(err, err.data);
    });

}

    // const product_name = document.getElementById("product_name").innerHTML;
    // const SKU = document.getElementById("SKU").innerHTML;
    // const product_size = document.getElementById('size').innerHTML;
    // const price = document.getElementById('price').innerHTML;
    // const data = {
    //     'user_name': user_info,
    //     'product_name': product_name,
    //     'SKU': SKU,
    //     'size': product_size,
    //     'price': price
    // }