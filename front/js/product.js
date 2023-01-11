/** Get the item from the API if it matches the ID passed into the query string,
 *  then insert relevant product details into the premade div's.
 *  Set the value to 1 for the item quantity selector. */
const buildProductElement = async (productId,productColorSelectorElement) => {
    const product = await fetchProduct(productId);
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
    };
    const itemQuantityElement = document.getElementById("quantity");
    itemQuantityElement.value = 1;
};

 /** When you click "Add to cart", create an array of the product id,selected color value and quantity.
 *  In case the id - selected color pair already exists in the array, update only the quantity.
 *  If no color were selected, or try to add "0", or over a "100" articels to the cart an error message pops up on the screen */
function addProductToCart(productId, cartItems,productColorSelectorElement) {
    const addToCartButton = document.getElementById("addToCart");
    addToCartButton.addEventListener("click", function() {
        let itemQuantity = +(document.getElementById("quantity").value);
        const selectedColorValue = productColorSelectorElement.value;
        if (selectedColorValue === "") return alert("Product color has not been selected, please pick a color");
        if (itemQuantity === 0) return alert('Cannot add 0 articles to the cart, please select a valid value');
        if (itemQuantity > 100) return alert('Cannot add more than a 100 articles to the cart, please select a valid value');
        if (cartItems.length === 0) {
            cartItems.push([productId, selectedColorValue, itemQuantity]);
        } else {
            for (let i = 0; i < cartItems.length; i++) {
                const cartItem = cartItems[i];
                if (productId === cartItem[0] && cartItem.includes(selectedColorValue)) {
                    cartItem[2] += itemQuantity;
                    itemQuantity = cartItem[2];
                    cartItem.pop();
                    cartItem.push(itemQuantity);
                    break;
                } else if(i === cartItems.length - 1) {
                    cartItems.push([productId, selectedColorValue, itemQuantity]);
                    break;
                };
            };
        };
        setItemsToLocalStorage(cartItems);
    });
};

/** Main is an asynchronous function that calls the "buildProductElement" function to display the product selected on the home page,
 *  and another that adds the selected product to the cart. */
  const main = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get("id");
    // const productId = new URLSearchParams(window.location.search).get("id");
    const cartItems = getCartItemsFromLocalStorage();
    const productColorSelectorElement = document.getElementById("colors");
    buildProductElement(productId, productColorSelectorElement);
    addProductToCart(productId, cartItems, productColorSelectorElement);
  };
  main();