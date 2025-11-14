// Export types
export type { LocaleComponents, LocaleDelimiter, ParseResult } from "./types";

// Export constants
export { LOCALE_REGEX } from "./constants";

// Export parsing functions
export {
  parseLocale,
  parseLocaleWithDetails,
  getLanguageCode,
  getScriptCode,
  getRegionCode,
} from "./parser";

// Export validation functions
export {
  isValidLocale,
  isValidLanguageCode,
  isValidScriptCode,
  isValidRegionCode,
} from "./validation";

// Export async name resolution functions
export { getCountryName, getLanguageName, getScriptName } from "./names";

// Export Indic script utilities
export {
  INDIC_SCRIPTS,
  INDIC_SCRIPT_INFO,
  LANGUAGE_TO_SCRIPT_MAP,
  getScriptForLanguage,
  getAllScriptsForLanguage,
  isIndicLanguage,
  getScriptDirection,
  hasNativeNumerals,
  getIndicScriptName,
} from "./indic-scripts";
export type { IndicScriptCode, IndicScriptInfo } from "./indic-scripts";

// Export Indic formatting utilities
export {
  toNativeNumerals,
  fromNativeNumerals,
  formatIndianNumber,
  formatLakhs,
  formatCrores,
  formatIndianDate,
  autoFormatIndianNumber,
} from "./formatting/indic";
export type { IndianDateFormatOptions } from "./formatting/indic";
