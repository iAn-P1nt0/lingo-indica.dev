# Indic Language Features

This document describes the comprehensive Indic language support added to the `@lingo-indica.dev/_locales` package.

## Overview

The locales package now includes extensive support for all 22 scheduled languages of India, along with specialized utilities for working with Indic scripts, numeral systems, and formatting conventions.

## Supported Languages

### Complete List of Indic Languages

The package now supports **22+ Indian languages**:

1. **Hindi** (hi) - Devanagari script
2. **Bengali** (bn) - Bengali script
3. **Telugu** (te) - Telugu script
4. **Marathi** (mr) - Devanagari script
5. **Tamil** (ta) - Tamil script
6. **Urdu** (ur) - Arabic script
7. **Gujarati** (gu) - Gujarati script
8. **Kannada** (kn) - Kannada script
9. **Odia** (or) - Odia script
10. **Malayalam** (ml) - Malayalam script
11. **Punjabi** (pa) - Gurmukhi/Arabic script (multi-script)
12. **Assamese** (as) - Bengali script
13. **Maithili** (mai) - Devanagari script
14. **Santali** (sat) - Ol Chiki script
15. **Kashmiri** (ks) - Arabic/Devanagari script (multi-script)
16. **Nepali** (ne) - Devanagari script
17. **Sindhi** (sd) - Arabic/Devanagari script (multi-script)
18. **Konkani** (kok) - Devanagari script
19. **Dogri** (doi) - Devanagari script
20. **Manipuri/Meitei** (mni) - Bengali/Meitei Mayek script (multi-script)
21. **Bodo** (brx) - Devanagari script
22. **Sanskrit** (sa) - Devanagari script

## Key Features

### 1. Script Information & Utilities

Detect and work with Indic writing scripts:

```typescript
import {
  getScriptForLanguage,
  getAllScriptsForLanguage,
  isIndicLanguage,
  getScriptDirection,
  hasNativeNumerals,
  INDIC_SCRIPT_INFO,
} from "@lingo-indica.dev/_locales";

// Get primary script for a language
getScriptForLanguage("hi"); // "Deva" (Devanagari)
getScriptForLanguage("ta"); // "Taml" (Tamil)
getScriptForLanguage("bn"); // "Beng" (Bengali)

// Handle multi-script languages
getAllScriptsForLanguage("pa"); // ["Guru", "Arab"]
getAllScriptsForLanguage("ks"); // ["Arab", "Deva"]

// Check if language is Indic
isIndicLanguage("hi"); // true
isIndicLanguage("en"); // false

// Get text direction
getScriptDirection("Deva"); // "ltr"
getScriptDirection("Arab"); // "rtl"

// Check for native numerals
hasNativeNumerals("Deva"); // true (०१२३...)
hasNativeNumerals("Beng"); // true (০১২৩...)
```

### 2. Native Numeral Conversion

Convert between Western Arabic numerals and native Indic numerals:

```typescript
import {
  toNativeNumerals,
  fromNativeNumerals,
} from "@lingo-indica.dev/_locales";

// Convert TO native numerals
toNativeNumerals(123, "hi");   // "१२३" (Hindi/Devanagari)
toNativeNumerals(456, "bn");   // "৪৫৬" (Bengali)
toNativeNumerals(789, "ta");   // "௭௮௯" (Tamil)
toNativeNumerals(100, "gu");   // "૧૦૦" (Gujarati)
toNativeNumerals(42, "te");    // "౪౨" (Telugu)
toNativeNumerals(99, "kn");    // "೯೯" (Kannada)
toNativeNumerals(77, "ml");    // "൭൭" (Malayalam)

// Convert FROM native numerals
fromNativeNumerals("१२३", "hi");  // "123"
fromNativeNumerals("৪৫৬", "bn");  // "456"
fromNativeNumerals("௭௮௯", "ta");  // "789"
```

### 3. Indian Numbering System

Format numbers using the Indian numbering system (lakhs and crores):

