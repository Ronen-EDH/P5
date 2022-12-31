// Make code better:
// - Replace the `for (...) if (...)` loops with `Array.find`
// - Create helpers functions to manipulate:
//  - the cart items in local storage
//    - read
//    - write
//  - the products from the server
//    - read
//    - submit items to the server
// - Then for cart.js, create a function for insertProductForQuantityChange insertProductForDelete
// - Do only one fetchProducts() call in script.js and pass the products to the other functions
// like so:
// window.onload = function () {
//     fetchProducts().then((listOfProducts) => {
//       insertProductsFromLocalStorage(listOfProducts);
//       eqefewfewdqewdqwfDoThings(listOfProducts);
//     });
//   };
// - Don't use global variables if they don't need to be global
// - Try to put your variables as close as possible to where you use them
// - But again, if you can't because you use it on multiple places, then it's ok to put it at the top
// - Use more list of objects instead of list of lists

// This function is used to fetch the products from the server as JSON
function fetchProducts() {
    return fetch("http://localhost:3000/api/products")
      .then((x) => x.json())
      .catch((error) => {
        alert("Error! Check if server is up and running");
        console.log("Error! Check if server is up and running");
        console.error(error);
      });
  }
  
  // This function is used to read the cart items from local storage as JSON
  function getItemsFromLocalStorage() {
    const cartItemsInLocalStorage = localStorage.getItem("cart-items");
    const listOfCartItems = JSON.parse(cartItemsInLocalStorage) ?? [];
    return listOfCartItems;
  }
  
  // This function is used to write the cart items to local storage
  function setItemsToLocalStorage(listOfCartItems) {
    localStorage.setItem("cart-items", JSON.stringify(listOfCartItems));
  }