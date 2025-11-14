import { describe, it, expect } from "vitest";
import {
  toNativeNumerals,
  fromNativeNumerals,
  formatIndianNumber,
  formatLakhs,
  formatCrores,
  formatIndianDate,
  autoFormatIndianNumber,
} from "./indic";

describe("Indic Formatting", () => {
  describe("toNativeNumerals", () => {
    it("should convert to Devanagari numerals for Hindi", () => {
      expect(toNativeNumerals(123, "hi")).toBe("१२३");
      expect(toNativeNumerals(456, "hi")).toBe("४५६");
      expect(toNativeNumerals(789, "hi")).toBe("७८९");
      expect(toNativeNumerals(0, "hi")).toBe("०");
    });

    it("should convert to Bengali numerals", () => {
      expect(toNativeNumerals(123, "bn")).toBe("১২৩");
      expect(toNativeNumerals(456, "bn")).toBe("৪৫৬");
    });

    it("should convert to Tamil numerals", () => {
      expect(toNativeNumerals(123, "ta")).toBe("௧௨௩");
      expect(toNativeNumerals(0, "ta")).toBe("௦");
    });

    it("should handle string input", () => {
      expect(toNativeNumerals("123", "hi")).toBe("१२३");
    });

    it("should return unchanged for non-Indic languages", () => {
      expect(toNativeNumerals(123, "en")).toBe("123");
      expect(toNativeNumerals(456, "fr")).toBe("456");
    });

    it("should work for all major Indic languages", () => {
      expect(toNativeNumerals(5, "hi")).toBe("५"); // Hindi (Devanagari)
      expect(toNativeNumerals(5, "bn")).toBe("৫"); // Bengali
      expect(toNativeNumerals(5, "pa")).toBe("੫"); // Punjabi (Gurmukhi)
      expect(toNativeNumerals(5, "gu")).toBe("૫"); // Gujarati
      expect(toNativeNumerals(5, "or")).toBe("୫"); // Odia
      expect(toNativeNumerals(5, "ta")).toBe("௫"); // Tamil
      expect(toNativeNumerals(5, "te")).toBe("౫"); // Telugu
      expect(toNativeNumerals(5, "kn")).toBe("೫"); // Kannada
      expect(toNativeNumerals(5, "ml")).toBe("൫"); // Malayalam
    });
  });

  describe("fromNativeNumerals", () => {
    it("should convert from Devanagari numerals", () => {
      expect(fromNativeNumerals("१२३", "hi")).toBe("123");
      expect(fromNativeNumerals("४५६", "hi")).toBe("456");
      expect(fromNativeNumerals("७८९", "hi")).toBe("789");
    });

    it("should convert from Bengali numerals", () => {
      expect(fromNativeNumerals("১২৩", "bn")).toBe("123");
      expect(fromNativeNumerals("৪৫৬", "bn")).toBe("456");
    });

    it("should convert from Tamil numerals", () => {
      expect(fromNativeNumerals("௧௨௩", "ta")).toBe("123");
    });

    it("should return unchanged for non-Indic languages", () => {
      expect(fromNativeNumerals("123", "en")).toBe("123");
    });
  });

  describe("formatIndianNumber", () => {
    it("should format numbers below 1000 without commas", () => {
      expect(formatIndianNumber(1)).toBe("1");
      expect(formatIndianNumber(10)).toBe("10");
      expect(formatIndianNumber(100)).toBe("100");
      expect(formatIndianNumber(999)).toBe("999");
    });

    it("should format thousands with one comma", () => {
      expect(formatIndianNumber(1000)).toBe("1,000");
      expect(formatIndianNumber(9999)).toBe("9,999");
    });

    it("should format lakhs correctly", () => {
      expect(formatIndianNumber(100000)).toBe("1,00,000");
      expect(formatIndianNumber(250000)).toBe("2,50,000");
      expect(formatIndianNumber(999999)).toBe("9,99,999");
    });

    it("should format crores correctly", () => {
      expect(formatIndianNumber(10000000)).toBe("1,00,00,000");
      expect(formatIndianNumber(25000000)).toBe("2,50,00,000");
      expect(formatIndianNumber(123456789)).toBe("12,34,56,789");
    });

    it("should handle negative numbers", () => {
      expect(formatIndianNumber(-1000)).toBe("-1,000");
      expect(formatIndianNumber(-100000)).toBe("-1,00,000");
    });

    it("should use native digits when requested", () => {
      expect(formatIndianNumber(1000, true, "hi")).toBe("१,०००");
      expect(formatIndianNumber(100000, true, "hi")).toBe("१,००,०००");
    });

    it("should format large numbers correctly", () => {
      expect(formatIndianNumber(1000000000)).toBe("1,00,00,00,000");
    });
  });

  describe("formatLakhs", () => {
    it("should format one lakh", () => {
      expect(formatLakhs(100000)).toBe("1.00 lakh");
    });

    it("should format multiple lakhs", () => {
      expect(formatLakhs(250000)).toBe("2.50 lakhs");
      expect(formatLakhs(1500000)).toBe("15.00 lakhs");
    });

    it("should respect decimal places", () => {
      expect(formatLakhs(100000, 0)).toBe("1 lakh");
      expect(formatLakhs(100000, 1)).toBe("1.0 lakh");
      expect(formatLakhs(123456, 3)).toBe("1.235 lakhs");
    });

    it("should use native digits when requested", () => {
      expect(formatLakhs(100000, 0, true, "hi")).toBe("१ lakh");
    });

    it("should use singular form for exactly one lakh", () => {
      expect(formatLakhs(100000)).toContain("lakh");
      expect(formatLakhs(100000)).not.toContain("lakhs");
    });

    it("should use plural form for multiple lakhs", () => {
      expect(formatLakhs(200000)).toContain("lakhs");
    });
  });

  describe("formatCrores", () => {
    it("should format one crore", () => {
      expect(formatCrores(10000000)).toBe("1.00 crore");
    });

    it("should format multiple crores", () => {
      expect(formatCrores(25000000)).toBe("2.50 crores");
      expect(formatCrores(150000000)).toBe("15.00 crores");
    });

    it("should respect decimal places", () => {
      expect(formatCrores(10000000, 0)).toBe("1 crore");
      expect(formatCrores(10000000, 1)).toBe("1.0 crore");
    });

    it("should use native digits when requested", () => {
      expect(formatCrores(10000000, 0, true, "hi")).toBe("१ crore");
    });

    it("should use singular form for exactly one crore", () => {
      expect(formatCrores(10000000)).toContain("crore");
      expect(formatCrores(10000000)).not.toContain("crores");
    });

    it("should use plural form for multiple crores", () => {
      expect(formatCrores(20000000)).toContain("crores");
    });
  });

  describe("formatIndianDate", () => {
    const testDate = new Date(2025, 9, 10); // October 10, 2025 (month is 0-indexed)

    it("should format date in DD-MM-YYYY by default", () => {
      expect(formatIndianDate(testDate)).toBe("10-10-2025");
    });

    it("should format date in YYYY-MM-DD", () => {
      expect(formatIndianDate(testDate, { format: "YYYY-MM-DD" })).toBe(
        "2025-10-10"
      );
    });

    it("should format date in MM-DD-YYYY", () => {
      expect(formatIndianDate(testDate, { format: "MM-DD-YYYY" })).toBe(
        "10-10-2025"
      );
    });

    it("should use custom separator", () => {
      expect(formatIndianDate(testDate, { separator: "/" })).toBe(
        "10/10/2025"
      );
      expect(formatIndianDate(testDate, { separator: "." })).toBe(
        "10.10.2025"
      );
    });

    it("should use native digits when requested", () => {
      expect(
        formatIndianDate(testDate, {
          useNativeDigits: true,
          languageCode: "hi",
        })
      ).toBe("१०-१०-२०२५");
    });

    it("should pad single digit day and month", () => {
      const date = new Date(2025, 0, 5); // January 5, 2025
      expect(formatIndianDate(date)).toBe("05-01-2025");
    });
  });

  describe("autoFormatIndianNumber", () => {
    it("should format small numbers without units", () => {
      expect(autoFormatIndianNumber(1000)).toBe("1,000");
      expect(autoFormatIndianNumber(50000)).toBe("50,000");
    });

    it("should format lakhs", () => {
      expect(autoFormatIndianNumber(100000)).toBe("1.00 lakh");
      expect(autoFormatIndianNumber(500000)).toBe("5.00 lakhs");
      expect(autoFormatIndianNumber(9900000)).toBe("99.00 lakhs");
    });

    it("should format crores", () => {
      expect(autoFormatIndianNumber(10000000)).toBe("1.00 crore");
      expect(autoFormatIndianNumber(50000000)).toBe("5.00 crores");
      expect(autoFormatIndianNumber(1234567890)).toBe("123.46 crores");
    });

    it("should use native digits when requested", () => {
      expect(autoFormatIndianNumber(100000, true, "hi")).toBe("१.०० lakh");
      expect(autoFormatIndianNumber(10000000, true, "hi")).toBe("१.०० crore");
    });

    it("should handle edge cases", () => {
      expect(autoFormatIndianNumber(99999)).toBe("99,999");
      expect(autoFormatIndianNumber(100000)).toBe("1.00 lakh");
      expect(autoFormatIndianNumber(9900000)).toBe("99.00 lakhs");
      expect(autoFormatIndianNumber(10000000)).toBe("1.00 crore");
    });

    it("should handle negative numbers", () => {
      // Negative values preserve singular/plural based on absolute value
      const result1 = autoFormatIndianNumber(-100000);
      expect(result1).toContain("-1.00");
      expect(result1).toContain("lakh");

      const result2 = autoFormatIndianNumber(-10000000);
      expect(result2).toContain("-1.00");
      expect(result2).toContain("crore");
    });
  });
});
