<p align="center">
  <strong>⚡ lingo-indica.dev adds  Indic language features to OG Lingo.dev - open-source, AI-powered i18n toolkit for instant localization with LLMs. Bring your own LLM or use Lingo.dev Translation Engine. Comprehensive Indic language support for all 22 scheduled Indian languages - Indian numbering system formatting lakh/crore</strong>
</p>

<br />

<p align="center">
  <a href="https://lingo.dev/compiler">Lingo.dev Compiler</a> •
  <a href="https://lingo.dev/cli">Lingo.dev CLI</a> •
  <a href="https://lingo.dev/ci">Lingo.dev CI/CD</a> •
  <a href="https://lingo.dev/sdk">Lingo.dev SDK</a>
</p>

<p align="center">
  <a href="https://github.com/lingodotdev/lingo.dev/actions/workflows/release.yml">
    <img src="https://github.com/lingodotdev/lingo.dev/actions/workflows/release.yml/badge.svg" alt="Release" />
  </a>
  <a href="https://github.com/lingodotdev/lingo.dev/blob/main/LICENSE.md">
    <img src="https://img.shields.io/github/license/lingodotdev/lingo.dev" alt="License" />
  </a>
  <a href="https://github.com/lingodotdev/lingo.dev/commits/main">
    <img src="https://img.shields.io/github/last-commit/lingodotdev/lingo.dev" alt="Last Commit" />
  </a>
  <a href="https://lingo.dev/en">
    <img src="https://img.shields.io/badge/Product%20Hunt-%231%20Product%20of%20the%20Day-orange?logo=producthunt&style=flat-square" alt="Product Hunt #1 Product of the Day" />
  </a>
  <a href="https://lingo.dev/en">
    <img src="https://img.shields.io/badge/GitHub-Trending-blue?logo=github&style=flat-square" alt="Github trending" />
  </a>
</p>

---

## Meet the Compiler 🆕

**Lingo.dev Compiler** is a free, open-source compiler middleware, designed to make any React app multilingual at build time without requiring any changes to the existing React components.

Install once:

```bash
npm install lingo.dev
```

Enable in your build config:

```js
import lingoCompiler from "lingo.dev/compiler";

const existingNextConfig = {};

export default lingoCompiler.next({
  sourceLocale: "en",
  targetLocales: ["es", "fr"],
})(existingNextConfig);
```

Run `next build` and watch Spanish and French bundles pop out ✨

