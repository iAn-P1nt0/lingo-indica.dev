/**
 * Indic-specific formatting utilities for numbers, dates, and currency
 *
 * This module provides formatting helpers that respect Indic language conventions,
 * including native numeral systems, Indian numbering (lakh/crore), and date formats.
 */

import { getScriptForLanguage, hasNativeNumerals } from "../indic-scripts";

/**
 * Digit mappings for Indic scripts
 */
const NATIVE_DIGITS: Record<string, string[]> = {
  // Devanagari (Hindi, Marathi, Sanskrit, Nepali)
  Deva: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"],
  // Bengali (Bengali, Assamese)
  Beng: ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"],
  // Gurmukhi (Punjabi)
  Guru: ["੦", "੧", "੨", "੩", "੪", "੫", "੬", "੭", "੮", "੯"],
  // Gujarati
  Gujr: ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"],
  // Odia
  Orya: ["୦", "୧", "୨", "୩", "୪", "୫", "୬", "୭", "୮", "୯"],
  // Tamil
  Taml: ["௦", "௧", "௨", "௩", "௪", "௫", "௬", "௭", "௮", "௯"],
  // Telugu
  Telu: ["౦", "౧", "౨", "౩", "౪", "౫", "౬", "౭", "౮", "౯"],
  // Kannada
  Knda: ["೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯"],
  // Malayalam
  Mlym: ["൦", "൧", "൨", "൩", "൪", "൫", "൬", "൭", "൮", "൯"],
  // Meitei Mayek (Manipuri)
  Mtei: ["꯰", "꯱", "꯲", "꯳", "꯴", "꯵", "꯶", "꯷", "꯸", "꯹"],
  // Ol Chiki (Santhali)
  Olck: ["᱐", "᱑", "᱒", "᱓", "᱔", "᱕", "᱖", "᱗", "᱘", "᱙"],
};

/**
 * Converts Western Arabic numerals to native Indic script numerals
 *
 * @param number - Number or string containing digits to convert
 * @param languageCode - ISO 639-1/2 language code
 * @returns String with native numerals
 *
 * @example
 * ```typescript
 * toNativeNumerals(123, "hi");    // "१२३"
 * toNativeNumerals(456, "bn");    // "৪৫৬"
 * toNativeNumerals(789, "ta");    // "௭௮௯"
 * toNativeNumerals(100, "en");    // "100" (unchanged)
 * ```
 */
export function toNativeNumerals(
  number: number | string,
  languageCode: string
): string {
  const scriptCode = getScriptForLanguage(languageCode);

  if (!scriptCode || !hasNativeNumerals(scriptCode)) {
    return String(number);
  }

  const digits = NATIVE_DIGITS[scriptCode];
  if (!digits) {
    return String(number);
  }

  return String(number).replace(/\d/g, (digit) => digits[parseInt(digit, 10)]);
}

/**
 * Converts native Indic numerals back to Western Arabic numerals
 *
 * @param text - String containing native numerals
 * @param languageCode - ISO 639-1/2 language code
 * @returns String with Western Arabic numerals
 *
 * @example
 * ```typescript
 * fromNativeNumerals("१२३", "hi");  // "123"
 * fromNativeNumerals("৪৫৬", "bn");  // "456"
 * fromNativeNumerals("௭௮௯", "ta");  // "789"
 * ```
 */
export function fromNativeNumerals(
  text: string,
  languageCode: string
): string {
  const scriptCode = getScriptForLanguage(languageCode);

  if (!scriptCode || !hasNativeNumerals(scriptCode)) {
    return text;
  }

  const digits = NATIVE_DIGITS[scriptCode];
  if (!digits) {
    return text;
  }

  let result = text;
  digits.forEach((nativeDigit, index) => {
    result = result.replace(new RegExp(nativeDigit, 'g'), String(index));
  });

  return result;
}

/**
 * Formats a number according to Indian numbering system (lakhs and crores)
 *
 * The Indian numbering system groups digits differently than Western systems:
 * - Western: 10,000,000 (10 million)
 * - Indian: 1,00,00,000 (1 crore)
 *
 * @param number - Number to format
 * @param useNativeDigits - Whether to use native script digits
 * @param languageCode - ISO 639-1/2 language code (required if useNativeDigits is true)
 * @returns Formatted number string
 *
 * @example
 * ```typescript
 * formatIndianNumber(1000);              // "1,000"
 * formatIndianNumber(100000);            // "1,00,000" (1 lakh)
 * formatIndianNumber(10000000);          // "1,00,00,000" (1 crore)
 * formatIndianNumber(123456789);         // "12,34,56,789"
 * formatIndianNumber(1000, true, "hi");  // "१,०००"
 * ```
 */
export function formatIndianNumber(
  number: number,
  useNativeDigits = false,
  languageCode?: string
): string {
  const numStr = String(Math.abs(number));
  const isNegative = number < 0;

  // For numbers less than 1000, no special formatting needed
  if (numStr.length <= 3) {
    const formatted = numStr;
    const result = isNegative ? `-${formatted}` : formatted;
    return useNativeDigits && languageCode
      ? toNativeNumerals(result, languageCode)
      : result;
  }

  // Split into last 3 digits and the rest
  const lastThree = numStr.slice(-3);
  const remaining = numStr.slice(0, -3);

  // Group remaining digits in pairs from right to left
  const pairs: string[] = [];
  for (let i = remaining.length; i > 0; i -= 2) {
    pairs.unshift(remaining.slice(Math.max(0, i - 2), i));
  }

  // Join with commas
  const formatted = `${pairs.join(",")},${lastThree}`;
  const result = isNegative ? `-${formatted}` : formatted;

  return useNativeDigits && languageCode
    ? toNativeNumerals(result, languageCode)
    : result;
}

