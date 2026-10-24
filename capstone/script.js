/**
 * Interactive Product Inventory & Analytics Dashboard
 * Capstone Mini Project - JavaScript Internship
 *
 * Implements:
 * 1. Data & Input Initialization (Explicit type conversion, objects, arrays)
 * 2. Control Flow & Conditional Evaluation (if...else & switch category assignment)
 * 3. Loops & Flow Control (while/for with break & continue for validation/traversal)
 * 4. Functions & Scope (Standard & Arrow functions, custom tax/discount, local scope)
 * 5. Array Methods & Iteration (forEach, filter, map)
 */

// Initial Seed Products as required by PDF specification
const DEFAULT_PRODUCTS = [
    { name: "Laptop", price: 800 },
    { name: "Mouse", price: 25 }
];

// In-memory product state (with safe localStorage persistence fallback)
let inventory = [];

/**
 * 1. Data Initialization & Storage Helper
 */
function loadInitialInventory() {
    try {
        const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('js_capstone_inventory') : null;
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.warn("Storage access not available, defaulting to initial memory state.");
    }
    // Deep clone default products
    return JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
}

function saveInventoryToStorage() {
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('js_capstone_inventory', JSON.stringify(inventory));
        }
    } catch (e) {
        console.warn("Unable to save inventory to storage:", e);
    }
}

/**
 * 2. Categorization using if...else & switch blocks
 * Category Rules:
 * - Budget: Price <= $50
 * - Standard: Price > $50 and <= $200
 * - Premium: Price > $200
 */
function evaluatePriceTier(price) {
    let tierKey;
    if (price <= 50) {
        tierKey = "BUDGET_TIER";
    } else if (price > 50 && price <= 200) {
        tierKey = "STANDARD_TIER";
    } else {
        tierKey = "PREMIUM_TIER";
    }

    // Switch statement to map category label and badge class
    let categoryName;
    let badgeClass;

    switch (tierKey) {
        case "BUDGET_TIER":
            categoryName = "Budget";
            badgeClass = "pill-budget";
            break;
        case "STANDARD_TIER":
            categoryName = "Standard";
            badgeClass = "pill-standard";
            break;
        case "PREMIUM_TIER":
            categoryName = "Premium";
            badgeClass = "pill-premium";
            break;
        default:
            categoryName = "Standard";
            badgeClass = "pill-standard";
            break;
    }

    return { categoryName, badgeClass };
}

/**
 * 3. Input Validation using Flow Control (Conditionals & Clean Handling)
 * Validates product name and price. Returns { isValid, name, price, errorMessage }
 */
function validateProductInput(rawName, rawPrice) {
    const trimmedName = typeof rawName === 'string' ? rawName.trim() : '';
    if (!trimmedName) {
        return { isValid: false, errorMessage: "Product name cannot be empty." };
    }

    if (rawPrice === null || rawPrice === undefined || String(rawPrice).trim() === '') {
        return { isValid: false, errorMessage: "Product price cannot be empty." };
    }

    // Explicit type conversion using Number()
    const convertedPrice = Number(rawPrice);

    if (isNaN(convertedPrice)) {
        return { isValid: false, errorMessage: "Product price must be a valid numerical value." };
    }

    if (convertedPrice <= 0) {
        return { isValid: false, errorMessage: "Product price must be greater than zero." };
    }

    return {
        isValid: true,
        name: trimmedName,
        price: convertedPrice
    };
}

/**
 * 4. Financial Calculations demonstrating Regular Functions and Arrow Functions
 */

// Regular function: calculate basic total inventory value
function calculateInventoryTotal(items) {
    let total = 0;
    // Loop through inventory array
    for (let i = 0; i < items.length; i++) {
        // Safe check using continue to skip corrupted entries if any
        if (!items[i] || typeof items[i].price !== 'number' || isNaN(items[i].price)) {
            continue;
        }
        total += items[i].price;
    }
    return total;
}

