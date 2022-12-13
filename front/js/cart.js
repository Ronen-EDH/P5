const cartItemsLocalStorage = JSON.parse(localStorage.getItem(("cart-items")));
console.log(cartItemsLocalStorage);

fetch("http://localhost:3000/api/products")
.then(data => {
return data.json();
})
.then(listOfProducts => {
insertProduct(listOfProducts);
// insertProductForQuantity(listOfProducts);
});


const itemQuantityEl = document.getElementsByClassName("itemQuantity");
const totalPriceEl = document.getElementById("totalPrice");
const totalQuantityEl = document.getElementById("totalQuantity");
let total = 0;

function insertProduct(listOfProducts) {
    // let total = 0;
    let totalQuantity = 0;
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
                    fetch("http://localhost:3000/api/products")
                    .then(data => {
                    return data.json();
                    })
                    .then(listOfProducts => {
                    insertProductForQuantity(listOfProducts);
                    });
                    // insertProductForQuantity(listOfProducts);
                    function insertProductForQuantity(listOfProducts) {
                        for (let i = 0; i < listOfProducts.length; i++) {
                            const product = listOfProducts[i];
                            // console.log(product);
                            if (currentItemID === product._id) {
                                console.log("Current product price: ",product.price);
                                // Why is cartItemLocalStorage[2] here is the "after value and on line 120 the one I want?"
                                console.log("Value before: ",cartItemLocalStorage[2]);
                                let newTotal = (product.price * cartItemLocalStorage[2]);
                                console.log(newTotal);
                                // total = total + (product.price * currentItem.value);
                                // console.log(totalPriceEl.textContent);
                                console.log(total);
                            }
                        }
                    }
                    // console.log("Before the pop&push: ",cartItemLocalStorage);
                    console.log("Value before: ",cartItemLocalStorage[2]);
                    cartItemLocalStorage.pop();
                    cartItemLocalStorage.push(+currentItem.value);
                    console.log("Value after: ",currentItem.value);
                    // console.log("After the pop&push: ",cartItemLocalStorage);
                    console.log(cartItemsLocalStorage[n]);
                    localStorage.setItem("cart-items", JSON.stringify(cartItemsLocalStorage));
                    // console.log("Local storage: ",localStorage);
                    // fetch("http://localhost:3000/api/products")
                    // .then(data => {
                    // return data.json();
                    // })
                    // .then(listOfProducts => {
                    // insertProductForQuantity(listOfProducts);
                    // });
                    // // insertProductForQuantity(listOfProducts);
                    // function insertProductForQuantity(listOfProducts) {
                    //     for (let i = 0; i < listOfProducts.length; i++) {
                    //         const product = listOfProducts[i];
                    //         // console.log(product);
                    //         if (currentItemID === product._id) {
                    //             console.log(product.price);
                    //         }
                    //     }
                    // }

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
                    console.log(cartItemLocalStorage);
                    const index = cartItemsLocalStorage.indexOf(cartItemLocalStorage);
                    if (index > -1) { 
                        cartItemsLocalStorage.splice(index, 1);
                        console.log(cartItemsLocalStorage);
                        localStorage.setItem("cart-items", JSON.stringify(cartItemsLocalStorage));
                        console.log("Local storage: ",localStorage);
                      }
                }
            }
        })
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
   
    // }
    // function insertProductForQuantity() {
    //     for (let i = 0; i < listOfProducts.length; i++) {
    //         const product = listOfProducts[i];
    //         console.log(product);
    //     }
    // }
}

// function insertProductForQuantity(listOfProducts) {
//     for (let i = 0; i < listOfProducts.length; i++) {
//         const product = listOfProducts[i];
//         console.log(product);

//         // for (let n = 0; n < cartItemsLocalStorage.length; n++ ) {
//         //     let cartItemLocalStorage = cartItemsLocalStorage[n];
//         // }
//     }
// }

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

const emailEl = document.getElementById("email");
const emailErrorMsgEl = document.getElementById("emailErrorMsg")
// console.log(emailEl);
// console.log(emailEl.value);
// console.log(emailErrorMsgEl.textContent);

function validateEmail() {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emailEl.value.match(mailformat)) {
        emailErrorMsgEl.innerText = "Valid email address!";
        // alert("Valid email address!");
        // emailEl.focus();
        // return true;
    } else {
        emailErrorMsgEl.innerText = "You have entered an invalid email address!";
        // alert("You have entered an invalid email address!");
        // emailEl.focus();
        // return false;
    }
}

emailEl.addEventListener('change', function(){
    validateEmail();
})

const firstNameEl = document.getElementById("firstName");
const firstNameErrorMsgEl = document.getElementById("firstNameErrorMsg");
const lastNameEl = document.getElementById("lastName");
const lastNameErrorMsgEl = document.getElementById("lastNameErrorMsg");
// console.log(firstNameEl.value === "");

function validateName(nameEl,errorMsgEl) {
    const nameformat = /^[a-z ,.'-]+$/i;
    if(nameEl.value.match(nameformat)) {
        errorMsgEl.innerText = "This is good!";
    } else {
        errorMsgEl.innerText = "Name should contain only letters!";
    }
}

firstNameEl.addEventListener('change', function(){
    if (firstNameEl.value === "" ) {
        firstNameErrorMsgEl.innerText = "This is required";
    } else {
        validateName(firstNameEl,firstNameErrorMsgEl);
    }

})

lastNameEl.addEventListener('change', function(){
    validateName(lastNameEl,lastNameErrorMsgEl);
})



