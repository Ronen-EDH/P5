fetch("http://localhost:3000/api/products")
.then(data => {
return data.json();
})
.then(listOfProducts => {
insertProduct(listOfProducts);
});
 
// This is the same thing as ->
// .then(anonymousFunction);
// function anonymousFunction(product) {
//     insertProduct(product);
// }

const itemsEL = document.getElementById("items");
// console.log(itemsEL);

function insertProduct(listOfProducts) {
    for (let i = 0; i < listOfProducts.length; i++) {
        const product = listOfProducts[i];
        // console.log(product);
        // console.log(products[i]);
        const articleELement = document.createElement("article");
        const anchorElement = document.createElement("a");

        anchorElement.setAttribute("href",`./product.html?id=${product._id}`);
        articleELement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.altTxt}, ${product.name}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p
            `
        itemsEL.appendChild(anchorElement);
        anchorElement.appendChild(articleELement);
    }

    // for (let i of products) {
    //     const product = products[i];
    //     // console.log(product);
    //     console.log(products[i]);
    //     const articleELement = document.createElement("article");
    //     const anchorElement = document.createElement("a");

    //     anchorElement.setAttribute("href",`./product.html?id=${product._id}`);
    //     articleELement.innerHTML = `
    //         <img src="${product.imageUrl}" alt="${product.altTxt}, ${product.name}">
    //         <h3 class="productName">${product.name}</h3>
    //         <p class="productDescription">${product.description}</p
    //         `
    //     itemsEL.appendChild(anchorElement);
    //     anchorElement.appendChild(articleELement);
    // }
}

