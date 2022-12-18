// Get data from API, convert it with json()method for js to read, when that's done run "insertProduct" function with the converted data
fetch("http://localhost:3000/api/products")
.then(data => {
return data.json();
})
.then(listOfProducts => {
insertProduct(listOfProducts);
});


const queryString = window.location.search;

// console.log(queryString);

const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

// console.log(id);
let color = "";
const productColor = document.getElementById("colors");

/* Loop through all the items of the API product table.
If the ID of a product from the API maches the ID placed/found in the Query String
use that item details like: title,price,description from the API and insert it to the premade div's in the HTML.*/
function insertProduct(listOfProducts) {
    for (let i = 0; i < listOfProducts.length; i++) {
        const product = listOfProducts[i];
        // console.log(product._id);
        if (product._id === id) {
            const productImg = document.querySelector(".item__img");
            const productId = document.getElementById("title");
            const productPrice = document.getElementById("price");
            const productDescription = document.getElementById("description");
            // const productColor = document.getElementById("colors");
            
            productImg.innerHTML = `<img src=${product.imageUrl}>`;
            productId.innerHTML = product.name;
            productPrice.innerHTML = product.price;
            productDescription.innerHTML = product.description;
            for (color of product.colors) {
                // console.log(color);
                productColor.innerHTML += `<option value="${color}">${color}</option>`;
            }
            break;
        }
    }
}

const addToCartButton = document.getElementById("addToCart");
// let listOfCartItems = [];
// localStorage.clear();

addToCartButton.addEventListener("click", function() {
    let cartItemsInLocalStorage = localStorage.getItem("cart-items")
    // console.log(cartItemsInLocalStorage);
    let listOfCartItems = JSON.parse(cartItemsInLocalStorage)??[];
    console.log(listOfCartItems);
    // console.log("I have been clicked");
    let itemQuantity = document.getElementById("quantity").value;
    itemQuantity = +itemQuantity
    // console.log(typeof itemQuantity);
    // let listOfCartItems = [[id, productColor.value, itemQuantity]];
    if (listOfCartItems.length === 0) {
        // console.log("Empty list");
        // console.log("round: 0")
        listOfCartItems.push([id, productColor.value, itemQuantity]);
        // This one will not work if there is absolutley anything in local storage :D 
    } else {
        for (let n = 0; n < listOfCartItems.length; n++) {
            console.log("round:", n + 1)
            // console.log("Current Item: ",listOfCartItems[n]);
            // console.log("Current color: ",productColor.value)
            const listOfCartItem = listOfCartItems[n];
            if (listOfCartItem.includes(productColor.value)) {
            // (listOfCartItem.includes(id) && listOfCartItem.includes(productColor.value))  
                console.log("It includes");
                listOfCartItem[2] += itemQuantity;
                itemQuantity = listOfCartItem[2];
                listOfCartItem.pop();
                listOfCartItem.push(itemQuantity);
                console.log("Current item: ", listOfCartItem);
                // Add together only the quantity of those list items
                break;
            } else if(n === listOfCartItems.length - 1) {
                // console.log("Items: ",listOfCartItems);
                // console.log("Item: ",listOfCartItem);    
                listOfCartItems.push([id, productColor.value, itemQuantity]);
                break;
            }
        }
    }
    let numberOfProductSets = 0;        
    console.log(listOfCartItems);
    if (Object.keys(localStorage).length === 0) {
        console.log("Local storage is empty");
        localStorage.setItem("cart-items", JSON.stringify(listOfCartItems));
    
    } else {
        console.log(("Local storage is not empty: "), localStorage);
    }
    // localStorage.clear();
    // listOfCartItems = JSON.stringify(listOfCartItems);
    // localStorage.setItem("cart-items", listOfCartItems);
    localStorage.setItem("cart-items", JSON.stringify(listOfCartItems));
    console.log("Local storage: ",localStorage);

    // let cartItemsInLocalStorage = "cart-items";
    // if (cartItemsInLocalStorage)
})



// const users = [["Bob","carpenter",23],["Jack","cook",33],["Grace","teacher",52]];

// for (let i = 0; i < users.length; i++) {
//     console.log(users[i]);
//     const user = users[i];
//     if (user.includes("Grace") && user.includes("teacher")) {
//         console.log("It includes");
//         let lastItemOfList = user[2];
//         user.pop();
//         user.push(lastItemOfList + 1);
//         console.log(user);
//     }
// }

// Clicking the button first it should create the first item(as a list, with the id,color and quantity).
// Next round it should check if the id and color match than stop 
