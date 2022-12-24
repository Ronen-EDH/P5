// Get data from API, convert it with json()method for js to read, when that's done run "insertProduct" function with the converted data
fetch("http://localhost:3000/api/products")
.then(data => {
return data.json();
})
.then(listOfProducts => {
insertProducts(listOfProducts);
})
.catch(error => {
alert("Error! Check if server is up and running");  
console.log("Error! Check if server is up and running");
console.error(error);
});
 
/* This is the same thing as ->
.then(anonymousFunction);
function anonymousFunction(product) {
    insertProduct(product);
}  */

const itemsEL = document.getElementById("items");
// console.log(itemsEL);

/* Loop through all the items of the API product table.
For each item create an HTML "a" element & "article" element with information from the API,
and place the "article" element as child of "a" element and "a" as child of the HTML element with the ID of "items".*/
function insertProducts(listOfProducts) {
    for (let i = 0; i < listOfProducts.length; i++) {
        const product = listOfProducts[i];
        const articleELement = document.createElement("article");
        const anchorElement = document.createElement("a");
        anchorElement.setAttribute("href",`./product.html?id=${product._id}`);
        articleELement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.altTxt}, ${product.name}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p
            `
        itemsEL.appendChild(anchorElement)
        anchorElement.appendChild(articleELement);
    }
}