// Arrow function with default parameters demonstrating local scoping & tax/discount
const calculateAdjustedTotal = (subtotal, taxRate = 10, discountRate = 0) => {
    // Local scope variables
    const discountAmount = subtotal * (discountRate / 100);
    const discountedSubtotal = subtotal - discountAmount;
    const taxAmount = discountedSubtotal * (taxRate / 100);
    const finalAmount = discountedSubtotal + taxAmount;

    return {
        discountAmount,
        discountedSubtotal,
        taxAmount,
        finalAmount
    };
};

/**
 * 5. Array Methods & Transformations (forEach, filter, map)
 */
function getAffordableProducts(items, threshold = 200) {
    // Array.prototype.filter to isolate items matching specific criteria (< $200)
    return items.filter(item => item.price < threshold);
}

function generateReportTags(items) {
    // Array.prototype.map to produce formatted report summary: ["NAME: $PRICE", ...]
    return items.map(item => `${item.name.toUpperCase()}: $${item.price}`);
}

/**
 * Core CLI / Prompt Simulation Engine (Executes directly when run via Node.js or simulated in Browser)
 */
function simulateConsoleOutput(newProductName = "Monitor", newProductPrice = 150) {
    // Construct local simulation array matching PDF sequence exactly
    const simulationInventory = [
        { name: "Laptop", price: 800 },
        { name: "Mouse", price: 25 }
    ];

    // Add user product
    simulationInventory.push({ name: newProductName, price: newProductPrice });

    const lines = [];
    lines.push("--- Initializing Inventory System ---");
    lines.push(`[Prompt executed: User adds "${newProductName}" at "$${newProductPrice}"]\n`);
    lines.push("--- Processing Inventory Roster (forEach) ---");

    // Process roster using forEach
    simulationInventory.forEach(item => {
        const { categoryName } = evaluatePriceTier(item.price);
        lines.push(`* Item: ${item.name} ($${item.price}) -> Category: ${categoryName}`);
    });

    lines.push("\n--- Financial Analytics ---");
    const totalVal = calculateInventoryTotal(simulationInventory);
    lines.push(`Total Inventory Value: $${totalVal}`);

    const affordableItems = getAffordableProducts(simulationInventory, 200).map(i => i.name);
    lines.push(`Filtered Affordable Items (Under $200): ${JSON.stringify(affordableItems).replace(/,/g, ', ')}`);

    const reportList = generateReportTags(simulationInventory);
    lines.push(`Formatted Report List: ${JSON.stringify(reportList).replace(/,/g, ', ')}`);

    return lines.join("\n");
}

// Check if running directly inside Node.js CLI
if (typeof window === "undefined" && typeof module !== "undefined") {
    console.log(simulateConsoleOutput("Monitor", 150));
    module.exports = {
        DEFAULT_PRODUCTS,
        validateProductInput,
        evaluatePriceTier,
        calculateInventoryTotal,
        calculateAdjustedTotal,
        getAffordableProducts,
        generateReportTags,
        simulateConsoleOutput
    };
}

/**
 * Browser UI Controller & DOM Event Bindings
 */
