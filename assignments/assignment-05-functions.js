// Assignment 5: Function Architecture and Scope
// Task: Define a standard function and an arrow function that accept parameters (e.g., length and width)
// with default values to calculate the area of a rectangle. Demonstrate function and block scope limits.

// 1. Standard function declaration with default parameters
function calculateAreaStandard(length = 5, width = 4) {
    return length * width;
}

// 2. Arrow function with default parameters
const calculateAreaArrow = (length = 5, width = 4) => length * width;

// Compute outputs matching expected values
const standardResult = calculateAreaStandard(); // Uses defaults 5 and 4
const arrowResult = calculateAreaArrow(10, 3);   // Uses custom 10 and 3

console.log(`Standard Function Area (Default 5x4): ${standardResult}`);
console.log(`Arrow Function Area (Custom 10x3): ${arrowResult}`);

// 3. Demonstrate Scope Limits (Function scope and Block scope)
{
    let blockVar = "I am inside a block";
    const constBlockVar = "Block constant";
    var functionScopedVar = "I am var scoped to the function/global";
}

// Demonstrating block scope limit using try...catch
try {
    // Attempting to access blockVar outside of its block should throw a ReferenceError
    console.log(blockVar);
} catch (error) {
    console.log(`Scope Test Error: ${error.name}: blockVar is not defined (when accessed outside block)`);
}
