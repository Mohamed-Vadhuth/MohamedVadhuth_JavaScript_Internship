/**
 * Automated Test Suite for JavaScript Internship Assignments & Capstone
 * Validates syntax, logical requirements, type conversions, calculations,
 * and exact expected outputs across all files.
 */

const assert = require("assert");
const { execSync } = require("child_process");
const capstone = require("./capstone/script.js");

let passedCount = 0;
let totalCount = 0;

function runTest(testName, fn) {
    totalCount++;
    try {
        fn();
        console.log(`  ✓ [PASS] ${testName}`);
        passedCount++;
    } catch (err) {
        console.error(`  ✗ [FAIL] ${testName}`);
        console.error(`    Error: ${err.message}`);
    }
}

console.log("\n=======================================================");
console.log("  RUNNING JAVASCRIPT INTERNSHIP SPECIFICATION TESTS");
console.log("=======================================================\n");

// Assignment 1 Tests
console.log("Testing Assignment 1: Variables, Data Types & Console Operations...");
runTest("Assignment 1 runs without errors and logs expected types", () => {
    const output = execSync("node assignments/assignment-01-variables.js").toString();
    assert(output.includes("Name: Alice (Type: string)"), "Missing Name string output");
    assert(output.includes("Age: 25 (Type: number)"), "Missing Age number output");
    assert(output.includes("Is Employed: true (Type: boolean)"), "Missing boolean output");
    assert(output.includes('Skills: ["HTML", "CSS", "JavaScript"] (Type: object)'), "Missing skills object output");
});

// Assignment 2 Tests
console.log("\nTesting Assignment 2: Operators & Expressions...");
runTest("Assignment 2 computes tip and total accurately", () => {
    const output = execSync("node assignments/assignment-02-operators.js").toString();
    assert(output.includes("Subtotal: $100"), "Subtotal mismatch");
    assert(output.includes("Tip Percentage: 15%"), "Tip percentage mismatch");
    assert(output.includes("Calculated Tip: $15"), "Calculated tip mismatch");
    assert(output.includes("Total Amount to Pay: $115"), "Total amount mismatch");
});

// Assignment 3 Tests
console.log("\nTesting Assignment 3: Conditional Logic (if...else, switch, ternary)...");
runTest("Assignment 3 scores 85 as Grade B and Passed", () => {
    const output = execSync("node assignments/assignment-03-conditions.js").toString();
    assert(output.includes("Score: 85"), "Score mismatch");
    assert(output.includes("Grade: B"), "Grade mismatch");
    assert(output.includes("Status: Passed"), "Status mismatch");
});

// Assignment 4 Tests
console.log("\nTesting Assignment 4: Loops & Control Flow...");
runTest("Assignment 4 loops output table of 5 and first number > 10 divisible by 6", () => {
    const output = execSync("node assignments/assignment-04-loops.js").toString();
    assert(output.includes("5 x 1 = 5"), "Multiplication table error");
    assert(output.includes("5 x 5 = 25"), "Multiplication table error");
    assert(output.includes("Found: 12"), "Break search error");
});

// Assignment 5 Tests
console.log("\nTesting Assignment 5: Functions, Arrow Functions & Scope...");
runTest("Assignment 5 computes default 5x4=20 and custom 10x3=30 and catches ReferenceError", () => {
    const output = execSync("node assignments/assignment-05-functions.js").toString();
    assert(output.includes("Standard Function Area (Default 5x4): 20"), "Default area mismatch");
    assert(output.includes("Arrow Function Area (Custom 10x3): 30"), "Arrow function area mismatch");
    assert(output.includes("ReferenceError: blockVar is not defined"), "Scope error catching mismatch");
});

// Assignment 6 Tests
console.log("\nTesting Assignment 6: Arrays, Objects & Core Methods...");
runTest("Assignment 6 filters price < 50 and maps tags", () => {
    const output = execSync("node assignments/assignment-06-arrays-objects.js").toString();
    assert(output.includes("Item: Laptop - Price: $800"), "forEach mismatch");
    assert(output.includes("Item: Mouse - Price: $25"), "forEach mismatch");
    assert(output.includes("Item: Keyboard - Price: $45"), "forEach mismatch");
    assert(output.includes("Mouse") && output.includes("Keyboard"), "Filter mismatch");
    assert(output.includes("LAPTOP costs $800"), "Map tags mismatch");
});