if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        // Initialize inventory state
        inventory = loadInitialInventory();

        // Cache DOM elements
        const productForm = document.getElementById("product-form");
        const productNameInput = document.getElementById("product-name");
        const productPriceInput = document.getElementById("product-price");
        const nameError = document.getElementById("name-error");
        const priceError = document.getElementById("price-error");
        const toastEl = document.getElementById("toast-message");

        const metricTotalItems = document.getElementById("metric-total-items");
        const metricTotalValue = document.getElementById("metric-total-value");
        const metricAffordableCount = document.getElementById("metric-affordable-count");
        const metricTotalWithTax = document.getElementById("metric-total-with-tax");

        const inventoryTableBody = document.getElementById("inventory-table-body");
        const filterSelect = document.getElementById("filter-select");
        const affordableItemsList = document.getElementById("affordable-items-list");
        const affordableItemsRaw = document.getElementById("affordable-items-raw");
        const mappedReportList = document.getElementById("mapped-report-list");
        const consoleStream = document.getElementById("console-stream");

        const taxRateInput = document.getElementById("tax-rate-input");
        const discountRateInput = document.getElementById("discount-rate-input");
        const calcSubtotal = document.getElementById("calc-subtotal");
        const calcDiscount = document.getElementById("calc-discount");
        const calcTax = document.getElementById("calc-tax");
        const calcFinalTotal = document.getElementById("calc-final-total");

        const btnQuickMonitor = document.getElementById("btn-quick-monitor");
        const btnResetInventory = document.getElementById("btn-reset-inventory");
        const btnCopyConsole = document.getElementById("btn-copy-console");

        let toastTimeout = null;
        function showToast(message, isError = false) {
            if (!toastEl) return;
            toastEl.textContent = message;
            toastEl.className = `toast-message ${isError ? 'error' : 'success'}`;
            if (toastTimeout) clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                toastEl.className = "toast-message hidden";
            }, 3500);
        }

        // Render entire UI state
        function renderDashboard() {
            const currentFilter = filterSelect ? filterSelect.value : "all";

            // 1. Calculate Financials
            const totalInventoryValue = calculateInventoryTotal(inventory);
            const taxRate = Number(taxRateInput.value) || 0;
            const discountRate = Number(discountRateInput.value) || 0;
            const financialStats = calculateAdjustedTotal(totalInventoryValue, taxRate, discountRate);

            // 2. Affordable & Mapped Items
            const affordableProducts = getAffordableProducts(inventory, 200);
            const affordableNames = affordableProducts.map(p => p.name);
            const reportTags = generateReportTags(inventory);

            // Update Metrics Cards
            if (metricTotalItems) metricTotalItems.textContent = inventory.length;
            if (metricTotalValue) metricTotalValue.textContent = `$${totalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            if (metricAffordableCount) metricAffordableCount.textContent = affordableProducts.length;
            if (metricTotalWithTax) metricTotalWithTax.textContent = `$${financialStats.finalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

            // Update Financial Simulator Breakdown
            if (calcSubtotal) calcSubtotal.textContent = `$${totalInventoryValue.toFixed(2)}`;
            if (calcDiscount) calcDiscount.textContent = `-$${financialStats.discountAmount.toFixed(2)}`;
            if (calcTax) calcTax.textContent = `+$${financialStats.taxAmount.toFixed(2)}`;
            if (calcFinalTotal) calcFinalTotal.textContent = `$${financialStats.finalAmount.toFixed(2)}`;

            // Render Inventory Table using forEach() with category evaluation
            if (inventoryTableBody) {
                inventoryTableBody.innerHTML = "";

                if (inventory.length === 0) {
                    inventoryTableBody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 24px; color: var(--text-muted);">No products in inventory. Add one above!</td></tr>`;
                } else {
                    inventory.forEach((item, index) => {
                        const { categoryName, badgeClass } = evaluatePriceTier(item.price);
                        const isAffordable = item.price < 200;

                        // Apply table filter
                        if (currentFilter === "affordable" && !isAffordable) return;
                        if (currentFilter === "budget" && categoryName !== "Budget") return;
                        if (currentFilter === "standard" && categoryName !== "Standard") return;
                        if (currentFilter === "premium" && categoryName !== "Premium") return;

                        const tr = document.createElement("tr");
                        tr.innerHTML = `
                            <td>${index + 1}</td>
                            <td><strong>${item.name}</strong></td>
                            <td>$${Number(item.price).toFixed(2)}</td>
                            <td><span class="pill ${badgeClass}">${categoryName}</span></td>
                            <td>${isAffordable ? '<span class="text-success">✓ Yes (&lt; $200)</span>' : '<span class="text-secondary">✗ No</span>'}</td>
                            <td class="text-center">
                                <button class="btn-remove" data-index="${index}" title="Remove item">✕ Delete</button>
                            </td>
                        `;
                        inventoryTableBody.appendChild(tr);
                    });
                }
            }

            // Render Affordable Items Chips & Raw Output
            if (affordableItemsList) {
                if (affordableProducts.length === 0) {
                    affordableItemsList.innerHTML = `<span style="color: var(--text-muted); font-size: 0.85rem;">No products under $200.</span>`;
                } else {
                    affordableItemsList.innerHTML = affordableProducts
                        .map(p => `<span class="chip">✓ ${p.name} ($${p.price})</span>`)
                        .join(" ");
                }
            }
            if (affordableItemsRaw) {
                affordableItemsRaw.textContent = JSON.stringify(affordableNames).replace(/,/g, ', ');
            }

            // Render Formatted Report List
            if (mappedReportList) {
                mappedReportList.textContent = JSON.stringify(reportTags, null, 2);
            }

            // Update Simulated Console Output window matching the PDF exact style
            if (consoleStream) {
                const latestAdded = inventory.length > 2 ? inventory[inventory.length - 1] : { name: "Monitor", price: 150 };
                consoleStream.textContent = simulateConsoleOutput(latestAdded.name, latestAdded.price);
            }

            // Persist changes
            saveInventoryToStorage();
        }

        // Form Submit Handler
        if (productForm) {
            productForm.addEventListener("submit", (e) => {
                e.preventDefault();
                nameError.textContent = "";
                priceError.textContent = "";

                const rawName = productNameInput.value;
                const rawPrice = productPriceInput.value;

                // Validate input using clean helper
                const validation = validateProductInput(rawName, rawPrice);

                if (!validation.isValid) {
                    if (validation.errorMessage.includes("name")) {
                        nameError.textContent = validation.errorMessage;
                        productNameInput.focus();
                    } else {
                        priceError.textContent = validation.errorMessage;
                        productPriceInput.focus();
                    }
                    showToast(validation.errorMessage, true);
                    return;
                }

                // Add to inventory array
                inventory.push({
                    name: validation.name,
                    price: validation.price
                });

                // Clear form
                productNameInput.value = "";
                productPriceInput.value = "";
                productNameInput.focus();

                showToast(`Added "${validation.name}" ($${validation.price}) successfully!`);
                renderDashboard();
            });

            // Clear errors dynamically on input
            productNameInput.addEventListener("input", () => {
                if (nameError.textContent) {
                    nameError.textContent = "";
                }
            });

            productPriceInput.addEventListener("input", () => {
                if (priceError.textContent) {
                    priceError.textContent = "";
                }
            });
        }

        // Quick Action: Add Monitor ($150) as specified in PDF
        if (btnQuickMonitor) {
            btnQuickMonitor.addEventListener("click", () => {
                inventory = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
                inventory.push({ name: "Monitor", price: 150 });
                showToast("Added 'Monitor' ($150). Total is now $975!");
                renderDashboard();
            });
        }

        // Reset Inventory to Laptop & Mouse
        if (btnResetInventory) {
            btnResetInventory.addEventListener("click", () => {
                inventory = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
                showToast("Inventory reset to initial products (Laptop $800, Mouse $25).");
                renderDashboard();
            });
        }

        // Delete item handler on table
        if (inventoryTableBody) {
            inventoryTableBody.addEventListener("click", (e) => {
                const target = e.target;
                if (target.classList.contains("btn-remove")) {
                    const itemIndex = parseInt(target.getAttribute("data-index"), 10);
                    if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < inventory.length) {
                        const removed = inventory.splice(itemIndex, 1)[0];
                        showToast(`Removed "${removed.name}" from inventory.`);
                        renderDashboard();
                    }
                }
            });
        }

        // Filter dropdown change
        if (filterSelect) {
            filterSelect.addEventListener("change", renderDashboard);
        }

        // Financial inputs live recalculation
        if (taxRateInput) {
            taxRateInput.addEventListener("input", renderDashboard);
        }
        if (discountRateInput) {
            discountRateInput.addEventListener("input", renderDashboard);
        }

        // Copy Simulated Console Output
        if (btnCopyConsole) {
            btnCopyConsole.addEventListener("click", () => {
                if (consoleStream) {
                    navigator.clipboard.writeText(consoleStream.textContent)
                        .then(() => showToast("Simulated terminal output copied to clipboard!"))
                        .catch(() => showToast("Failed to copy text.", true));
                }
            });
        }

        // Initial render
        renderDashboard();
    });
}
