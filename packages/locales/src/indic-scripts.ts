/**
 * Indic script utilities and mappings
 *
 * This module provides information about Indic writing scripts, their properties,
 * and relationships with languages.
 */

/**
 * Indic script codes based on ISO 15924
 */
export const INDIC_SCRIPTS = {
  Deva: "Devanagari", // Hindi, Marathi, Sanskrit, Nepali, Konkani
  Beng: "Bengali", // Bengali, Assamese, Manipuri
  Guru: "Gurmukhi", // Punjabi
  Gujr: "Gujarati", // Gujarati
  Orya: "Odia", // Odia
  Taml: "Tamil", // Tamil
  Telu: "Telugu", // Telugu
  Knda: "Kannada", // Kannada
  Mlym: "Malayalam", // Malayalam
  Sinh: "Sinhala", // Sinhala
  Mtei: "Meitei Mayek", // Manipuri
  Olck: "Ol Chiki", // Santhali
  Arab: "Arabic", // Urdu, Kashmiri, Sindhi
  Latn: "Latin", // Romanization
} as const;

export type IndicScriptCode = keyof typeof INDIC_SCRIPTS;

/**
 * Mapping of Indic languages to their primary scripts
 */
export const LANGUAGE_TO_SCRIPT_MAP: Record<
  string,
  IndicScriptCode | IndicScriptCode[]
> = {
  hi: "Deva", // Hindi - Devanagari
  mr: "Deva", // Marathi - Devanagari
  sa: "Deva", // Sanskrit - Devanagari
  ne: "Deva", // Nepali - Devanagari
  kok: "Deva", // Konkani - Devanagari
  mai: "Deva", // Maithili - Devanagari
  doi: "Deva", // Dogri - Devanagari
  bn: "Beng", // Bengali - Bengali script
  as: "Beng", // Assamese - Bengali script
  pa: ["Guru", "Arab"], // Punjabi - Gurmukhi (India) or Arabic (Pakistan)
  gu: "Gujr", // Gujarati - Gujarati script
  or: "Orya", // Odia - Odia script
  ta: "Taml", // Tamil - Tamil script
  te: "Telu", // Telugu - Telugu script
  kn: "Knda", // Kannada - Kannada script
  ml: "Mlym", // Malayalam - Malayalam script
  mni: ["Beng", "Mtei"], // Manipuri - Bengali or Meitei Mayek
  sat: "Olck", // Santhali - Ol Chiki
  ks: ["Arab", "Deva"], // Kashmiri - Arabic or Devanagari
  sd: ["Arab", "Deva"], // Sindhi - Arabic or Devanagari
  ur: "Arab", // Urdu - Arabic script
  brx: "Deva", // Bodo - Devanagari
};

/**
 * Properties of Indic scripts
 */
export interface IndicScriptInfo {
  code: IndicScriptCode;
  name: string;
  direction: "ltr" | "rtl";
  hasNativeNumerals: boolean;
  languages: string[];
}

/**
 * Detailed information about each Indic script
 */
export const INDIC_SCRIPT_INFO: Record<IndicScriptCode, IndicScriptInfo> = {
  Deva: {
    code: "Deva",
    name: "Devanagari",
    direction: "ltr",
    hasNativeNumerals: true,
    languages: ["hi", "mr", "sa", "ne", "kok", "mai", "doi", "brx"],
  },
  Beng: {
    code: "Beng",
    name: "Bengali",
    direction: "ltr",
    hasNativeNumerals: true,
    languages: ["bn", "as", "mni"],
  },
  Guru: {
    code: "Guru",
    name: "Gurmukhi",
    direction: "ltr",
    hasNativeNumerals: true,
    languages: ["pa"],
  },
  Gujr: {
    code: "Gujr",
    name: "Gujarati",
    direction: "ltr",
    hasNativeNumerals: true,
    languages: ["gu"],
  },
  Orya: {
    code: "Orya",
    name: "Odia",
    direction: "ltr",
    hasNativeNumerals: true,
    languages: ["or"],
  },
  Taml: {
    code: "Taml",
    name: "Tamil",
    direction: "ltr",
    hasNativeNumerals: true,
    languages: ["ta"],
  },
  Telu: {
    code: "Telu",
    name: "Telugu",
    direction: "ltr",
    hasNativeNumerals: true,
    languages: ["te"],
  },
  Knda: {
    code: "Knda",
    name: "Kannada",
    direction: "ltr",
    hasNativeNumerals: true,
    languages: ["kn"],
  },
  Mlym: {
    code: "Mlym",
    name: "Malayalam",
    direction: "ltr",
    hasNativeNumerals: true,
    languages: ["ml"],
  },
  Sinh: {
    code: "Sinh",
    name: "Sinhala",
    direction: "ltr",
    hasNativeNumerals: true,
    languages: ["si"],
  },
  Mtei: {
    code: "Mtei",
    name: "Meitei Mayek",
    direction: "ltr",
    hasNativeNumerals: true,
    languages: ["mni"],
  },
  Olck: {
    code: "Olck",
    name: "Ol Chiki",
    direction: "ltr",
    hasNativeNumerals: true,
    languages: ["sat"],
  },
  Arab: {
    code: "Arab",
    name: "Arabic",
    direction: "rtl",
    hasNativeNumerals: true,
    languages: ["ur", "ks", "sd", "pa"],
  },
  Latn: {
    code: "Latn",
    name: "Latin",
    direction: "ltr",
    hasNativeNumerals: false,
    languages: [], // Used for romanization
  },
};