```typescript
import {
  formatIndianNumber,
  formatLakhs,
  formatCrores,
  autoFormatIndianNumber,
} from "@lingo-indica.dev/_locales";

// Standard Indian number formatting
formatIndianNumber(1000);        // "1,000"
formatIndianNumber(100000);      // "1,00,000" (1 lakh)
formatIndianNumber(10000000);    // "1,00,00,000" (1 crore)
formatIndianNumber(123456789);   // "12,34,56,789"

// With native digits
formatIndianNumber(100000, true, "hi");  // "१,००,०००"

// Lakh formatting
formatLakhs(100000);      // "1.00 lakh"
formatLakhs(250000);      // "2.50 lakhs"
formatLakhs(1500000);     // "15.00 lakhs"
formatLakhs(100000, 0);   // "1 lakh" (no decimals)

// Crore formatting
formatCrores(10000000);   // "1.00 crore"
formatCrores(25000000);   // "2.50 crores"
formatCrores(150000000);  // "15.00 crores"

// Auto-format based on magnitude
autoFormatIndianNumber(50000);      // "50,000"
autoFormatIndianNumber(500000);     // "5.00 lakhs"
autoFormatIndianNumber(50000000);   // "5.00 crores"
```

### 4. Indian Date Formatting

Format dates according to Indian conventions:

```typescript
import { formatIndianDate } from "@lingo-indica.dev/_locales";

const date = new Date(2025, 9, 10); // October 10, 2025

// Default DD-MM-YYYY format (Indian standard)
formatIndianDate(date);
// "10-10-2025"

// Alternative formats
formatIndianDate(date, { format: "YYYY-MM-DD" });
// "2025-10-10"

formatIndianDate(date, { format: "MM-DD-YYYY" });
// "10-10-2025"

// Custom separator
formatIndianDate(date, { separator: "/" });
// "10/10/2025"

// With native digits
formatIndianDate(date, {
  useNativeDigits: true,
  languageCode: "hi",
});
// "१०-१०-२०२५"

formatIndianDate(date, {
  useNativeDigits: true,
  languageCode: "bn",
  separator: "/",
});
// "১০/১০/২০২৫"
```

## Supported Scripts

The following Indic scripts are fully supported:

| Script Code | Script Name | Languages | Direction | Native Numerals |
|------------|-------------|-----------|-----------|-----------------|
| `Deva` | Devanagari | Hindi, Marathi, Sanskrit, Nepali, Konkani, Maithili, Dogri, Bodo | LTR | ०१२३४५६७८९ |
| `Beng` | Bengali | Bengali, Assamese, Manipuri | LTR | ০১২৩৪৫৬৭৮৯ |
| `Guru` | Gurmukhi | Punjabi | LTR | ੦੧੨੩੪੫੬੭੮੯ |
| `Gujr` | Gujarati | Gujarati | LTR | ૦૧૨૩૪૫૬૭૮૯ |
| `Orya` | Odia | Odia | LTR | ୦୧୨୩୪୫୬୭୮୯ |
| `Taml` | Tamil | Tamil | LTR | ௦௧௨௩௪௫௬௭௮௯ |
| `Telu` | Telugu | Telugu | LTR | ౦౧౨౩౪౫౬౭౮౯ |
| `Knda` | Kannada | Kannada | LTR | ೦೧೨೩೪೫೬೭೮೯ |
| `Mlym` | Malayalam | Malayalam | LTR | ൦൧൨൩൪൫൬൭൮൯ |
| `Mtei` | Meitei Mayek | Manipuri | LTR | ꯰꯱꯲꯳꯴꯵꯶꯷꯸꯹ |
| `Olck` | Ol Chiki | Santhali | LTR | ᱐᱑᱒᱓᱔᱕᱖᱗᱘᱙ |
| `Arab` | Arabic | Urdu, Kashmiri, Sindhi, Punjabi | RTL | ٠١٢٣٤٥٦٧٨٩ |

## Multi-Script Language Support

Some Indian languages can be written in multiple scripts. The package handles these intelligently:

- **Punjabi** (pa): Gurmukhi (India) or Arabic/Shahmukhi (Pakistan)
- **Kashmiri** (ks): Arabic or Devanagari
- **Sindhi** (sd): Arabic or Devanagari
- **Manipuri** (mni): Bengali or Meitei Mayek

