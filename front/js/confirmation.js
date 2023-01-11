/** Getting the order id from the query string and displaying it on the page. */
const orderid = new URLSearchParams(window.location.search).get("orderid");
const orderIdElement = document.getElementById("orderId");
orderIdElement.textContent = orderid;