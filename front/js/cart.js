function buildCart(listOfProducts, listOfCartItems) {
    const totalPriceEl = document.getElementById("totalPrice");
    const totalQuantityEl = document.getElementById("totalQuantity");
    totalPriceEl.textContent = 0;
    totalQuantityEl.textContent = 0;
    let totalPrice = 0;
    let totalQuantity = 0;
    // console.log(cartItemsLocalStorage);

    for (let i = 0; i < listOfCartItems.length; i++ ) {
        let cartItem = listOfCartItems[i];
        const product = listOfProducts.find((x) => x._id === cartItem[0]);
        // console.log("Item in shopping cart: ",product )
        const articleElement = document.createElement("article");
        articleElement.setAttribute("class","cart__item");
        articleElement.setAttribute("data-id",cartItem[0]);
        articleElement.setAttribute("data-color",cartItem[1]);
        articleElement.innerHTML= 
            `
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${cartItem[1]}</p>
                    <p>€${product.price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Quantity : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem[2]}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Delete</p>
                    </div>
                </div>
            </div>
            `
        const cartItemsSection = document.getElementById("cart__items");
        cartItemsSection.appendChild(articleElement);

        const itemQuantityElement = articleElement.getElementsByClassName("itemQuantity")[0];
        itemQuantityElement.addEventListener("change", () => {
            console.log("Quantity has been changed on: ", articleElement);
            console.log("itemQuantityElement:",itemQuantityElement);
            const itemQuantity = itemQuantityElement.value;
            // console.log("Quantity:",itemQuantity);
            // Why the before have the same value as the after, even though the change hasn't happend chronologically I don't understand...
            // console.log("cartItemsLocalStorage before change:",cartItemsLocalStorage);
            // console.log(cartItemLocalStorage[0]);
            // console.log(product.price);
            // console.log(cartItemLocalStorage[2]);
            
            updateCartItemInLocalStorage();
            // let itemTotalValueBefore = (product.price * cartItemLocalStorage[2]);
            // total -= itemTotalValueBefore;
            // totalQuantity -= cartItemLocalStorage[2];
            cartItem.pop();
            cartItem.push(+itemQuantity);
            totalPrice += product.price * itemQuantity;
            // totalPriceEl.textContent = total;
            totalQuantity += +itemQuantity;
            updateCartArticleAndPriceCounter();
            // totalQuantityEl.textContent = totalQuantity;
            console.log("cartItemsLocalStorage after change:",listOfCartItems);
            setItemsToLocalStorage(listOfCartItems);
        });
        
        const deleteItemElement = articleElement.getElementsByClassName("deleteItem")[0];
        // console.log(deleteItemElement);
        deleteItemElement.addEventListener("click", () => {
            console.log("Quantity has been changed on: ", articleElement);
            console.log("deleteItemElement:",deleteItemElement);
            // const itemToDelete = deleteItemElement.closest("article");
            // console.log(itemToDelete);
            articleElement.remove();
            updateCartItemInLocalStorage();
            updateCartArticleAndPriceCounter();
            // let itemTotalValueBefore = (product.price * cartItemLocalStorage[2]);
            // total -= itemTotalValueBefore;
            // totalPriceEl.textContent = total;
            // totalQuantity -= cartItemLocalStorage[2];
            // totalQuantityEl.textContent = totalQuantity;
            const index = listOfCartItems.indexOf(cartItem);
            if (index > -1) { 
                listOfCartItems.splice(index, 1);
                console.log(listOfCartItems);
                setItemsToLocalStorage(listOfCartItems);
                console.log("Local storage: ",localStorage);
            }
        });
        
        totalPrice += product.price * cartItem[2];
        totalQuantity += +cartItem[2];
        totalPriceEl.textContent = totalPrice;
        totalQuantityEl.textContent = totalQuantity;

        function updateCartItemInLocalStorage() {
            let itemsTotalValueBefore = (product.price * cartItem[2]);
            totalPrice -= itemsTotalValueBefore;
            totalQuantity -= cartItem[2];
          }

        function updateCartArticleAndPriceCounter() {
            totalPriceEl.textContent = totalPrice;
            totalQuantityEl.textContent = totalQuantity;
        }
    }
}

