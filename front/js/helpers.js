/** This function is getting the products from the server,
 *  converting that data with json()method for JavaScript to read, then returning that data when called. */
function fetchProducts() {
    return fetch("http://localhost:3000/api/products")
      .then((data) => data.json())
      .catch((error) => {
        alert("Error! Check if server is up and running");
        console.log("Error! Check if server is up and running");
        console.error(error);
      });
  }

/** This function is getting the product whose id has been passed as a parameter from the server,
 *  converting it with json()method for JavaScript to read, then returning that data when called. */
const fetchProduct = (productId) =>
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((data) => data.json())
  .catch((error) => {
    alert("Error! Check if server is up and running");
    console.log("Error! Check if server is up and running");
    console.error(error);
  });

/** This function is used to read the cart items from local storage as JSON, 
 * then convert that data to Javascript to understand and if local storage is empty, return an empty array instead. */
const getCartItemsFromLocalStorage = () => JSON.parse(localStorage.getItem("cart-items")) ?? [];

/** This function is used to place/store the cart items into the local storage */
function setItemsToLocalStorage(listOfCartItems) {
  localStorage.setItem("cart-items", JSON.stringify(listOfCartItems));
}