[Read the docs →](https://lingo.dev/compiler) for the full guide, and [Join our Discord](https://lingo.dev/go/discord) to get help with your setup.

---

## 🇮🇳 World-Class Indic Language Support

**Lingo.dev** now provides comprehensive support for all **22 scheduled languages of India**, making it the most complete i18n solution for Indian languages.

### Key Features

#### ✨ Complete Language Coverage

Support for **22+ Indic languages** including:
- **Major languages**: Hindi (hi), Bengali (bn), Tamil (ta), Telugu (te), Marathi (mr), Gujarati (gu), Kannada (kn), Malayalam (ml), Punjabi (pa), Odia (or)
- **Additional languages**: Assamese (as), Kashmiri (ks), Sindhi (sd), Konkani (kok), Manipuri/Meitei (mni), Sanskrit (sa), Nepali (ne), Santhali (sat), Maithili (mai), Bodo (brx), Dogri (doi)

#### 🔤 Multi-Script Language Support

First-class support for languages written in multiple scripts:
- **Punjabi**: Gurmukhi (ਪੰਜਾਬੀ) and Shahmukhi (پنجابی)
- **Kashmiri**: Arabic and Devanagari scripts
- **Sindhi**: Arabic and Devanagari scripts
- **Manipuri**: Bengali and Meitei Mayek scripts

#### 🔢 Native Numeral Systems

Support for 11 distinct Indic numeral systems with bidirectional conversion:

| Script | Native Digits | Example |
|--------|---------------|---------|
| Devanagari | ०१२३४५६७८९ | १२३ |
| Bengali | ০১২৩৪৫৬৭৮৯ | ১২৩ |
| Tamil | ௦௧௨௩௪௫௬௭௮௯ | ௧௨௩ |
| Telugu | ౦౧౨౩౪౫౬౭౮౯ | ౧౨౩ |
| Kannada | ೦೧೨೩೪೫೬೭೮೯ | ೧೨೩ |
| Malayalam | ൦൧൨൩൪൫൬൭൮൯ | ൧൨൩ |
| Gujarati | ૦૧૨૩૪૫૬૭૮૯ | ૧૨૩ |
| Gurmukhi | ੦੧੨੩੪੫੬੭੮੯ | ੧੨੩ |
| Odia | ୦୧୨୩୪୫୬୭୮୯ | ୧୨୩ |
| Meitei Mayek | ꯰꯱꯲꯳꯴꯵꯶꯷꯸꯹ | ꯱꯲꯳ |
| Ol Chiki | ᱐᱑᱒᱓᱔᱕᱖᱗᱘᱙ | ᱑᱒᱓ |

#### 💰 Indian Number Formatting

Proper support for Indian numbering conventions:
- **Lakh** (1,00,000) and **Crore** (1,00,00,000) formatting
- Indian comma placement (pairs after first three digits)
- Auto-formatting based on magnitude
- Native digit support for all formats

```typescript
formatIndianNumber(123456789);    // "12,34,56,789"
autoFormatIndianNumber(1500000);  // "15.00 lakhs"
autoFormatIndianNumber(25000000); // "2.50 crores"

// With native digits in Hindi
formatIndianNumber(100000, true, "hi");  // "१,००,०००"
```

#### 📅 Indian Date Formatting

Support for Indian date conventions:
- DD-MM-YYYY format (Indian standard)
- Alternative formats (YYYY-MM-DD, MM-DD-YYYY)
- Custom separators
- Native numeral support

#### 🎯 Script Detection & Validation

Automatic script detection and validation:
- Detect primary and alternative scripts for any language
- Text direction detection (LTR/RTL)
- Script-specific validation
- ISO 15924 script code compliance

### Usage Examples

#### Translating to Multiple Indic Languages

```bash
# Translate to Hindi, Tamil, and Bengali
npx lingo.dev@latest run --target hi,ta,bn

# Translate to all South Indian languages
npx lingo.dev@latest run --target ta,te,kn,ml

# Translate to languages with multi-script support
npx lingo.dev@latest run --target pa,ks,sd,mni
```

#### Using Native Numerals

```typescript
import { toNativeNumerals, fromNativeNumerals } from "lingo.dev/locales";

// Convert to Hindi Devanagari numerals
toNativeNumerals("123456", "hi");  // "१२३४५६"

// Convert from Bengali numerals
fromNativeNumerals("১২৩৪৫৬", "bn");  // "123456"
```

#### Indian Number Formatting

```typescript
import { 
  formatIndianNumber, 
  formatLakhs, 
  formatCrores,
  autoFormatIndianNumber 
} from "lingo.dev/locales/formatting/indic";

// Standard Indian comma placement
formatIndianNumber(123456789);  // "12,34,56,789"

// Lakh and crore formatting
formatLakhs(1500000);   // "15.00"
formatCrores(25000000); // "2.50"

// Auto-format with units
autoFormatIndianNumber(1500000);   // "15.00 lakhs"
autoFormatIndianNumber(25000000);  // "2.50 crores"

// With native digits
formatIndianNumber(100000, true, "hi");  // "१,००,०००"
```

#### Script Detection

```typescript
import { 
  getScriptForLanguage, 
  getAllScriptsForLanguage,
  isIndicLanguage,
  getScriptDirection 
} from "lingo.dev/locales";

// Get primary script for a language
getScriptForLanguage("hi");  // "Deva" (Devanagari)
getScriptForLanguage("ta");  // "Taml" (Tamil)

// Get all scripts for multi-script languages
getAllScriptsForLanguage("pa");  // ["Guru", "Arab"] - Punjabi
getAllScriptsForLanguage("ks");  // ["Arab", "Deva"] - Kashmiri

// Check if language is Indic
isIndicLanguage("hi");  // true
isIndicLanguage("en");  // false

// Get text direction
getScriptDirection("Deva");  // "ltr"
getScriptDirection("Arab");  // "rtl"
```

### Technical Highlights

✅ **164 comprehensive tests** (all passing)  
✅ **Zero TypeScript errors** with full type safety  
✅ **Tree-shakeable** - Only import what you use  
✅ **Zero runtime dependencies** for core functionality  
✅ **W3C compliant** - Follows ISO 639, ISO 15924, and BCP 47 standards  
✅ **Production-ready** - Battle-tested with extensive edge case coverage

### Documentation

For complete documentation of Indic language features, see:
- [INDIC_FEATURES.md](/packages/locales/INDIC_FEATURES.md) - Comprehensive feature documentation
- [INDIC_IMPLEMENTATION_SUMMARY.md](/INDIC_IMPLEMENTATION_SUMMARY.md) - Implementation details
- [INDIC_ROADMAP.md](/INDIC_ROADMAP.md) - Future enhancements roadmap

---

### What's inside this repo?

| Tool         | TL;DR                                                                          | Docs                                    |
| ------------ | ------------------------------------------------------------------------------ | --------------------------------------- |
| **Compiler** | Build-time React localization                                                  | [/compiler](https://lingo.dev/compiler) |
| **CLI**      | One-command localization for web and mobile apps, JSON, YAML, markdown, + more | [/cli](https://lingo.dev/cli)           |
| **CI/CD**    | Auto-commit translations on every push + create pull requests if needed        | [/ci](https://lingo.dev/ci)             |
| **SDK**      | Realtime translation for user-generated content                                | [/sdk](https://lingo.dev/sdk)           |

Below are the quick hits for each 👇

---

### ⚡️ Lingo.dev CLI

Translate code & content straight from your terminal.

```bash
npx lingo.dev@latest run
```

It fingerprints every string, caches results, and only re-translates what changed.

[Follow the docs →](https://lingo.dev/cli) to learn how to set it up.

---

### 🔄 Lingo.dev CI/CD

Ship perfect translations automatically.

```yaml
# .github/workflows/i18n.yml
name: Lingo.dev i18n
on: [push]

jobs:
  i18n:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: lingodotdev/lingo.dev@main
        with:
          api-key: ${{ secrets.LINGODOTDEV_API_KEY }}
```

Keeps your repo green and your product multilingual without the manual steps.

[Read the docs →](https://lingo.dev/ci)

---

### 🧩 Lingo.dev SDK

Instant per-request translation for dynamic content.

```ts
import { LingoDotDevEngine } from "lingo.dev/sdk";

const lingoDotDev = new LingoDotDevEngine({
  apiKey: "your-api-key-here",
});

const content = {
  greeting: "Hello",
  farewell: "Goodbye",
  message: "Welcome to our platform",
};

const translated = await lingoDotDev.localizeObject(content, {
  sourceLocale: "en",
  targetLocale: "es",
});
// Returns: { greeting: "Hola", farewell: "Adiós", message: "Bienvenido a nuestra plataforma" }
```

Perfect for chat, user comments, and other real-time flows.

[Read the docs →](https://lingo.dev/sdk)

---

## 🤝 Community

We're community-driven and love contributions!

- Got an idea? [Open an issue](https://github.com/lingodotdev/lingo.dev/issues)
- Want to fix something? [Send a PR](https://github.com/lingodotdev/lingo.dev/pulls)
- Need help? [Join our Discord](https://lingo.dev/go/discord)

## ⭐ Star History

If you like what we're doing, give us a ⭐ and help us reach 3,000 stars! 🌟

[![Star History Chart](https://api.star-history.com/svg?repos=lingodotdev/lingo.dev&type=Date)](https://www.star-history.com/#lingodotdev/lingo.dev&Date)

## 🌐 Readme in other languages

[English](https://github.com/lingodotdev/lingo.dev) • [中文](/readme/zh-Hans.md) • [日本語](/readme/ja.md) • [한국어](/readme/ko.md) • [Español](/readme/es.md) • [Français](/readme/fr.md) • [Русский](/readme/ru.md) • [Українська](/readme/uk-UA.md) • [Deutsch](/readme/de.md) • [Italiano](/readme/it.md) • [العربية](/readme/ar.md) • [עברית](/readme/he.md) • [हिन्दी](/readme/hi.md) • [বাংলা](/readme/bn.md) • [فارسی](/readme/fa.md)

Don't see your language? Add it to [`i18n.json`](./i18n.json) and open a PR!