/**
 * Formats a number in lakhs
 *
 * @param number - Number to format
 * @param decimals - Number of decimal places (default: 2)
 * @param useNativeDigits - Whether to use native script digits
 * @param languageCode - ISO 639-1/2 language code
 * @returns Formatted string with "lakh" suffix
 *
 * @example
 * ```typescript
 * formatLakhs(100000);          // "1.00 lakh"
 * formatLakhs(250000);          // "2.50 lakhs"
 * formatLakhs(1500000);         // "15.00 lakhs"
 * formatLakhs(100000, 0);       // "1 lakh"
 * ```
 */
export function formatLakhs(
  number: number,
  decimals = 2,
  useNativeDigits = false,
  languageCode?: string
): string {
  const lakhs = number / 100000;
  const formatted = lakhs.toFixed(decimals);
  const suffix = Math.abs(lakhs - 1) < 0.0001 ? "lakh" : "lakhs";

  const result = `${formatted} ${suffix}`;
  return useNativeDigits && languageCode
    ? toNativeNumerals(result, languageCode)
    : result;
}

/**
 * Formats a number in crores
 *
 * @param number - Number to format
 * @param decimals - Number of decimal places (default: 2)
 * @param useNativeDigits - Whether to use native script digits
 * @param languageCode - ISO 639-1/2 language code
 * @returns Formatted string with "crore" suffix
 *
 * @example
 * ```typescript
 * formatCrores(10000000);       // "1.00 crore"
 * formatCrores(25000000);       // "2.50 crores"
 * formatCrores(150000000);      // "15.00 crores"
 * formatCrores(10000000, 0);    // "1 crore"
 * ```
 */
export function formatCrores(
  number: number,
  decimals = 2,
  useNativeDigits = false,
  languageCode?: string
): string {
  const crores = number / 10000000;
  const formatted = crores.toFixed(decimals);
  const suffix = Math.abs(crores - 1) < 0.0001 ? "crore" : "crores";

  const result = `${formatted} ${suffix}`;
  return useNativeDigits && languageCode
    ? toNativeNumerals(result, languageCode)
    : result;
}

/**
 * Date format options for Indian locales
 */
export interface IndianDateFormatOptions {
  /** Use DD-MM-YYYY format (default for India) */
  format?: "DD-MM-YYYY" | "YYYY-MM-DD" | "MM-DD-YYYY";
  /** Use native script for digits */
  useNativeDigits?: boolean;
  /** Language code for native digits */
  languageCode?: string;
  /** Separator character (default: "-") */
  separator?: string;
}

/**
 * Formats a date according to Indian conventions
 *
 * Default format is DD-MM-YYYY which is the standard in India
 *
 * @param date - Date to format
 * @param options - Formatting options
 * @returns Formatted date string
 *
 * @example
 * ```typescript
 * const date = new Date(2025, 9, 10); // Oct 10, 2025
 *
 * formatIndianDate(date);
 * // "10-10-2025"
 *
 * formatIndianDate(date, { format: "YYYY-MM-DD" });
 * // "2025-10-10"
 *
 * formatIndianDate(date, { useNativeDigits: true, languageCode: "hi" });
 * // "१०-१०-२०२५"
 *
 * formatIndianDate(date, { separator: "/" });
 * // "10/10/2025"
 * ```
 */
export function formatIndianDate(
  date: Date,
  options: IndianDateFormatOptions = {}
): string {
  const {
    format = "DD-MM-YYYY",
    useNativeDigits = false,
    languageCode,
    separator = "-",
  } = options;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  let formatted: string;
  switch (format) {
    case "YYYY-MM-DD":
      formatted = `${year}${separator}${month}${separator}${day}`;
      break;
    case "MM-DD-YYYY":
      formatted = `${month}${separator}${day}${separator}${year}`;
      break;
    case "DD-MM-YYYY":
    default:
      formatted = `${day}${separator}${month}${separator}${year}`;
      break;
  }

  return useNativeDigits && languageCode
    ? toNativeNumerals(formatted, languageCode)
    : formatted;
}

/**
 * Auto-formats a number based on magnitude using Indian numbering system
 *
 * @param number - Number to format
 * @param useNativeDigits - Whether to use native script digits
 * @param languageCode - ISO 639-1/2 language code
 * @returns Formatted string with appropriate unit
 *
 * @example
 * ```typescript
 * autoFormatIndianNumber(1000);        // "1,000"
 * autoFormatIndianNumber(100000);      // "1.00 lakh"
 * autoFormatIndianNumber(10000000);    // "1.00 crore"
 * autoFormatIndianNumber(1500000);     // "15.00 lakhs"
 * ```
 */
export function autoFormatIndianNumber(
  number: number,
  useNativeDigits = false,
  languageCode?: string
): string {
  const absNumber = Math.abs(number);

  if (absNumber >= 10000000) {
    // 1 crore or more
    return formatCrores(number, 2, useNativeDigits, languageCode);
  } else if (absNumber >= 100000) {
    // 1 lakh or more
    return formatLakhs(number, 2, useNativeDigits, languageCode);
  } else {
    // Less than 1 lakh
    return formatIndianNumber(number, useNativeDigits, languageCode);
  }
}
