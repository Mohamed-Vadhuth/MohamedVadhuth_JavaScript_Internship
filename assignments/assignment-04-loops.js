// Assignment 4: Loop Control Structures
// Task: Write a for loop to print a multiplication table up to 5.
// Use a while loop with a break statement to find the first number greater than 10 that is divisible by 6,
// and a do...while loop that skips numbers using continue.

// 1. for loop: multiplication table of 5 up to 5
console.log("-- Multiplication Table of 5 --");
const multiplier = 5;
for (let i = 1; i <= 5; i++) {
    console.log(`${multiplier} x ${i} = ${multiplier * i}`);
}

// 2. while loop with break: find the first number > 10 that is divisible by 6
console.log("\n-- First number > 10 divisible by 6 --");
let currentNumber = 11;
let foundNumber = null;
while (true) {
    if (currentNumber % 6 === 0) {
        foundNumber = currentNumber;
        break; // Stop loop as soon as condition is met
    }
    currentNumber++;
}
console.log(`Found: ${foundNumber}`);

// 3. do...while loop: demonstrate skipping numbers using continue
// Loop through numbers 1 to 5, skipping odd numbers (or even) using continue
let counter = 0;
do {
    counter++;
    if (counter % 2 !== 0) {
        // Skip odd numbers using continue
        continue;
    }
    // Only even numbers reach here
} while (counter < 6);
