const queryString = window.location.search;

// console.log(queryString);

const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

console.log(id);

const itemImg = document.querySelector(".item__img");
const itemId = document.getElementById("title");
const itemPrice = document.getElementById("price");
const itemDescription = document.getElementById("description");
const itemColor = document.getElementById("colors")

itemImg.innerHTML = `<img src="../images/logo.png" alt="Photo of a sofa">`
itemId.innerHTML = "Product name";
itemPrice.innerHTML = "42";
itemDescription.innerHTML = "Dis enim malesuada risus sapien gravida nulla nisl arcu.";
itemColor.innerHTML += `
    <option value="vert">green</option>
    <option value="blanc">white</option>
    `