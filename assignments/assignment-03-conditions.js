// Assignment 3: Conditional Logic Implementation
// Task: Create a script that evaluates a user's numerical test score using if...else statements,
// determines a letter grade using a switch statement, and uses a ternary operator to print whether they passed or failed.

const score = 85;

// 1. Evaluate score category/bracket using if...else statements
let gradeTier;
if (score >= 90 && score <= 100) {
    gradeTier = "EXCELLENT";
} else if (score >= 80 && score < 90) {
    gradeTier = "VERY_GOOD";
} else if (score >= 70 && score < 80) {
    gradeTier = "GOOD";
} else if (score >= 60 && score < 70) {
    gradeTier = "SATISFACTORY";
} else {
    gradeTier = "NEEDS_IMPROVEMENT";
}

// 2. Determine letter grade using a switch statement
let grade;
switch (gradeTier) {
    case "EXCELLENT":
        grade = "A";
        break;
    case "VERY_GOOD":
        grade = "B";
        break;
    case "GOOD":
        grade = "C";
        break;
    case "SATISFACTORY":
        grade = "D";
        break;
    default:
        grade = "F";
        break;
}

// 3. Determine pass/fail status using ternary operator (passing score threshold >= 60)
const status = score >= 60 ? "Passed" : "Failed";

// Expected Output format:
// Score: 85
// Grade: B
// Status: Passed
console.log(`Score: ${score}`);
console.log(`Grade: ${grade}`);
console.log(`Status: ${status}`);
