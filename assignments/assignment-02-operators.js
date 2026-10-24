// Assignment 2: Operators, Expressions, and Input Handling
// Task: Use prompt() to capture a user's bill amount and tip percentage. Perform explicit type conversion
// (e.g., using Number()), compute the total using arithmetic and assignment operators, and log a formatted string.

// Helper to handle prompt() in both Browser and Node.js environments
function getPromptInput(message, defaultValue) {
    if (typeof prompt === "function") {
        return prompt(message, defaultValue);
    }
    // Fallback default for direct non-interactive CLI/Node execution
    return defaultValue;
}

// 1. Capture inputs (using defaults of 100 and 15 to match assignment test case)
const rawBill = getPromptInput("Enter bill subtotal amount ($):", "100");
const rawTipPercent = getPromptInput("Enter tip percentage (%):", "15");

// 2. Perform explicit type conversion
const subtotal = Number(rawBill);
const tipPercentage = Number(rawTipPercent);

// Validate numeric inputs (handles edge cases while preserving required PDF output)
if (isNaN(subtotal) || isNaN(tipPercentage) || subtotal < 0 || tipPercentage < 0) {
    console.warn("Invalid numerical input received. Please enter positive numbers for bill and tip.");
} else {
    // 3. Compute tip and total using arithmetic and assignment operators
    const calculatedTip = subtotal * (tipPercentage / 100);
    let totalAmount = subtotal;
    totalAmount += calculatedTip; // Using addition assignment operator

    // 4. Log formatted string matching expected output
    console.log(`Subtotal: $${subtotal}`);
    console.log(`Tip Percentage: ${tipPercentage}%`);
    console.log(`Calculated Tip: $${calculatedTip}`);
    console.log(`Total Amount to Pay: $${totalAmount}`);
}
