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

addToCartButton.addEventListener("click", function() {
    console.log("I have been clicked");
    const itemQuantity = document.getElementById("quantity").value;
    // let listOfCartItems = [[id, productColor.value, itemQuantity]];
    let listOfCartItems = [];
//    Have to change this bit to check in nested arrays: https://stackoverflow.com/questions/71497427/check-if-value-exists-in-nested-array
    if (listOfCartItems.includes(id) && listOfCartItems.includes(productColor.value)) {
        console.log("It includes"); 
        // Add together only the quantity of those list items
    } else {
        // listOfCartItems.push([id, productColor.value, itemQuantity])
        listOfCartItems.push(id, productColor.value, itemQuantity)
        console.log(listOfCartItems);  
    }
    localStorage.clear();
    listOfCartItems = JSON.stringify(listOfCartItems);
    localStorage.setItem("cart-items", listOfCartItems);
    console.log("Local storage: ",localStorage);
})

