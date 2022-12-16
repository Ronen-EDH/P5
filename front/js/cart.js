const cartItemsLocalStorage = JSON.parse(localStorage.getItem(("cart-items")));
console.log(cartItemsLocalStorage);

fetch("http://localhost:3000/api/products")
.then(data => {
return data.json();
})
.then(listOfProducts => {
insertProduct(listOfProducts);
});


const itemQuantityEl = document.getElementsByClassName("itemQuantity");
const totalPriceEl = document.getElementById("totalPrice");
const totalQuantityEl = document.getElementById("totalQuantity");
let total = 0;
let totalQuantity = 0;

function insertProduct(listOfProducts) {
    // let total = 0;
    // let totalQuantity = 0;
    for (let i = 0; i < listOfProducts.length; i++) {
        const product = listOfProducts[i];
        // console.log(product);
        // console.log("The ID: ",product._id);
        // console.log(cartItemsLocalStorage[0]);
        for (let n = 0; n < cartItemsLocalStorage.length; n++ ) {
            let cartItemLocalStorage = cartItemsLocalStorage[n];
            // console.log(cartItemLocalStorage[0]);
            if (product._id === cartItemLocalStorage[0]) {
                console.log("Item in shopping cart: ",product )
                const articleELement = document.createElement("article");
                articleELement.setAttribute("class","cart__item");
                articleELement.setAttribute("data-id",cartItemLocalStorage[0]);
                articleELement.setAttribute("data-color",cartItemLocalStorage[1]);
                articleELement.innerHTML= 
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
                cartItemsSection.appendChild(articleELement);
                
                total += product.price * cartItemLocalStorage[2];
                totalQuantity += cartItemLocalStorage[2];
                totalPriceEl.textContent = total;
                totalQuantityEl.textContent = totalQuantity;
            }
        }
       
    }
    // console.log(total);
}
// const itemQuantity = document.getElementsByClassName("itemQuantity");