const inputs = [
    {
      name: "firstName",
      el: document.getElementById("firstName"),
      errorMsgEl: document.getElementById("firstNameErrorMsg"),
      regex: /^[a-z,.'-]{2,}$/i,
      errorMsg: "You have entered an invalid name format!",
      validation: false
    },
    {
      name: "lastName",
      el: document.getElementById("lastName"),
      errorMsgEl: document.getElementById("lastNameErrorMsg"),
      regex: /^[a-z,.'-]{2,}$/i,
      errorMsg: "You have entered an invalid name format!",
      validation: false
    },
    {
      name: "address",
      el: document.getElementById("address"),
      errorMsgEl: document.getElementById("addressErrorMsg"),
      regex: /^([1-9]|\d{1,5}\/?\w{1,3}?|\d+\-\d+)[a-zA-Z]?\s(([a-zA-Z]+\-?[a-zA-Z]+|[a-zA-Z]+\'?[a-zA-Z]+?|[a-zA-Z]+\,|\&|[a-zA-Z]+\.)\s){1,}(([a-zA-Z]+\-?[a-zA-Z]+?)|([a-zA-Z]+\.))$/,
      errorMsg: "You have entered an invalid address format!",
      validation: false
    },
    {
      name: "city",
      el: document.getElementById("city"),
      errorMsgEl: document.getElementById("cityErrorMsg"),
      regex: /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
      errorMsg: "You have entered an invalid city format!",
      validation: false
    },
    {
      name: "email",
      el: document.getElementById("email"),
      errorMsgEl: document.getElementById("emailErrorMsg"),
      regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      errorMsg: "You have entered an invalid email format!",
      validation: false
    },
  ];
  
    for (const input of inputs)
    input.el.addEventListener("input", () => {
      if (input.regex.test(input.el.value)) {
        input.errorMsgEl.textContent = "";
        input.validation = true;
      } else if (input.el.value === "" ) {
        input.errorMsgEl.textContent = "This is required";
        input.validation = false;
      } else {
        input.errorMsgEl.textContent = input.errorMsg;
        input.validation = false;
      }
    });

function validationCheck(listOfCartItems) {
    let formIsValid = true;
    for (const input of inputs)
    if (input.el.value === "") {
        input.errorMsgEl.textContent = "This is required";
        formIsValid = false;
    } else if (!input.validation) {
        console.log("The",input.name,"is",input.validation);
        formIsValid = false;
        break
    }
    if (formIsValid === true) {
    console.log("Success");
    sendUserContactDetails(listOfCartItems);
    }   
}

function sendUserContactDetails(listOfCartItems) {
    const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      };
    const order = {};
    order.contact = contact;
    order.products = [];
    for (let i = 0; i < listOfCartItems.length; i++) {
        const cartItem = listOfCartItems[i];
        console.log(cartItem[0]);
        order.products.push(cartItem[0]); 
    }
    console.log(order);
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
        }
    
    fetch("http://localhost:3000/api/products/order", options)
        .then(res => res.json())
        // I still don't get this part, response is res?
        .then(response => location.href = `./confirmation.html?orderid=${response.orderId}`)
        // localStorage.clear();
        .catch((err) => console.log("Error: ", err));
}

function placeAnOrder(listOfCartItems) {
    const orderButtonElement = document.getElementById("order");
    orderButtonElement.addEventListener("click", function(){ 
        if (totalQuantity === 0) {
            alert("There are no items in the cart, please go to the homepage to select your product first");
            return;
        }
        validationCheck(listOfCartItems);
    })
}

const main = async () => {
    const listOfProducts = await fetchProducts();
    const listOfCartItems = getCartItemsFromLocalStorage();
    buildCart(listOfProducts, listOfCartItems);
    placeAnOrder(listOfCartItems);
  };
  main();