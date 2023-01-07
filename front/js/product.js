let color = "";
const productColorSelectorElement = document.getElementById("colors");
const listOfCartItems = getCartItemsFromLocalStorage();
console.log(listOfCartItems);

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

function addProductToCart(productId) {
    const addToCartButton = document.getElementById("addToCart");
    addToCartButton.addEventListener("click", function() {
        // console.log(localStorage);
        // console.log(itemQuantit);
        const listOfCartItems = getCartItemsFromLocalStorage();
        // getItemsFromLocalStorage();
        console.log(listOfCartItems);
        let itemQuantity = document.getElementById("quantity").value;
        itemQuantity = +itemQuantity;
        const selectedColorValue = productColorSelectorElement.value;
        if (selectedColorValue === "") {
            alert("Product color has not been selected, please pick a color");
            return;   
        }
        if (listOfCartItems.length === 0) {
            listOfCartItems.push([productId, productColorSelectorElement.value, itemQuantity]);
        } else {
            // if color already exist 
            // change/add to the quantity

            // console.log(listOfCartItems.find(findColor));
            // function findColor(item) {
            //     return item[0] === productColorSelectorElement.value;
            // };

            // Change this to a .find()
            for (let i = 0; i < listOfCartItems.length; i++) {
                const cartItem = listOfCartItems[i];
                if (cartItem.includes(productColorSelectorElement.value)) {
                    cartItem[2] += itemQuantity;
                    itemQuantity = cartItem[2];
                    cartItem.pop();
                    cartItem.push(itemQuantity);
                    break;
                } else if(i === listOfCartItems.length - 1) {
                    listOfCartItems.push([productId, productColorSelectorElement.value, itemQuantity]);
                    break;
                }
            }
        }
        setItemsToLocalStorage(listOfCartItems);
        console.log("Local storage after: ",localStorage);
    })
}

  const main = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get("id");
    // const productId = new URLSearchParams(window.location.search).get("id");
    buildProductEl(productId);
    addProductToCart(productId);
  };
  main();