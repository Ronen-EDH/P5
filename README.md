# Kanap E-commerce Website

This is an OpenClassrooms student repo for project 5 by EDH.

## Project Description

### Scenario  

Kanap, a furniture company sells its products from its physical shop only. The company would now like to add an online store to its physical shop in order to sell its products on the Internet.
My task for this project was to bring together the work done by the team(front-end and back-end) by integrating the API information into the various web pages using Javascript as well as implementing a plan for acceptance tests based on the provided template.

### Main functional requirements  

The online app will be made up of 4 pages:
- A homepage which will (dynamically) display all of the articles that are available for
purchase 
- A “product” page which will (dynamically) display the details of the product that the
user clicked on when on the homepage. From the product page users will be able to
select the required quantity and colour and then add the product to the cart. All selected items should then be displayed in the cart.
- A “cart” page. This page will contain several parts:
  - A summary of the products in the cart and the total price. Users should be able to change the quantity of product or to completely remove a product from
the cart and when they do so the total cost identified on the page should also be updated. In the cart, you should always display the products grouped by model and by colour. If a product, in the same colour, is added to the cart several times then this product should appear just once but with the quantity adjusted
  - A form to be submitted in order to confirm the order. The data entered into this form should be correct and properly formatted before it is sent to the Back-end, so make sure it's verified and approved.
- A “confirmation” page which will have an order confirmation message thanking the user for their order and
displaying the order number sent by the API

### Main technical requirements

- Only Vanilla JavaScript code can be used 
- The code should be indented and should use comments at the start of each function to
describe their roles. The code should also be divided into several reusable (named) functions.
- Sensitive data like the price of products should not be stored in localStorage. Data stored
locally are not safe, the user could then modify the price of their order.
- For POST requests the contact object sent to the server must contain the following fields:
firstName, lastName, address, city and email. The product table sent to the Back-end should
be an array of product ID strings. The types of these fields and the presence of data in each
of them must be approved before the data is sent to the server.

- A plan for a series of acceptance tests to cover the entire range of features listed in the Functional specifications document.

## Technology used

JavaScript, localStorage, helper functions

## Setup

1. Clone the repo
2. Open a terminal (Linux/Mac) or command prompt/PowerShell (Windows) 
3. Navigate into the back folder and from there run `npm install`
5. Run `node server` from the same folder
6. You have two options here: 
  - If you have VS Code, install the Live Server extension (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and then Click the Go Live button on your status bar(bottom right by default) and then on the pop-up window navigate to the html folder(../front/html)
  - The other option is to just open up the project directory, navigate to the index.html file  (../P5-Web-Dev-Kanap-master/front/html/index.html)and open the index.html file

### Test plan

Please open the P5_Horvath_test_plan.pdf file in the project directory to see the acceptance tests devised.