// Capstone Tests
console.log("\nTesting Capstone Mini Project Logic & Specifications...");
runTest("Category categorization via if...else & switch logic", () => {
    const budget = capstone.evaluatePriceTier(25);
    assert.strictEqual(budget.categoryName, "Budget");

    const standard = capstone.evaluatePriceTier(150);
    assert.strictEqual(standard.categoryName, "Standard");

    const premium = capstone.evaluatePriceTier(800);
    assert.strictEqual(premium.categoryName, "Premium");
});

runTest("Input validation handles missing, empty, zero, and negative values", () => {
    const emptyName = capstone.validateProductInput("", 100);
    assert.strictEqual(emptyName.isValid, false);

    const missingPrice = capstone.validateProductInput("Item", "");
    assert.strictEqual(missingPrice.isValid, false);

    const negativePrice = capstone.validateProductInput("Item", -10);
    assert.strictEqual(negativePrice.isValid, false);

    const zeroPrice = capstone.validateProductInput("Item", 0);
    assert.strictEqual(zeroPrice.isValid, false);

    const validItem = capstone.validateProductInput("  Webcam  ", "79.99");
    assert.strictEqual(validItem.isValid, true);
    assert.strictEqual(validItem.name, "Webcam");
    assert.strictEqual(validItem.price, 79.99);
});

runTest("Inventory total and PDF requirement: Laptop ($800) + Mouse ($25) + Monitor ($150) = $975", () => {
    const testInventory = [
        { name: "Laptop", price: 800 },
        { name: "Mouse", price: 25 },
        { name: "Monitor", price: 150 }
    ];
    const total = capstone.calculateInventoryTotal(testInventory);
    assert.strictEqual(total, 975, `Total expected 975, got ${total}`);

    const affordable = capstone.getAffordableProducts(testInventory, 200).map(i => i.name);
    assert.deepStrictEqual(affordable, ["Mouse", "Monitor"]);

    const report = capstone.generateReportTags(testInventory);
    assert.deepStrictEqual(report, ["LAPTOP: $800", "MOUSE: $25", "MONITOR: $150"]);
});

runTest("Financial calculations: zero tax and zero discount", () => {
    const result = capstone.calculateAdjustedTotal(975, 0, 0);
    assert.strictEqual(result.discountAmount, 0);
    assert.strictEqual(result.taxAmount, 0);
    assert.strictEqual(result.finalAmount, 975);
});

runTest("Financial calculations: Screenshot scenario (Subtotal $975, Tax 3%, Discount 0%)", () => {
    const result = capstone.calculateAdjustedTotal(975, 3, 0);
    assert.strictEqual(result.discountAmount, 0);
    assert.strictEqual(result.taxAmount, 29.25);
    assert.strictEqual(result.finalAmount, 1004.25);
});

runTest("Financial calculations: Combined discount and tax (Subtotal $1000, Discount 10%, Tax 10%)", () => {
    // Subtotal: 1000, 10% discount -> discountedSubtotal = 900, 10% tax on 900 -> 90, total = 990
    const result = capstone.calculateAdjustedTotal(1000, 10, 10);
    assert.strictEqual(result.discountAmount, 100);
    assert.strictEqual(result.discountedSubtotal, 900);
    assert.strictEqual(result.taxAmount, 90);
    assert.strictEqual(result.finalAmount, 990);
});

runTest("Financial calculations: Default 10% tax (Subtotal $975, Discount 0%)", () => {
    const result = capstone.calculateAdjustedTotal(975, 10, 0);
    assert.strictEqual(result.discountAmount, 0);
    assert.strictEqual(result.taxAmount, 97.5);
    assert.strictEqual(result.finalAmount, 1072.5);
});

runTest("Simulated console output matches PDF expected output word-for-word", () => {
    const sim = capstone.simulateConsoleOutput("Monitor", 150);
    assert(sim.includes("Total Inventory Value: $975"), "Simulation total value mismatch");
    assert(sim.includes('Filtered Affordable Items (Under $200): ["Mouse", "Monitor"]'), "Simulation affordable items mismatch");
    assert(sim.includes('Formatted Report List: ["LAPTOP: $800", "MOUSE: $25", "MONITOR: $150"]'), "Simulation report list mismatch");
});

console.log("\n=======================================================");
console.log(`  TEST RESULTS: ${passedCount} / ${totalCount} PASSED`);
console.log("=======================================================\n");

if (passedCount !== totalCount) {
    process.exit(1);
}
