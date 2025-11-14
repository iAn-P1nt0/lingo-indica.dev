/**
 * Indic Language Features Demo
 *
 * This file demonstrates the comprehensive Indic language support
 * added to @lingo-indica.dev/_locales package.
 */

import {
  // Script utilities
  getScriptForLanguage,
  getAllScriptsForLanguage,
  isIndicLanguage,
  getScriptDirection,
  hasNativeNumerals,
  getIndicScriptName,
  INDIC_SCRIPT_INFO,
  // Formatting utilities
  toNativeNumerals,
  fromNativeNumerals,
  formatIndianNumber,
  formatLakhs,
  formatCrores,
  formatIndianDate,
  autoFormatIndianNumber,
} from "../src/index";

console.log("=".repeat(60));
console.log("INDIC LANGUAGE FEATURES DEMO");
console.log("=".repeat(60));

// ============================================================================
// 1. SCRIPT DETECTION
// ============================================================================
console.log("\n1. SCRIPT DETECTION");
console.log("-".repeat(60));

const languages = ["hi", "bn", "ta", "te", "kn", "ml", "gu", "pa", "en"];

languages.forEach((lang) => {
  const isIndic = isIndicLanguage(lang);
  if (isIndic) {
    const script = getScriptForLanguage(lang);
    const scriptName = script ? getIndicScriptName(script) : "Unknown";
    const direction = script ? getScriptDirection(script) : "N/A";
    const hasNumerals = script ? hasNativeNumerals(script) : false;

    console.log(`\n${lang.toUpperCase()} (${scriptName}):`);
    console.log(`  Script Code: ${script}`);
    console.log(`  Direction: ${direction}`);
    console.log(`  Native Numerals: ${hasNumerals ? "Yes" : "No"}`);
  } else {
    console.log(`\n${lang.toUpperCase()}: Not an Indic language`);
  }
});

// ============================================================================
// 2. MULTI-SCRIPT LANGUAGES
// ============================================================================
console.log("\n\n2. MULTI-SCRIPT LANGUAGES");
console.log("-".repeat(60));

const multiScriptLangs = ["pa", "ks", "sd", "mni"];

multiScriptLangs.forEach((lang) => {
  const scripts = getAllScriptsForLanguage(lang);
  const scriptNames = scripts.map((s) => getIndicScriptName(s));

  console.log(`\n${lang.toUpperCase()}: ${scriptNames.join(" OR ")}`);
  scripts.forEach((script) => {
    const info = INDIC_SCRIPT_INFO[script];
    console.log(`  - ${info.name} (${script}): ${info.direction.toUpperCase()}`);
  });
});

// ============================================================================
// 3. NATIVE NUMERAL CONVERSION
// ============================================================================
console.log("\n\n3. NATIVE NUMERAL CONVERSION");
console.log("-".repeat(60));

const number = 12345;
const numeralLangs = ["hi", "bn", "ta", "te", "kn", "ml", "gu", "pa"];

console.log(`\nOriginal: ${number}`);

numeralLangs.forEach((lang) => {
  const native = toNativeNumerals(number, lang);
  const script = getScriptForLanguage(lang);
  const scriptName = script ? getIndicScriptName(script) : "Unknown";

  console.log(`${lang.toUpperCase()} (${scriptName}): ${native}`);
});

// ============================================================================
// 4. INDIAN NUMBER FORMATTING
// ============================================================================
console.log("\n\n4. INDIAN NUMBER FORMATTING");
console.log("-".repeat(60));

const amounts = [1000, 50000, 100000, 1500000, 10000000, 150000000];

console.log("\nStandard Formatting:");
amounts.forEach((amt) => {
  console.log(`${amt.toString().padStart(12)} → ${formatIndianNumber(amt)}`);
});

console.log("\nWith Hindi Numerals:");
amounts.forEach((amt) => {
  console.log(
    `${amt.toString().padStart(12)} → ${formatIndianNumber(amt, true, "hi")}`
  );
});

console.log("\nAuto-Format (with units):");
amounts.forEach((amt) => {
  console.log(
    `${amt.toString().padStart(12)} → ${autoFormatIndianNumber(amt)}`
  );
});

// ============================================================================
// 5. LAKH AND CRORE FORMATTING
// ============================================================================
console.log("\n\n5. LAKH AND CRORE FORMATTING");
console.log("-".repeat(60));

const lakhAmounts = [100000, 250000, 1500000];
const croreAmounts = [10000000, 25000000, 150000000];

console.log("\nLakhs:");
lakhAmounts.forEach((amt) => {
  console.log(
    `${amt.toString().padStart(12)} → ${formatLakhs(amt)} → ${formatLakhs(amt, 0, true, "bn")}`
  );
});

