function buildCart(listOfProducts, cartItemsLocalStorage) {
    const totalPriceEl = document.getElementById("totalPrice");
    const totalQuantityEl = document.getElementById("totalQuantity");
    totalPriceEl.textContent = 0;
    totalQuantityEl.textContent = 0;
    let totalPrice = 0;
    let totalQuantity = 0;
    console.log(cartItemsLocalStorage);

    for (let i = 0; i < cartItemsLocalStorage.length; i++ ) {
        let cartItemLocalStorage = cartItemsLocalStorage[i];
        const product = listOfProducts.find((x) => x._id === cartItemLocalStorage[0]);
        // console.log("Item in shopping cart: ",product )
        const articleElement = document.createElement("article");
        articleElement.setAttribute("class","cart__item");
        articleElement.setAttribute("data-id",cartItemLocalStorage[0]);
        articleElement.setAttribute("data-color",cartItemLocalStorage[1]);
        articleElement.innerHTML= 
            `
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${cartItemLocalStorage[1]}</p>
                    <p>€${product.price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Quantity : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItemLocalStorage[2]}">
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
            cartItemLocalStorage.pop();
            cartItemLocalStorage.push(+itemQuantity);
            totalPrice += product.price * itemQuantity;
            // totalPriceEl.textContent = total;
            totalQuantity += +itemQuantity;
            updateCartArticleAndPriceCounter();
            // totalQuantityEl.textContent = totalQuantity;
            console.log("cartItemsLocalStorage after change:",cartItemsLocalStorage);
            setItemsToLocalStorage(cartItemsLocalStorage);
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
            const index = cartItemsLocalStorage.indexOf(cartItemLocalStorage);
            if (index > -1) { 
                cartItemsLocalStorage.splice(index, 1);
                console.log(cartItemsLocalStorage);
                setItemsToLocalStorage(cartItemsLocalStorage);
                console.log("Local storage: ",localStorage);
            }
        });
        
        totalPrice += product.price * cartItemLocalStorage[2];
        totalQuantity += cartItemLocalStorage[2];
        totalPriceEl.textContent = totalPrice;
        totalQuantityEl.textContent = totalQuantity;

        function updateCartItemInLocalStorage() {
            let itemsTotalValueBefore = (product.price * cartItemLocalStorage[2]);
            totalPrice -= itemsTotalValueBefore;
            totalQuantity -= cartItemLocalStorage[2];
          }

        function updateCartArticleAndPriceCounter() {
            totalPriceEl.textContent = totalPrice;
            totalQuantityEl.textContent = totalQuantity;
        }
    }
}


const emailElement = document.getElementById("email");
const emailErrorMsgElement = document.getElementById("emailErrorMsg")
const firstNameElement = document.getElementById("firstName");
const firstNameErrorMsgElement = document.getElementById("firstNameErrorMsg");
const lastNameElement = document.getElementById("lastName");
const lastNameErrorMsgElement = document.getElementById("lastNameErrorMsg");
const cityElement = document.getElementById("city");
const cityErrorMsgElement = document.getElementById("cityErrorMsg");
const addressElement = document.getElementById("address");
const addressErrorMsgElement = document.getElementById("addressErrorMsg");
let validationFirstName = 0;
let validationLastName = 0;
let validationAddress = 0;
let validationCity = 0;
let validationEmail = 0;


// const validationAll = [validationFirstName,validationLastName,validationAddress,validationCity,validationEmail]


function validateEmailInput() {
    const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailElement.value.match(mailformat)) {
        emailErrorMsgElement.innerText = "";
        validationEmail = 1;
    } else {
        emailErrorMsgElement.innerText = "You have entered an invalid email address!";
        validationEmail = 0;
    }
}

emailElement.addEventListener('change', function(){
    if (emailElement.value === "" ) {
        emailErrorMsgElement.innerText = "This is required";
        validationEmail = 0;
    } else {
        validateEmailInput();
    }
})

function validateNameInput(nameEl,validationForName,errorMsgEl) {
    const nameformat = /^[a-z,.'-]+$/i;
    if(nameEl.value.match(nameformat)) {
        errorMsgEl.innerText = "";
        return validationForName + 1;
    } else {
        errorMsgEl.innerText = "Name should contain only letters!";
    }
}

firstNameElement.addEventListener('change', function(){
    if (firstNameElement.value === "" ) {
        firstNameErrorMsgElement.innerText = "This is required";
    } else {
        validateNameInput(firstNameElement,validationFirstName,firstNameErrorMsgElement);
        console.log("validation value 2nd round: ",validationFirstName);     
    }

})

lastNameElement.addEventListener('change', function(){
    if (lastNameElement.value === "" ) {
        lastNameErrorMsgElement.innerText = "This is required";
    } else {
        validateNameInput(lastNameElement,validationLastName,lastNameErrorMsgElement);
    }
})

function validateFirstName() {
    const nameformat = /^[a-z,.'-]+$/i;
    if(firstNameElement.value.match(nameformat)) {
        firstNameErrorMsgElement.innerText = "";
        validationFirstName = 1;
    } else {
        firstNameErrorMsgElement.innerText = "You have entered an invalid name format!";
        validationFirstName = 0;
    }
}

function validateLastName() {
    const nameformat = /^[a-z,.'-]+$/i;
    if(lastNameElement.value.match(nameformat)) {
        lastNameErrorMsgElement.innerText = ""
        validationLastName = 1;
    } else {
        lastNameErrorMsgElement.innerText = "You have entered an invalid name format!";
        validationLastName = 0;
    }
}

firstNameElement.addEventListener('change', function(){
    if (firstNameElement.value === "" ) {
        firstNameErrorMsgElement.innerText = "This is required";
        validationFirstName = 0;
    } else {
        validateFirstName();
        console.log("validation value 2nd round: ",validationFirstName);     
    }

})

lastNameElement.addEventListener('change', function(){
    if (lastNameElement.value === "" ) {
        lastNameErrorMsgElement.innerText = "This is required";
        validationLastName = 0;
    } else {
        validateLastName();
        console.log("validation value for Last name: ",validationLastName);
    }
})


function validateCityInput() {
    const cityformat = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
    if(cityElement.value.match(cityformat)) {   
        cityErrorMsgElement.innerText = "";
        validationCity = 1;
    } else {
        cityErrorMsgElement.innerText = "City should contain only letters!";
        validationCity = 0;
    }
}

cityElement.addEventListener('change', function(){
    if (cityElement.value === "" ) {
        cityErrorMsgElement.innerText = "This is required";
        validationCity = 0;
    } else {
        validateCityInput();
    }
})

function validateAddressInput() {
    const addressformat = /^([1-9]|\d{1,5}\/?\w{1,3}?|\d+\-\d+)[a-zA-Z]?\s(([a-zA-Z]+\-?[a-zA-Z]+|[a-zA-Z]+\'?[a-zA-Z]+?|[a-zA-Z]+\,|\&|[a-zA-Z]+\.)\s){1,}(([a-zA-Z]+\-?[a-zA-Z]+?)|([a-zA-Z]+\.))$/;
                                    
    if(addressElement.value.match(addressformat)) {   
        addressErrorMsgElement.innerText = "";
        validationAddress = 1;
    } else {    
        addressErrorMsgElement.innerText = "You have entered an invalid address!";
        validationAddress = 0;
    }
}

addressElement.addEventListener('change', function(){
    if (addressElement.value === "" ) {
        addressErrorMsgElement.innerText = "This is required";
        validationAddress = 0;
    } else {
        validateAddressInput();
    }
})

const orderButtonElement = document.getElementById("order");
const formElement = document.getElementsByClassName("cart__order__form");
const allErrorMsgElements = formElement[0].querySelectorAll("p");
// console.log(allErrorMsgElements);
// console.log(formElement[0].querySelectorAll("input"));
const allInputElement = formElement[0].querySelectorAll("input");
const contactObjectKeys = ["firstName","lastName","address","city","email"];
const contactObject = {};

const data = {};

orderButtonElement.addEventListener("click", validateAllFormInput);
function validateAllFormInput() {
    if (totalQuantity === 0) {
        alert("There are no items in the cart, please go to the homepage to select your product first");
        return;
    }
    let successCount = 0;
    const validationAll = [validationFirstName,validationLastName,validationAddress,validationCity,validationEmail]
    for (let i = 0; i < validationAll.length; i++) {
        const currentItemForValidation = validationAll[i];
        console.log(validationAll);
        if (currentItemForValidation === 1) {
            successCount += 1;
            if  (successCount === 5){
                console.log(successCount);
                console.log("Success");
                sendUserContactDetails();
                function sendUserContactDetails() {
                    for (let i = 0; i < allInputElement.length - 1; i++) {
                        contactObject[contactObjectKeys[i]] = allInputElement[i].value;
                    }
                    data.contact = contactObject;
                    data.products = [];
                    for (let i = 0; i < cartItemsLocalStorage.length; i++) {
                        const cartItemLocalStorage = cartItemsLocalStorage[i];
                        console.log(cartItemLocalStorage[0]);
                        data.products.push(cartItemLocalStorage[0]); 
                    }
                    console.log(data);
                    const options = {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                        }
                    
                    fetch("http://localhost:3000/api/products/order", options)
                        .then(res => res.json())
                        // .then(data => location.href = `./confirmation.html?orderid=${data.orderId}`);
                        // localStorage.clear();
                    // location.href = "./confirmation.html";
                }
                // Do I need this break?
                break
            }
        } else {
            for (let j = 0; j < allErrorMsgElements.length; j++) {
                allErrorMsgElements[i].innerText = "This is required";
            }
            // console.log(i);
            // console.log("Please fill out the required fields");
        }   
    }
}

const main = async () => {
    const listOfProducts = await fetchProducts();
    const cartItemsLocalStorage = getCartItemsFromLocalStorage();
    buildCart(listOfProducts, cartItemsLocalStorage);
    // buildFormValidation();
  };
  main();