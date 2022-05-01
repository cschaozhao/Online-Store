
const path = window.location.href;



var nike = document.getElementById('nike').addEventListener("click", () => {
  const url = path + "showProducts?product_name=nike";
  window.location.href = url;
});

var converse = document.getElementById('converse').addEventListener("click", () => {
  const url = path + "showProducts?product_name=converse";
  window.location.href = url;
});

var adidas = document.getElementById('adidas').addEventListener("click", () => {
  const url = path + "showProducts?product_name=adidas";
  window.location.href = url;
});

var brooks = document.getElementById('brooks').addEventListener("click", () => {
  const url = path + "showProducts?product_name=brooks";
  window.location.href = url;
});

var ua = document.getElementById('ua').addEventListener("click", () => {
  const url = path + "showProducts?product_name=ua";
  window.location.href = url;
});

var nb = document.getElementById('nb').addEventListener("click", () => {
  const url = path + "showProducts?product_name=newbalance";
  window.location.href = url;
});

var aj = document.getElementById('aj').addEventListener("click", () => {
  const url = path + "showProducts?product_name=jordan";
  window.location.href = url;
});

var puma = document.getElementById('puma').addEventListener("click", () => {
  const url = path + "showProducts?product_name=puma";
  window.location.href = url;
});

var asics = document.getElementById('asics').addEventListener("click", () => {
  const url = path + "showProducts?product_name=asics";
  window.location.href = url;
});

var timberland = document.getElementById('timberland').addEventListener("click", () => {
  const url = path + "showProducts?product_name=timberland";
  window.location.href = url;
});

var perfadi = document.getElementById('performance').addEventListener("click", () => {
  const url = path + "showProducts?product_name=adidas";
  window.location.href = url;
});

var vans = document.getElementById('vans').addEventListener("click", () => {
  const url = path + "showProducts?product_name=vans";
  window.location.href = url;
});

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
if(user_info.length > 0){
  login.innerHTML = "Welcome, <a href='/personalPage'>"+user_info+"</a>";
}