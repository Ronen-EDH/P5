// console.log("Greetings");
const queryString = window.location.search;

// console.log(queryString);

const urlParams = new URLSearchParams(queryString);
const orderid = urlParams.get("orderid");

console.log(orderid);

const orderIdElement = document.getElementById("orderId");

orderIdElement.textContent = orderid;