window.onload = function() {
    // const itemQuantityEl = document.getElementsByClassName("itemQuantity");
    const deleteItemEl = document.getElementsByClassName("deleteItem");
    // const currentItem = 0;
    // console.log(deleteItemEl);
    // console.log(itemQuantityEl);
    // console.log(itemQuantity[0]);
    for (let i = 0; i < itemQuantityEl.length; i++) {
        const currentItem = itemQuantityEl[i];
        // console.log(currentItem);
        currentItem.addEventListener('change', function(){
            console.log("Quantity has been changed on: ",currentItem.closest("article"));
            const currentItemEl = currentItem.closest("article");
            // console.log(currentItemEl.getAttribute("data-id"))
            // console.log(currentItemEl.getAttribute("data-color"))   
            const currentItemID = currentItemEl.getAttribute("data-id");
            const currentItemColor = currentItemEl.getAttribute("data-color");
            for (let n = 0; n < cartItemsLocalStorage.length; n++) {
                // console.log(cartItemsLocalStorage[n]);
                const cartItemLocalStorage = cartItemsLocalStorage[n];
                if (cartItemLocalStorage[0] === currentItemID && cartItemLocalStorage[1] === currentItemColor) {
                    // Is it ok to use this here? I mean it makes the rest of the thing wait. Maybe I can just use fetch without .then? 
                    fetch("http://localhost:3000/api/products")
                    .then(data => {
                    return data.json();
                    })
                    .then(listOfProducts => {
                    insertProductForQuantityChange(listOfProducts);
                    });
                    // insertProductForQuantityChange(listOfProducts);
                    function insertProductForQuantityChange(listOfProducts) {
                        for (let i = 0; i < listOfProducts.length; i++) {
                            const product = listOfProducts[i];
                            // console.log(product);
                            if (currentItemID === product._id) {
                                // console.log("Current product price: ",product.price);
                                // Why is cartItemLocalStorage[2] here is the "after value and on line 120 the one I want?"
                                // console.log("Single item value before: ",cartItemLocalStorage[2]);
                                let itemTotalValueBefore = (product.price * cartItemLocalStorage[2]);
                                // console.log("itemTotalValueBefore: ",itemTotalValueBefore);
                                // total = total + (product.price * currentItem.value);
                                // console.log(totalPriceEl.textContent);
                                // let newTotal = total - itemTotalValueBefore;
                                total -= itemTotalValueBefore;
                                // console.log("Total: ", total);
                                // console.log("New total:",newTotal);
                                totalQuantity -= cartItemLocalStorage[2];
                                // console.log(totalQuantity);
                                // console.log("Before the pop&push: ",cartItemLocalStorage);
                                cartItemLocalStorage.pop();
                                cartItemLocalStorage.push(+currentItem.value);
                                // console.log("Value after: ",currentItem.value);
                                // total = newTotal + (product.price * currentItem.value);
                                total += product.price * currentItem.value;
                                // console.log("Total: ", total);
                                totalQuantity += +currentItem.value;
                                totalPriceEl.textContent = total;
                                totalQuantityEl.textContent = totalQuantity;
                                // console.log("After the pop&push: ",cartItemLocalStorage);
                                console.log(cartItemsLocalStorage[n]);
                                localStorage.setItem("cart-items", JSON.stringify(cartItemsLocalStorage));
                            }
                        }
                    }
                }
            }
        });   
    }

    for (let i = 0; i < deleteItemEl.length; i++) {
        const currentItemDel = deleteItemEl[i];
        // console.log(currentItemDel);
        currentItemDel.addEventListener("click", function(){
            console.log("Delete button clicked on: ",currentItemDel);
            const currentItemDelEl = currentItemDel.closest("article");
            console.log(currentItemDelEl);
            currentItemDelEl.remove();
            const currentItemID = currentItemDelEl.getAttribute("data-id");
            const currentItemColor = currentItemDelEl.getAttribute("data-color");
            for (let n = 0; n < cartItemsLocalStorage.length; n++) {
                const cartItemLocalStorage = cartItemsLocalStorage[n];
                if (cartItemLocalStorage[0] === currentItemID && cartItemLocalStorage[1] === currentItemColor) {
                    fetch("http://localhost:3000/api/products")
                    .then(data => {
                    return data.json();
                    })
                    .then(listOfProducts => {
                    insertProductForDelete(listOfProducts);
                    });
                    function insertProductForDelete(listOfProducts) {
                        for (let i = 0; i < listOfProducts.length; i++) {
                            const product = listOfProducts[i];
                            // console.log(product);
                            if (currentItemID === product._id) {
                                // console.log(product._id);
                                // console.log(cartItemLocalStorage);
                                let itemTotalValueBefore = (product.price * cartItemLocalStorage[2]);
                                // console.log("itemTotalValueBefore: ",itemTotalValueBefore);
                                total -= itemTotalValueBefore;
                                totalPriceEl.textContent = total;
                                totalQuantity -= cartItemLocalStorage[2];
                                totalQuantityEl.textContent = totalQuantity;
                                const index = cartItemsLocalStorage.indexOf(cartItemLocalStorage);
                                if (index > -1) { 
                                    cartItemsLocalStorage.splice(index, 1);
                                    console.log(cartItemsLocalStorage);
                                    localStorage.setItem("cart-items", JSON.stringify(cartItemsLocalStorage));
                                    console.log("Local storage: ",localStorage);
                                    }
                            }
                        }
                    }
                    // console.log(cartItemLocalStorage);
                    // const index = cartItemsLocalStorage.indexOf(cartItemLocalStorage);
                    // if (index > -1) { 
                    //     cartItemsLocalStorage.splice(index, 1);
                    //     console.log(cartItemsLocalStorage);
                    //     localStorage.setItem("cart-items", JSON.stringify(cartItemsLocalStorage));
                    //     console.log("Local storage: ",localStorage);
                    //     }
                }
            }
        })
    }
}
    // localStorage.setItem("cart-items", JSON.stringify(cartItemsLocalStorage));
    // console.log("Local storage: ",localStorage);
    
        // const pEl = document.getElementsByTagName("p");
        // console.log(pEl);

        // for (let n = 0; n < listOfProducts.length; n++) {
        //     const product = listOfProducts[n];
        //     console.log(product);
        
        // console.log(a);
        // console.log(currentItem.value);
        // const totalToPay = (currentItem.value * );

