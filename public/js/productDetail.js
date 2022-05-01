
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

const user_info = document.cookie.split(";")[1].split("=")[1];

var login = document.getElementById("login-part");
if (user_info.length > 0) {
    login.innerHTML = "Welcome, <a href='/personalPage'>" + user_info + "</a>";
}




function sendHttpRequest(method, url, data) {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: data ? { 'Content-Type': 'application/json' } : {}
    }).then(response => {
        if (response.status >= 400) {
            alert("Not in stock!")
            return response.json().then(errResData => {
                const error = new Error('something went wrong!');
                error.data = errResData;
                throw error;
            });
        } else {
            alert('success');
            window.location.href = "/";
        }
        return response.json();
    });
}

function addToCart() {
    const product_name = document.getElementById("product_name").innerHTML;
    const SKU = document.getElementById("SKU").innerHTML;
    const product_size = document.getElementById('size').innerHTML;
    const price = document.getElementById('price').innerHTML;
    const data = {
        'user_name': user_info,
        'product_name': product_name,
        'SKU': SKU,
        'size': product_size,
        'price': price
    }
    sendHttpRequest('POST', '/addToCart', data).then(responseData => {
        console.log(responseData);
    }).catch(err => {
        console.log(err, err.data);
    });
}

setTimeout(1000);

document.getElementById('add2cart').addEventListener('click',(e) => {
    e.preventDefault();
    addToCart()
});