/**
 * Determines the primary script for a given language code
 *
 * @param languageCode - ISO 639-1/2 language code
 * @returns The primary script code for the language, or null if not Indic
 *
 * @example
 * ```typescript
 * getScriptForLanguage("hi");  // "Deva"
 * getScriptForLanguage("bn");  // "Beng"
 * getScriptForLanguage("ta");  // "Taml"
 * getScriptForLanguage("pa");  // "Guru" (primary)
 * getScriptForLanguage("en");  // null
 * ```
 */
export function getScriptForLanguage(
  languageCode: string
): IndicScriptCode | null {
  const scripts = LANGUAGE_TO_SCRIPT_MAP[languageCode];
  if (!scripts) {
    return null;
  }
  // Return the first script if multiple are available
  return Array.isArray(scripts) ? scripts[0] : scripts;
}

/**
 * Gets all possible scripts for a language (for multi-script languages)
 *
 * @param languageCode - ISO 639-1/2 language code
 * @returns Array of possible script codes
 *
 * @example
 * ```typescript
 * getAllScriptsForLanguage("pa");  // ["Guru", "Arab"]
 * getAllScriptsForLanguage("hi");  // ["Deva"]
 * getAllScriptsForLanguage("en");  // []
 * ```
 */
export function getAllScriptsForLanguage(
  languageCode: string
): IndicScriptCode[] {
  const scripts = LANGUAGE_TO_SCRIPT_MAP[languageCode];
  if (!scripts) {
    return [];
  }
  return Array.isArray(scripts) ? scripts : [scripts];
}

/**
 * Checks if a language uses an Indic script
 *
 * @param languageCode - ISO 639-1/2 language code
 * @returns true if the language uses an Indic script
 *
 * @example
 * ```typescript
 * isIndicLanguage("hi");   // true
 * isIndicLanguage("ta");   // true
 * isIndicLanguage("en");   // false
 * isIndicLanguage("fr");   // false
 * ```
 */
export function isIndicLanguage(languageCode: string): boolean {
  return languageCode in LANGUAGE_TO_SCRIPT_MAP;
}

/**
 * Gets the text direction for a script.
 *
 * If the script information is not found, defaults to "ltr".
 *
 * @param scriptCode - ISO 15924 script code
 * @returns "ltr" or "rtl" (defaults to "ltr" if script info is missing)
 *
 * @example
 * ```typescript
 * getScriptDirection("Deva");  // "ltr"
 * getScriptDirection("Arab");  // "rtl"
 * ```
 */
export function getScriptDirection(
  scriptCode: IndicScriptCode
): "ltr" | "rtl" {
  return INDIC_SCRIPT_INFO[scriptCode]?.direction || "ltr";
}

/**
 * Checks if a script has native numerals
 *
 * @param scriptCode - ISO 15924 script code
 * @returns true if the script has its own numeral system; returns false if script information is not found
 *
 * @example
 * ```typescript
 * hasNativeNumerals("Deva");  // true (०१२३...)
 * hasNativeNumerals("Beng");  // true (০১২৩...)
 * hasNativeNumerals("Latn");  // false
 * ```
 */
export function hasNativeNumerals(scriptCode: IndicScriptCode): boolean {
  return INDIC_SCRIPT_INFO[scriptCode]?.hasNativeNumerals || false;
}
/**
 * Gets the Indic script name
 *
 * @param scriptCode - ISO 15924 script code
 * @returns The name of the script, or the script code itself if script information is not found
 *
 * @example
 * ```typescript
 * getIndicScriptName("Deva");  // "Devanagari"
 * getIndicScriptName("Beng");  // "Bengali"
 * getIndicScriptName("Unknown");  // "Unknown"
 * ```
 */
export function getIndicScriptName(scriptCode: IndicScriptCode): string {
  return INDIC_SCRIPT_INFO[scriptCode]?.name || scriptCode;
}
