console.log("Hello David");

fetch('http://localhost:3000/api/products')
.then(data => {
return data.json();
})
.then(product => {
insertProduct(product);
});

// .then(logData);
// function logData(product) {
//     console.log(product);
// }

const itemsEL = document.getElementById("items");
console.log(itemsEL);

function insertProduct(products) {
    for (let i = 0; i < products.length; i++) {
        // const product = products[i];
        // console.log(product);
        console.log(products[i]);
    }
}

const articleELement = document.createElement("article");
const imgElement = document.createElement("img");
const h3Element = document.createElement("h3");
const pElement = document.createElement("p");

h3Element.textContent = "placeholder name"
pElement.textContent = "This is a placeholder text for the p element."

imgElement.src = ".../product01.jpg"
imgElement.alt = "Lorem ipsum dolor sit amet, Kanap name1"

articleELement.appendChild(imgElement);
articleELement.appendChild(h3Element);
articleELement.appendChild(pElement);

h3Element.classList.add("productName")
pElement.classList.add("productDescription")

// console.log(imgElement)
itemsEL.appendChild(articleELement);