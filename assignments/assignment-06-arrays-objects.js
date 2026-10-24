// Assignment 6: Arrays, Objects, and Core Methods
// Task: Create an array of product objects (with name and price properties).
// Use forEach() to print each product, filter() to find items under a certain price,
// and map() to create an array of formatted name-price strings.

// 1. Array of product objects
const products = [
    { name: "Laptop", price: 800 },
    { name: "Mouse", price: 25 },
    { name: "Keyboard", price: 45 }
];

// 2. Use forEach() to print each product
console.log("-- All Products (forEach) --");
products.forEach(item => {
    console.log(`Item: ${item.name} - Price: $${item.price}`);
});

// 3. Use filter() to find items under $50
console.log("\n-- Filtered Products (Price < $50) --");
const affordableProducts = products.filter(item => item.price < 50);
console.log(affordableProducts);

// 4. Use map() to create an array of formatted name-price strings
console.log("\n-- Mapped Product Tags (map) --");
const productTags = products.map(item => `${item.name.toUpperCase()} costs $${item.price}`);
console.log(productTags);
