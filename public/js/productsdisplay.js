var table = document.getElementById('productsTable');
var cells = table.getElementsByTagName("td");
var path = window.location.href + "";
path = path.substr(0, path.indexOf("showProducts"))

for(let cell of cells){
  cell.addEventListener('click',() => {
    let contents = cell.innerHTML + "";
    console.log(contents);
    let length = contents.indexOf('<br>');
    let id = contents.substr(0, length);
    const url = path + "productdetail?product_id=" + id;
    console.log(url);
    window.location.href = url;
  });
}


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