// Get data from API, convert it with json()method for js to read, when that's done run "insertProduct" function with the converted data
fetch("http://localhost:3000/api/products")
.then(data => {
return data.json();
})
.then(listOfProducts => {
insertProducts(listOfProducts);
})
.catch(error => {
alert("Error! Check if server is up and running");
console.log("Error! Check if server is up and running");
console.error(error);
});


const queryString = window.location.search;

// console.log(queryString);

const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

// console.log(id);
let color = "";
const productColorSelectorElement = document.getElementById("colors");

/* Loop through all the items of the API product table.
If the ID of a product from the API maches the ID placed/found in the Query String
insert relevant item details into the premade div's */
function insertProducts(listOfProducts) {
    for (let i = 0; i < listOfProducts.length; i++) {
        const product = listOfProducts[i];
        // console.log(product._id);
        if (product._id === id) {
            const productImgElement = document.querySelector(".item__img");
            const productIdElement = document.getElementById("title");
            const productPriceElement = document.getElementById("price");
            const productDescriptionElement = document.getElementById("description");
            // const productColor = document.getElementById("colors");
            
            productImgElement.innerHTML = `<img src=${product.imageUrl}>`;
            productIdElement.innerHTML = product.name;
            productPriceElement.innerHTML = product.price;
            productDescriptionElement.innerHTML = product.description;
            for (color of product.colors) {
                // console.log(color);
                productColorSelectorElement.innerHTML += `<option value="${color}">${color}</option>`;
            }
            break;
        }
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