/** Loop through the local storage to get all the products that have been selected by the user, and display them in the cart
 *  calculate the sum of the quantity and price of the articles in the "Total" section. */
function buildCart(products, cartItems) {
    const totalPriceEl = document.getElementById("totalPrice");
    const totalQuantityEl = document.getElementById("totalQuantity");
    totalPriceEl.textContent = 0;
    totalQuantityEl.textContent = 0;
    let totalPrice = 0;
    let totalQuantity = 0;

    for (let i = 0; i < cartItems.length; i++ ) {
        let cartItem = cartItems[i];
        let product = products.find((x) => x._id === cartItem[0]);
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
            `;
        const cartItemsSection = document.getElementById("cart__items");
        cartItemsSection.appendChild(articleElement);

        function countTotalPriceAndArticles(quantity) {
            totalPrice += product.price * quantity;
            totalQuantity += quantity;
        };

        /** This function replaces the old quantity with the new or removes the article entirely for the "quantity change" and "delete" eventlisteners,
         *  and updates the "Total" section. */
        function updateCart(quantity) {
            if (quantity > 0) {
                cartItem.pop();
                cartItem.push(quantity);
            } else { 
                articleElement.remove();
                const index = cartItems.indexOf(cartItem);
                if (index > -1) { 
                    cartItems.splice(index, 1);
                };
            };
            // setItemsToLocalStorage(cartItems);
            totalPrice = 0;
            totalQuantity = 0;
            for (let i = 0; i < cartItems.length; i++ ) {
                let cartItem = cartItems[i];
                product = products.find((x) => x._id === cartItem[0]);
                countTotalPriceAndArticles(cartItem[2]);
            };
            totalPriceEl.textContent = totalPrice;
            totalQuantityEl.textContent = totalQuantity;
        };

        /** This eventlistener updates the cart and local storage when changes occur with regards to the quantity. */
        const itemQuantityElement = articleElement.getElementsByClassName("itemQuantity")[0];
        itemQuantityElement.addEventListener("change", () => {
            let itemQuantity = itemQuantityElement.value;
            itemQuantity = +itemQuantity;
            updateCart(itemQuantity);
            setItemsToLocalStorage(cartItems);
        });
        
        /** This eventlistener updates the cart and local storage when the user clicks on the delete button. */
        const deleteItemElement = articleElement.getElementsByClassName("deleteItem")[0];
        deleteItemElement.addEventListener("click", () => {
            updateCart(0);
            setItemsToLocalStorage(cartItems);    
        });
        
        countTotalPriceAndArticles(cartItem[2]);
    };

    totalPriceEl.textContent = totalPrice;
    totalQuantityEl.textContent = totalQuantity;
 
};

/** This function has all the parts for placing an order, like:
 *  checking all user input separately from user input, as well as all together when "order" is clicked, 
 *  sending the contact and product details, then receiving the order id which will be displayed on the contact page, 
 *  and finally resetting the cart. */
function placeAnOrder(cartItems) {
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
          regex: /^([a-zA-Z\u0080-\u024F]{2,}(?:. |-| |'))*[a-zA-Z\u0080-\u024F]{2,}$/,
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

      /** This eventlistener checks if the input is correct(matches the appropriate regular expression) on user input. */
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
        };
      });
  
    /** This function checks if all user input is correct(matches the appropriate regular expression) 
     *  and called upon clicking the "order button". */
    function validationCheck() {
        let formIsValid = true;
        for (const input of inputs)
        if (input.el.value === "") {
            input.errorMsgEl.textContent = "This is required";
            formIsValid = false;
        } else if (!input.validation) {
            formIsValid = false;
        }
        if (formIsValid === true) {
        return true;
        };
    };

    /** This function sends the contact and product details to the API and gets a response.
     *  That response is an order id which takes the user to the confirmation page and displays the order id.
     *  Also clears the local storage. */
    function sendUserContactDetails(cartItems) {
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
        for (let i = 0; i < cartItems.length; i++) {
            const cartItem = cartItems[i];
            order.products.push(cartItem[0]); 
        };
        console.log(order);
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
            };
        
        fetch("http://localhost:3000/api/products/order", options)
            .then(res => res.json())
            .then(response => location.href = `./confirmation.html?orderid=${response.orderId}`)
            localStorage.clear()
            .catch((err) => {
                console.log("Error: ", err);
                alert("503 - Service Unavailable");
            });
    };

    /** Upon clicking the "Order" button, the form gets validated, if it's valid collect the user details and display an order id to the user
     *  If there is no items in the cart, an error message pops up on the screen. */
    const orderButtonElement = document.getElementById("order");
    orderButtonElement.addEventListener("click", function(){
        if (totalQuantity.textContent === "0") {
            alert("There are no items in the cart, please go to the homepage to select your product first");
            return;
        };
        if (validationCheck())
        sendUserContactDetails(cartItems);
    });
};

/** Main is an asynchronous function that calls the "buildCart" function to display the products selected by the user,
 *  and another that paces the order for purchase. */
const main = async () => {
    const products = await fetchProducts();
    const cartItems = getCartItemsFromLocalStorage();
    buildCart(products, cartItems);
    placeAnOrder(cartItems);
  };
  main();