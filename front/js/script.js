/** Loop through all the items of the API product table.
 *  For each item, create an HTML "a" element & "article" element with information from the API,
 *  and place the "article" element as child of "a" element, and "a" as child of the HTML element with the ID of "items".*/
function insertProducts(products) {
    const itemsEL = document.getElementById("items");
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const articleELement = document.createElement("article");
        const anchorElement = document.createElement("a");
        anchorElement.setAttribute("href",`./product.html?id=${product._id}`);
        articleELement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.altTxt}, ${product.name}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p
            `;
        itemsEL.appendChild(anchorElement);
        anchorElement.appendChild(articleELement);
    }
}

const main = async () => {
    const products = await fetchProducts();
    insertProducts(products);
  };
  main();