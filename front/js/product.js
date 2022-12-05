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

function insertProduct(listOfProducts) {
    for (let i = 0; i < listOfProducts.length; i++) {
        const product = listOfProducts[i];
        // console.log(product._id);
        if (product._id === id) {
            const productImg = document.querySelector(".item__img");
            const productId = document.getElementById("title");
            const productPrice = document.getElementById("price");
            const productDescription = document.getElementById("description");
            const productColor = document.getElementById("colors");
            
            productImg.innerHTML = `<img src=${product.imageUrl}>`;
            productId.innerHTML = product.name;
            productPrice.innerHTML = product.price;
            productDescription.innerHTML = product.description;
            for (let color of product.colors) {
                // console.log(color);
                productColor.innerHTML += `<option value="${color}">${color}</option>`;
            }
            break;
        }
    }
}

// const itemImg = document.querySelector(".item__img");
// const itemId = document.getElementById("title");
// const itemPrice = document.getElementById("price");
// const itemDescription = document.getElementById("description");
// const itemColor = document.getElementById("colors")

// itemImg.innerHTML = `<img src="../images/logo.png" alt="Photo of a sofa">`
// itemId.innerHTML = "Product name";
// itemPrice.innerHTML = "42";
// itemDescription.innerHTML = "Dis enim malesuada risus sapien gravida nulla nisl arcu.";
// itemColor.innerHTML += `
//     <option value="vert">green</option>
//     <option value="blanc">white</option>
//     `