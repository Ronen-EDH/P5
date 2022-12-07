const cartItemsLocalStorage = JSON.parse(localStorage.getItem(("cart-items")));
// console.log(cartItemsLocalStorage);

fetch("http://localhost:3000/api/products")
.then(data => {
return data.json();
})
.then(listOfProducts => {
insertProduct(listOfProducts);
});

function insertProduct(listOfProducts) {
    for (let i = 0; i < listOfProducts.length; i++) {
        const product = listOfProducts[i];
        // console.log(product);
        if (product._id === cartItemsLocalStorage[0]) {
            console.log("Item in shopping cart: ",product )
            const articleELement = document.createElement("article");
            articleELement.setAttribute("class","cart__item");
            articleELement.setAttribute("data-id",cartItemsLocalStorage[0]);
            articleELement.setAttribute("data-color",cartItemsLocalStorage[1]);
            articleELement.innerHTML= 
                `
                <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${cartItemsLocalStorage[1]}</p>
                        <p>€${product.price}</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Quantity : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItemsLocalStorage[2]}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Delete</p>
                        </div>
                    </div>
                </div>
                `
            const cartItemsSection = document.getElementById("cart__items");
            cartItemsSection.appendChild(articleELement);
            break;
        }
    }
}

const users = [["Bob","carpenter",23],["Jack","cook",33],["Grace","teacher",52]];

console.log(users);

for (let i = 0; i < users.length; i++) {
    console.log(users[i]);
    const user = users[i];
    if (user.includes("Grace") && user.includes("teacher")) {
        console.log("It includes");
        let lastItemOfList = user[2];
        user.pop();
        user.push(lastItemOfList + 1);
        console.log(user);
    }
}

const arrey1 = [1,4,6];
const arrey2 = [2,1,3];

arrey1.push(arrey2);
console.log(arrey1);