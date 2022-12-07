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
let listOfCartItems = [];

addToCartButton.addEventListener("click", function() {
    // console.log("I have been clicked");
    const itemQuantity = document.getElementById("quantity").value;
    // let listOfCartItems = [[id, productColor.value, itemQuantity]];
    if (listOfCartItems.length === 0) {
        console.log("Empty list");
        listOfCartItems.push([id, productColor.value, itemQuantity]);
    } else {
        for (let n = 0; n < listOfCartItems.length; n++) {
            console.log(listOfCartItems[n]);
            const listOfCartItem = listOfCartItems[n];
            if (listOfCartItem.includes(id) && listOfCartItem.includes(productColor.value)) {
                console.log("It includes"); 
                // Add together only the quantity of those list items
            } else {
                console.log("Items: ",listOfCartItems);
                console.log("Item: ",listOfCartItem);    
                listOfCartItems.push([id, productColor.value, itemQuantity]);

            }
        }
    }
            
    console.log(listOfCartItems);
    // localStorage.clear();
    listOfCartItems = JSON.stringify(listOfCartItems);
    localStorage.setItem("cart-items", listOfCartItems);
    console.log("Local storage: ",localStorage);
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