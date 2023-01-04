const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

let color = "";
const productColorSelectorElement = document.getElementById("colors");

// Loop through all the items of the API product table.
// If the ID of a product from the API maches the ID placed/found in the Query String
// insert relevant item details into the premade div's
const buildProductEl = async (productId) => {
    const product = await fetchProduct(productId);
    console.log(product);
    const productImgElement = document.querySelector(".item__img");
    const productIdElement = document.getElementById("title");
    const productPriceElement = document.getElementById("price");
    const productDescriptionElement = document.getElementById("description");
    
    productImgElement.innerHTML = `<img src=${product.imageUrl}>`;
    productIdElement.innerHTML = product.name;
    productPriceElement.innerHTML = product.price;
    productDescriptionElement.innerHTML = product.description;
    for (color of product.colors) {
        productColorSelectorElement.innerHTML += `<option value="${color}">${color}</option>`;
    }
}

const itemQuantityElement = document.getElementById("quantity");
itemQuantityElement.value = 1;
const addToCartButton = document.getElementById("addToCart");

// function getItemsFromLocalStorage() {
//     const cartItemsInLocalStorage = localStorage.getItem("cart-items")
//     const listOfCartItems = JSON.parse(cartItemsInLocalStorage)??[];
// }

addToCartButton.addEventListener("click", function() {
    const cartItemsInLocalStorage = localStorage.getItem("cart-items")
    const listOfCartItems = JSON.parse(cartItemsInLocalStorage)??[];
    // getItemsFromLocalStorage();
    console.log(listOfCartItems);
    let itemQuantity = document.getElementById("quantity").value;
    itemQuantity = +itemQuantity
    const selectedColorValue = productColorSelectorElement.value;
    if (selectedColorValue === "") {
        alert("Product color has not been selected, please pick a color");
        return;   
    }
    if (listOfCartItems.length === 0) {
        listOfCartItems.push([id, productColorSelectorElement.value, itemQuantity]);
    } else {
        for (let i = 0; i < listOfCartItems.length; i++) {
            const listOfCartItem = listOfCartItems[i];
            if (listOfCartItem.includes(productColorSelectorElement.value)) {
                listOfCartItem[2] += itemQuantity;
                itemQuantity = listOfCartItem[2];
                listOfCartItem.pop();
                listOfCartItem.push(itemQuantity);
                break;
            } else if(i === listOfCartItems.length - 1) {
                listOfCartItems.push([id, productColorSelectorElement.value, itemQuantity]);
                break;
            }
        }
    }
     
    localStorage.setItem("cart-items", JSON.stringify(listOfCartItems));
    console.log("Local storage: ",localStorage);
})

// function addEventListener(productId) {
//     const addToCartButton = document.getElementById("addToCart");
//     addToCartButton.addEventListener("click", function() {
//         const cartItemsInLocalStorage = localStorage.getItem("cart-items")
//         const listOfCartItems = JSON.parse(cartItemsInLocalStorage)??[];
//         // getItemsFromLocalStorage();
//         console.log(listOfCartItems);
//         let itemQuantity = document.getElementById("quantity").value;
//         itemQuantity = +itemQuantity
//         const selectedColorValue = productColorSelectorElement.value;
//         if (selectedColorValue === "") {
//             alert("Product color has not been selected, please pick a color");
//             return;   
//         }
//         if (listOfCartItems.length === 0) {
//             listOfCartItems.push([productId, productColorSelectorElement.value, itemQuantity]);
//         } else {
//             for (let i = 0; i < listOfCartItems.length; i++) {
//                 const listOfCartItem = listOfCartItems[i];
//                 if (listOfCartItem.includes(productColorSelectorElement.value)) {
//                     listOfCartItem[2] += itemQuantity;
//                     itemQuantity = listOfCartItem[2];
//                     listOfCartItem.pop();
//                     listOfCartItem.push(itemQuantity);
//                     break;
//                 } else if(i === listOfCartItems.length - 1) {
//                     listOfCartItems.push([productId, productColorSelectorElement.value, itemQuantity]);
//                     break;
//                 }
//             }
//         }
//         setItemsToLocalStorage();
//         console.log("Local storage: ",localStorage);
//     })
// }

  const main = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get("id");
    // const productId = new URLSearchParams(window.location.search).get("id");
    buildProductEl(productId);
    // addEventListener(productId);
  };
  main();