```typescript
// Get all possible scripts
getAllScriptsForLanguage("pa");  // ["Guru", "Arab"]
getAllScriptsForLanguage("ks");  // ["Arab", "Deva"]

// Get primary script (first in list)
getScriptForLanguage("pa");  // "Guru"
```

## Indian Numbering System

Unlike the Western system which groups by thousands (1,000,000), the Indian system uses:

- **Lakh**: 100,000 (written as 1,00,000)
- **Crore**: 10,000,000 (written as 1,00,00,000)

Grouping pattern: After the first three digits from the right, subsequent groups are in pairs.

| Western | Indian | In Words |
|---------|--------|----------|
| 1,000 | 1,000 | One thousand |
| 10,000 | 10,000 | Ten thousand |
| 100,000 | 1,00,000 | One lakh |
| 1,000,000 | 10,00,000 | Ten lakhs |
| 10,000,000 | 1,00,00,000 | One crore |
| 100,000,000 | 10,00,00,000 | Ten crores |
| 1,000,000,000 | 1,00,00,00,000 | One hundred crores |

## Usage Examples

### Complete Example: Hindi Application

```typescript
import {
  getScriptForLanguage,
  toNativeNumerals,
  formatIndianNumber,
  formatIndianDate,
  autoFormatIndianNumber,
} from "@lingo-indica.dev/_locales";

const lang = "hi";
const script = getScriptForLanguage(lang); // "Deva"

// Display numbers in Hindi
const price = 125000;
const formattedPrice = formatIndianNumber(price, true, lang);
// "१,२५,०००"

// Auto-format with units
const salary = 1500000;
const displaySalary = autoFormatIndianNumber(salary, true, lang);
// "१५.०० lakhs"

// Format dates
const today = new Date();
const indianDate = formatIndianDate(today, {
  useNativeDigits: true,
  languageCode: lang,
});
// "१०-१०-२०२५" (if today is Oct 10, 2025)
```

### Complete Example: Bengali Application

```typescript
const lang = "bn";

// Bengali numerals
const population = 170000000;
console.log(autoFormatIndianNumber(population, true, lang));
// "১৭.০০ crores"

// Bengali date
const date = new Date(2025, 3, 15); // April 15, 2025
console.log(formatIndianDate(date, {
  useNativeDigits: true,
  languageCode: lang,
  separator: "/",
}));
// "১৫/০৪/২০২৫"
```

## Type Safety

All utilities are fully typed with TypeScript:

```typescript
import type {
  IndicScriptCode,
  IndicScriptInfo,
  IndianDateFormatOptions,
} from "@lingo-indica.dev/_locales";

const scriptCode: IndicScriptCode = "Deva";
const scriptInfo: IndicScriptInfo = INDIC_SCRIPT_INFO[scriptCode];

const dateOptions: IndianDateFormatOptions = {
  format: "DD-MM-YYYY",
  useNativeDigits: true,
  languageCode: "hi",
  separator: "-",
};
```

## Testing

The package includes comprehensive test coverage (164+ tests) for:

- ✅ Script detection and validation
- ✅ Native numeral conversion (all scripts)
- ✅ Indian number formatting (lakhs/crores)
- ✅ Date formatting (all formats)
- ✅ Multi-script language handling
- ✅ Edge cases and error handling

Run tests:

```bash
pnpm test
```

## Resources

- [W3C India Language Enablement](https://w3c.github.io/iip/)
- [AI4Bharat IndicTrans2](https://github.com/AI4Bharat/IndicTrans2)
- [Indic NLP Library](https://anoopkunchukuttan.github.io/indic_nlp_library/)
- [ISO 15924 Script Codes](https://unicode.org/iso15924/)
- [ISO 639 Language Codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)

## Future Enhancements

Planned features for future releases:

- [ ] Transliteration between Indic scripts (Sanscript.js integration)
- [ ] ICU MessageFormat pluralization rules
- [ ] Collation (sorting) for Indic scripts
- [ ] Text segmentation and word breaking
- [ ] Calendar systems (Hindu, Islamic calendars)
- [ ] Currency formatting (Indian Rupee ₹)