// function getProduct(listOfProducts) {
//     for (let i = 0; i < listOfProducts.length; i++) {
//         const product = listOfProducts[i];
//         if ()
//         console.log(product.price);
//     }
// }


// const firstItem = itemQuantity[0];

// firstItem.addEventListener('change', function(){
//     console.log("Quantity has been changed")
// });    

// const itemQuantity = document.getElementsByClassName("itemQuantity");
// console.log(itemQuantity);
// console.log(itemQuantity[0]);

// console.log(Object.keys(itemQuantity));
// firstItem.addEventListener('change', function(){
//     console.log("Quantity has been changed")
// });

// const users = [["Bob","carpenter",23],["Jack","cook",33],["Grace","teacher",52]];

// console.log(users);

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

// const arrey1 = [1,4,6];
// const arrey2 = [2,1,3];

// arrey1.push(arrey2);
// console.log(arrey1);

// let = items = [];

// let item = {id:"3456", color:"White", quantity: 2};
// let item2 = {id:"3456", color:"Blue", quantity: 3};

// items.push(item);
// items.push(item2);
// console.log(items);

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


function validateEmail() {
    // const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailElement.value.match(mailformat)) {
        // emailErrorMsgEl.innerText = "Valid email address!";
        emailErrorMsgElement.innerText = "";
        validationEmail = 1;
        // alert("Valid email address!");
        // emailEl.focus();
        // return true;
    } else {
        emailErrorMsgElement.innerText = "You have entered an invalid email address!";
        validationEmail = 0;
        // alert("You have entered an invalid email address!");
        // emailEl.focus();
        // return false;
    }
}

emailElement.addEventListener('change', function(){
    if (emailElement.value === "" ) {
        emailErrorMsgElement.innerText = "This is required";
    } else {
        validateEmail();
        // console.log(validationEmail);
    }
})

// function validateCheck(validationName) {
//     return validationName + 1;
// }

// validationFirstName = validateCheck(validationFirstName);
// console.log("ValidateCheck result: ",validationFirstName);

/* function validateName(nameEl,validationForName,errorMsgEl) {
    const nameformat = /^[a-z ,.'-]+$/i;
    if(nameEl.value.match(nameformat)) {
        return validationForName + 1;
        // validationForName = validateCheck(validationForName);
        // console.log("validation value: ",validationName);
    } else {
        errorMsgEl.innerText = "Name should contain only letters!";
    }
}

firstNameEl.addEventListener('change', function(){
    if (firstNameEl.value === "" ) {
        firstNameErrorMsgEl.innerText = "This is required";
    } else {
        validateName(firstNameEl,validationFirstName,firstNameErrorMsgEl);
        // validationFirstName = validateCheck(validationFirstName);
        console.log("validation value 2nd round: ",validationFirstName);     
    }

})

lastNameEl.addEventListener('change', function(){
    if (lastNameEl.value === "" ) {
        lastNameErrorMsgEl.innerText = "This is required";
    } else {
        validateName(lastNameEl,validationLastName,lastNameErrorMsgEl);
        validationLastName = validateCheck(validationLastName);
    }
})
 */