console.log("\nCrores:");
croreAmounts.forEach((amt) => {
  console.log(
    `${amt.toString().padStart(12)} → ${formatCrores(amt)} → ${formatCrores(amt, 0, true, "ta")}`
  );
});

// ============================================================================
// 6. DATE FORMATTING
// ============================================================================
console.log("\n\n6. DATE FORMATTING");
console.log("-".repeat(60));

const date = new Date(2025, 9, 10); // October 10, 2025

console.log("\nIndian Date Format (DD-MM-YYYY):");
console.log(`  Default: ${formatIndianDate(date)}`);
console.log(
  `  Hindi: ${formatIndianDate(date, { useNativeDigits: true, languageCode: "hi" })}`
);
console.log(
  `  Bengali: ${formatIndianDate(date, { useNativeDigits: true, languageCode: "bn" })}`
);
console.log(
  `  Tamil: ${formatIndianDate(date, { useNativeDigits: true, languageCode: "ta" })}`
);

console.log("\nAlternative Formats:");
console.log(
  `  YYYY-MM-DD: ${formatIndianDate(date, { format: "YYYY-MM-DD" })}`
);
console.log(
  `  With slash: ${formatIndianDate(date, { separator: "/" })}`
);
console.log(
  `  With dot: ${formatIndianDate(date, { separator: "." })}`
);

// ============================================================================
// 7. REAL-WORLD EXAMPLE - INVOICE
// ============================================================================
console.log("\n\n7. REAL-WORLD EXAMPLE: INVOICE IN HINDI");
console.log("-".repeat(60));

const invoiceData = {
  invoiceNumber: 1234,
  date: new Date(2025, 9, 10),
  items: [
    { name: "Product A", quantity: 5, price: 50000 },
    { name: "Product B", quantity: 2, price: 125000 },
  ],
};

const lang = "hi";
const total = invoiceData.items.reduce(
  (sum, item) => sum + item.quantity * item.price,
  0
);

console.log(`\nInvoice #${toNativeNumerals(invoiceData.invoiceNumber, lang)}`);
console.log(
  `Date: ${formatIndianDate(invoiceData.date, { useNativeDigits: true, languageCode: lang })}`
);
console.log("\nItems:");
invoiceData.items.forEach((item, i) => {
  const itemTotal = item.quantity * item.price;
  console.log(
    `  ${toNativeNumerals(i + 1, lang)}. ${item.name}: ${toNativeNumerals(item.quantity, lang)} × ${formatIndianNumber(item.price, true, lang)} = ${formatIndianNumber(itemTotal, true, lang)}`
  );
});
console.log("\n" + "-".repeat(40));
console.log(
  `Total: ${formatIndianNumber(total, true, lang)} (${autoFormatIndianNumber(total, true, lang)})`
);

// ============================================================================
// 8. SUPPORTED LANGUAGES SUMMARY
// ============================================================================
console.log("\n\n8. SUPPORTED INDIC LANGUAGES");
console.log("-".repeat(60));

const allIndicLanguages = [
  "hi",
  "bn",
  "te",
  "mr",
  "ta",
  "ur",
  "gu",
  "kn",
  "or",
  "ml",
  "pa",
  "as",
  "mai",
  "sat",
  "ks",
  "ne",
  "sd",
  "kok",
  "doi",
  "mni",
  "brx",
  "sa",
];

const languageNames = {
  hi: "Hindi",
  bn: "Bengali",
  te: "Telugu",
  mr: "Marathi",
  ta: "Tamil",
  ur: "Urdu",
  gu: "Gujarati",
  kn: "Kannada",
  or: "Odia",
  ml: "Malayalam",
  pa: "Punjabi",
  as: "Assamese",
  mai: "Maithili",
  sat: "Santhali",
  ks: "Kashmiri",
  ne: "Nepali",
  sd: "Sindhi",
  kok: "Konkani",
  doi: "Dogri",
  mni: "Manipuri",
  brx: "Bodo",
  sa: "Sanskrit",
};

console.log(`\nTotal: ${allIndicLanguages.length} languages\n`);

allIndicLanguages.forEach((code) => {
  const name = languageNames[code as keyof typeof languageNames];
  const scripts = getAllScriptsForLanguage(code);
  const scriptNames = scripts.map((s) => getIndicScriptName(s)).join("/");

  console.log(`${code.padEnd(5)} ${name.padEnd(15)} → ${scriptNames}`);
});

console.log("\n" + "=".repeat(60));
console.log("Demo Complete!");
console.log("=".repeat(60));
