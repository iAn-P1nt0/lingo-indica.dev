# Extremely important instructions for Claude

## FYI

- We're in a pnpm + turbo monorepo

## Tools

- Must use `pnpm` as package manager

## Testing

- When you add tests - make sure they pass

## Indic Language Features - Incremental Enhancement Goals

### ✅ Completed (Phase 1-3)

- [x] Extended language support: All 22 scheduled Indian languages
- [x] Script-aware locale parsing and validation
- [x] Native numeral conversion for 11 Indic scripts
- [x] Indian numbering system (lakh/crore formatting)
- [x] Indian date formatting conventions
- [x] Comprehensive test coverage (164+ tests)

### 🎯 Next Priority Enhancements

#### Phase 4: Transliteration (HIGH PRIORITY)

**Goal:** Enable conversion between Indic scripts and romanization schemes

**Tasks:**
- [ ] Integrate Sanscript.js or equivalent transliteration library
- [ ] Implement bidirectional transliteration between Indic scripts
- [ ] Support romanization schemes (IAST, Harvard-Kyoto, ITRANS, ISO 15919)
- [ ] Add script-to-script conversion (e.g., Devanagari ↔ Bengali)
- [ ] Create `packages/locales/src/transliteration/` module
- [ ] Add 30+ tests for transliteration accuracy
- [ ] Document usage with examples

**Files to create:**
- `packages/locales/src/transliteration/sanscript.ts`
- `packages/locales/src/transliteration/schemes.ts`
- `packages/locales/src/transliteration/index.spec.ts`

#### Phase 5: ICU MessageFormat & Pluralization (MEDIUM PRIORITY)

**Goal:** Proper pluralization and gender handling for Indic languages

**Tasks:**
- [ ] Implement CLDR plural rules for Indic languages
- [ ] Add gender-specific translation support (Hindi, Bengali)
- [ ] Create ICU MessageFormat integration utilities
- [ ] Support context-aware interpolation
- [ ] Handle ordinal numbers (1st, 2nd, 3rd in Indic languages)
- [ ] Add 25+ tests for plural rules
- [ ] Document plural categories per language

**Files to create:**
- `packages/locales/src/plural-rules/indic.ts`
- `packages/locales/src/plural-rules/index.spec.ts`
- `packages/locales/src/icu/message-format.ts`

**Plural categories for Indic languages:**
- Most Indic languages: `one`, `other` (simple 2-category system)
- Special handling for Hindi gender-based variations

#### Phase 6: Enhanced Formatting (MEDIUM PRIORITY)

**Goal:** Currency, time, and advanced number formatting

**Tasks:**
- [ ] Indian Rupee (₹) currency formatting with native numerals
- [ ] Time formatting (12-hour vs 24-hour for Indian context)
- [ ] Compact number notation (1.5L, 2.5Cr abbreviations)
- [ ] Percentage formatting with native numerals
- [ ] Unit formatting (km, kg, etc. with Indic text)
- [ ] Add 20+ tests for formatting edge cases

**Files to create:**
- `packages/locales/src/formatting/currency.ts`
- `packages/locales/src/formatting/time.ts`
- `packages/locales/src/formatting/compact.ts`

#### Phase 7: Text Processing (LOWER PRIORITY)

**Goal:** Advanced text processing for Indic scripts

**Tasks:**
- [ ] Collation (alphabetical sorting) for Indic scripts
- [ ] Text segmentation (word/sentence boundaries)
- [ ] Unicode normalization for Indic characters
- [ ] Handle combining characters and diacritics
- [ ] Syllable breaking for Indic scripts
- [ ] Add 15+ tests for text processing

**Files to create:**
- `packages/locales/src/text-processing/collation.ts`
- `packages/locales/src/text-processing/segmentation.ts`
- `packages/locales/src/text-processing/normalization.ts`

### 📝 Development Guidelines

**When working on Indic features:**

1. **Research First:** Check W3C IIP, CLDR, and AI4Bharat resources
2. **Test Coverage:** Aim for 90%+ coverage, test all 22 languages where applicable
3. **Type Safety:** Full TypeScript typing with proper exports
4. **Documentation:** Update INDIC_FEATURES.md with each enhancement
5. **Examples:** Add practical examples to `examples/indic-demo.ts`
6. **Performance:** Keep utilities lightweight and tree-shakeable
7. **Standards:** Follow ISO, W3C, and Unicode CLDR standards

**Testing checklist:**
- [ ] All existing tests still pass
- [ ] New features have comprehensive test coverage
- [ ] Edge cases covered (empty strings, invalid inputs, etc.)
- [ ] Multi-script languages tested
- [ ] Type checking passes with zero errors
- [ ] Build succeeds for all affected packages

**Before committing:**
```bash
# Run these commands to verify quality
pnpm --filter @lingo.dev/_spec typecheck
pnpm --filter @lingo.dev/_locales typecheck
pnpm --filter @lingo.dev/_spec test
pnpm --filter @lingo.dev/_locales test
pnpm --filter @lingo.dev/_spec build
pnpm --filter @lingo.dev/_locales build
```

### 📚 Key Resources

- **W3C IIP:** https://w3c.github.io/iip/
- **CLDR Plural Rules:** https://www.unicode.org/cldr/charts/42/supplemental/language_plural_rules.html
- **Sanscript.js:** https://github.com/indic-transliteration/sanscript.js
- **AI4Bharat:** https://github.com/AI4Bharat/IndicTrans2
- **ICU MessageFormat:** https://unicode-org.github.io/icu/userguide/format_parse/messages/

### 🎯 Success Metrics

**Quality targets for each phase:**
- ✅ Zero TypeScript errors
- ✅ 90%+ test coverage
- ✅ All builds passing
- ✅ Documentation complete with examples
- ✅ Performance benchmarks (if applicable)
- ✅ Backward compatibility maintained