// Maybe exclude spaces? So just one firstname and lastname?
function validateFirstName() {
    const nameformat = /^[a-z ,.'-]+$/i;
    if(firstNameElement.value.match(nameformat)) {
        firstNameErrorMsgElement.innerText = "";
        validationFirstName = 1;
        // validationForName = validateCheck(validationForName);
        // console.log("validation value: ",validationName);
    } else {
        firstNameErrorMsgElement.innerText = "Name should contain only letters!";
        validationFirstName = 0;
    }
}

function validateLastName() {
    const nameformat = /^[a-z ,.'-]+$/i;
    if(lastNameElement.value.match(nameformat)) {
        lastNameErrorMsgElement.innerText = ""
        validationLastName = 1;
        // validationForName = validateCheck(validationForName);
        // console.log("validation value: ",validationName);
    } else {
        lastNameErrorMsgElement.innerText = "Name should contain only letters!";
        validationLastName = 0;
    }
}

firstNameElement.addEventListener('change', function(){
    if (firstNameElement.value === "" ) {
        firstNameErrorMsgElement.innerText = "This is required";
    } else {
        validateFirstName();
        // validationFirstName = validateCheck(validationFirstName);
        console.log("validation value 2nd round: ",validationFirstName);     
    }

})

lastNameElement.addEventListener('change', function(){
    if (lastNameElement.value === "" ) {
        lastNameErrorMsgElement.innerText = "This is required";
    } else {
        validateLastName();
    }
})


function validateCity() {
    // Have to add it cannot end on a dash
    const cityformat = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
    if(cityElement.value.match(cityformat)) {   
        // cityErrorMsgElement.innerText = "This is good!";
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
    } else {
        validateCity();
    }
})

// \d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\.
// Not super happy about this one... for example 234 Union Grove won't work...and it's a valid address
function validateAddress() {
    const addressformat = /\b(\d{2,5}\s+)(?![a|p]m\b)(NW|NE|SW|SE|north|south|west|east|n|e|s|w)?([\s|\,|.]+)?(([a-zA-Z|\s+]{1,30}){1,4})(court|ct|street|st|drive|dr|lane|ln|road|rd|blvd)/i;
    if(addressElement.value.match(addressformat)) {   
        // addressErrorMsgElement.innerText = "This is good!";
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
    } else {
        validateAddress();
    }
})

const orderButtonElement = document.getElementById("order");
const formElement = document.getElementsByClassName("cart__order__form");
const allErrorMsgElements = formElement[0].querySelectorAll("p");
console.log(allErrorMsgElements);
// for (let j = 0; j < allErrorMsgElements.length; j++) {
//     // console.log(allErrorMsgElements[j]);
//     allErrorMsgElements[j].innerText = "Hello";
// }
console.log(formElement[0].querySelectorAll("input"));
const allInputElement = formElement[0].querySelectorAll("input");
const contactObjectKeys = ["Firstname","Lastname","Address","City","Email"];
const contactObject = {};

orderButtonElement.addEventListener("click", function(){
    // console.log(validationEmail);
    let successCount = 0;
    const validationAll = [validationFirstName,validationLastName,validationAddress,validationCity,validationEmail]
    for (let i = 0; i < validationAll.length; i++) {
        // console.log(validationAll[i]);
        const currentItemForValidation = validationAll[i];
        // console.log(validationAll);
        if (currentItemForValidation === 1) {
            successCount += 1;
            if (successCount === 5) {
                console.log("Success");
                for (let i = 0; i < allInputElement.length - 1; i++) {
                    console.log(contactObjectKeys[i]);
                    console.log(allInputElement[i].value);
                    contactObject[contactObjectKeys[i]] = allInputElement[i].value;
                }
                console.log(contactObject);
                console.log(cartItemsLocalStorage)
                break
            }
        } else {
            for (let j = 0; j < allErrorMsgElements.length; j++) {
                // console.log(allErrorMsgElements[j]);
                allErrorMsgElements[i].innerText = "This is required";
            }
            // console.log(i);
            // console.log("Please fill out the required fields");
        }   
    }
     // if (validationEmail === 1) {
})
