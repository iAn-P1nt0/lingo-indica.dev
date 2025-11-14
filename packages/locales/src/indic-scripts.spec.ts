import { describe, it, expect } from "vitest";
import {
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

describe("Indic Scripts", () => {
  describe("INDIC_SCRIPTS constant", () => {
    it("should contain Devanagari script", () => {
      expect(INDIC_SCRIPTS.Deva).toBe("Devanagari");
    });

    it("should contain Bengali script", () => {
      expect(INDIC_SCRIPTS.Beng).toBe("Bengali");
    });

    it("should contain Tamil script", () => {
      expect(INDIC_SCRIPTS.Taml).toBe("Tamil");
    });

    it("should contain all major Indic scripts", () => {
      expect(Object.keys(INDIC_SCRIPTS)).toContain("Deva");
      expect(Object.keys(INDIC_SCRIPTS)).toContain("Beng");
      expect(Object.keys(INDIC_SCRIPTS)).toContain("Guru");
      expect(Object.keys(INDIC_SCRIPTS)).toContain("Gujr");
      expect(Object.keys(INDIC_SCRIPTS)).toContain("Taml");
      expect(Object.keys(INDIC_SCRIPTS)).toContain("Telu");
      expect(Object.keys(INDIC_SCRIPTS)).toContain("Knda");
      expect(Object.keys(INDIC_SCRIPTS)).toContain("Mlym");
    });
  });

  describe("getScriptForLanguage", () => {
    it("should return Devanagari for Hindi", () => {
      expect(getScriptForLanguage("hi")).toBe("Deva");
    });

    it("should return Bengali for Bengali", () => {
      expect(getScriptForLanguage("bn")).toBe("Beng");
    });

    it("should return Tamil for Tamil", () => {
      expect(getScriptForLanguage("ta")).toBe("Taml");
    });

    it("should return Telugu for Telugu", () => {
      expect(getScriptForLanguage("te")).toBe("Telu");
    });

    it("should return Kannada for Kannada", () => {
      expect(getScriptForLanguage("kn")).toBe("Knda");
    });

    it("should return Malayalam for Malayalam", () => {
      expect(getScriptForLanguage("ml")).toBe("Mlym");
    });

    it("should return Gujarati for Gujarati", () => {
      expect(getScriptForLanguage("gu")).toBe("Gujr");
    });

    it("should return Gurmukhi for Punjabi (primary)", () => {
      expect(getScriptForLanguage("pa")).toBe("Guru");
    });

    it("should return Devanagari for Marathi", () => {
      expect(getScriptForLanguage("mr")).toBe("Deva");
    });

    it("should return null for non-Indic languages", () => {
      expect(getScriptForLanguage("en")).toBeNull();
      expect(getScriptForLanguage("fr")).toBeNull();
      expect(getScriptForLanguage("es")).toBeNull();
    });
  });

  describe("getAllScriptsForLanguage", () => {
    it("should return single script for Hindi", () => {
      expect(getAllScriptsForLanguage("hi")).toEqual(["Deva"]);
    });

    it("should return multiple scripts for Punjabi", () => {
      const scripts = getAllScriptsForLanguage("pa");
      expect(scripts).toContain("Guru");
      expect(scripts).toContain("Arab");
      expect(scripts.length).toBe(2);
    });

    it("should return multiple scripts for Kashmiri", () => {
      const scripts = getAllScriptsForLanguage("ks");
      expect(scripts).toContain("Arab");
      expect(scripts).toContain("Deva");
      expect(scripts.length).toBe(2);
    });

    it("should return multiple scripts for Sindhi", () => {
      const scripts = getAllScriptsForLanguage("sd");
      expect(scripts).toContain("Arab");
      expect(scripts).toContain("Deva");
    });

    it("should return empty array for non-Indic languages", () => {
      expect(getAllScriptsForLanguage("en")).toEqual([]);
      expect(getAllScriptsForLanguage("fr")).toEqual([]);
    });
  });

  describe("isIndicLanguage", () => {
    it("should return true for Hindi", () => {
      expect(isIndicLanguage("hi")).toBe(true);
    });

    it("should return true for Bengali", () => {
      expect(isIndicLanguage("bn")).toBe(true);
    });

    it("should return true for Tamil", () => {
      expect(isIndicLanguage("ta")).toBe(true);
    });

    it("should return true for all major Indic languages", () => {
      expect(isIndicLanguage("hi")).toBe(true); // Hindi
      expect(isIndicLanguage("bn")).toBe(true); // Bengali
      expect(isIndicLanguage("ta")).toBe(true); // Tamil
      expect(isIndicLanguage("te")).toBe(true); // Telugu
      expect(isIndicLanguage("kn")).toBe(true); // Kannada
      expect(isIndicLanguage("ml")).toBe(true); // Malayalam
      expect(isIndicLanguage("mr")).toBe(true); // Marathi
      expect(isIndicLanguage("gu")).toBe(true); // Gujarati
      expect(isIndicLanguage("pa")).toBe(true); // Punjabi
      expect(isIndicLanguage("or")).toBe(true); // Odia
      expect(isIndicLanguage("as")).toBe(true); // Assamese
    });

    it("should return false for non-Indic languages", () => {
      expect(isIndicLanguage("en")).toBe(false);
      expect(isIndicLanguage("fr")).toBe(false);
      expect(isIndicLanguage("es")).toBe(false);
      expect(isIndicLanguage("de")).toBe(false);
      expect(isIndicLanguage("zh")).toBe(false);
    });
  });

  describe("getScriptDirection", () => {
    it("should return ltr for Devanagari", () => {
      expect(getScriptDirection("Deva")).toBe("ltr");
    });

    it("should return ltr for Bengali", () => {
      expect(getScriptDirection("Beng")).toBe("ltr");
    });

    it("should return ltr for Tamil", () => {
      expect(getScriptDirection("Taml")).toBe("ltr");
    });

    it("should return rtl for Arabic", () => {
      expect(getScriptDirection("Arab")).toBe("rtl");
    });

    it("should return ltr for all major Indic scripts except Arabic", () => {
      expect(getScriptDirection("Deva")).toBe("ltr");
      expect(getScriptDirection("Beng")).toBe("ltr");
      expect(getScriptDirection("Guru")).toBe("ltr");
      expect(getScriptDirection("Gujr")).toBe("ltr");
      expect(getScriptDirection("Orya")).toBe("ltr");
      expect(getScriptDirection("Taml")).toBe("ltr");
      expect(getScriptDirection("Telu")).toBe("ltr");
      expect(getScriptDirection("Knda")).toBe("ltr");
      expect(getScriptDirection("Mlym")).toBe("ltr");
    });
  });

  describe("hasNativeNumerals", () => {
    it("should return true for Devanagari", () => {
      expect(hasNativeNumerals("Deva")).toBe(true);
    });

    it("should return true for Bengali", () => {
      expect(hasNativeNumerals("Beng")).toBe(true);
    });

    it("should return true for Tamil", () => {
      expect(hasNativeNumerals("Taml")).toBe(true);
    });

    it("should return false for Latin", () => {
      expect(hasNativeNumerals("Latn")).toBe(false);
    });

    it("should return true for all Indic scripts", () => {
      expect(hasNativeNumerals("Deva")).toBe(true);
      expect(hasNativeNumerals("Beng")).toBe(true);
      expect(hasNativeNumerals("Guru")).toBe(true);
      expect(hasNativeNumerals("Gujr")).toBe(true);
      expect(hasNativeNumerals("Taml")).toBe(true);
      expect(hasNativeNumerals("Telu")).toBe(true);
      expect(hasNativeNumerals("Knda")).toBe(true);
      expect(hasNativeNumerals("Mlym")).toBe(true);
    });
  });

  describe("getIndicScriptName", () => {
    it("should return Devanagari for Deva", () => {
      expect(getIndicScriptName("Deva")).toBe("Devanagari");
    });

    it("should return Bengali for Beng", () => {
      expect(getIndicScriptName("Beng")).toBe("Bengali");
    });

    it("should return Tamil for Taml", () => {
      expect(getIndicScriptName("Taml")).toBe("Tamil");
    });

    it("should return correct names for all scripts", () => {
      expect(getIndicScriptName("Deva")).toBe("Devanagari");
      expect(getIndicScriptName("Beng")).toBe("Bengali");
      expect(getIndicScriptName("Guru")).toBe("Gurmukhi");
      expect(getIndicScriptName("Gujr")).toBe("Gujarati");
      expect(getIndicScriptName("Orya")).toBe("Odia");
      expect(getIndicScriptName("Taml")).toBe("Tamil");
      expect(getIndicScriptName("Telu")).toBe("Telugu");
      expect(getIndicScriptName("Knda")).toBe("Kannada");
      expect(getIndicScriptName("Mlym")).toBe("Malayalam");
      expect(getIndicScriptName("Arab")).toBe("Arabic");
    });
  });

  describe("LANGUAGE_TO_SCRIPT_MAP", () => {
    it("should map all 22+ scheduled Indian languages", () => {
      expect(LANGUAGE_TO_SCRIPT_MAP.hi).toBeDefined(); // Hindi
      expect(LANGUAGE_TO_SCRIPT_MAP.bn).toBeDefined(); // Bengali
      expect(LANGUAGE_TO_SCRIPT_MAP.ta).toBeDefined(); // Tamil
      expect(LANGUAGE_TO_SCRIPT_MAP.te).toBeDefined(); // Telugu
      expect(LANGUAGE_TO_SCRIPT_MAP.kn).toBeDefined(); // Kannada
      expect(LANGUAGE_TO_SCRIPT_MAP.ml).toBeDefined(); // Malayalam
      expect(LANGUAGE_TO_SCRIPT_MAP.mr).toBeDefined(); // Marathi
      expect(LANGUAGE_TO_SCRIPT_MAP.gu).toBeDefined(); // Gujarati
      expect(LANGUAGE_TO_SCRIPT_MAP.pa).toBeDefined(); // Punjabi
      expect(LANGUAGE_TO_SCRIPT_MAP.or).toBeDefined(); // Odia
      expect(LANGUAGE_TO_SCRIPT_MAP.as).toBeDefined(); // Assamese
      expect(LANGUAGE_TO_SCRIPT_MAP.kok).toBeDefined(); // Konkani
      expect(LANGUAGE_TO_SCRIPT_MAP.sa).toBeDefined(); // Sanskrit
      expect(LANGUAGE_TO_SCRIPT_MAP.ne).toBeDefined(); // Nepali
      expect(LANGUAGE_TO_SCRIPT_MAP.ur).toBeDefined(); // Urdu
    });
  });

  describe("INDIC_SCRIPT_INFO", () => {
    it("should have information for all scripts", () => {
      Object.keys(INDIC_SCRIPTS).forEach((scriptCode) => {
        const info =
          INDIC_SCRIPT_INFO[scriptCode as keyof typeof INDIC_SCRIPTS];
        expect(info).toBeDefined();
        expect(info.code).toBe(scriptCode);
        expect(info.name).toBeDefined();
        expect(info.direction).toMatch(/^(ltr|rtl)$/);
        expect(typeof info.hasNativeNumerals).toBe("boolean");
        expect(Array.isArray(info.languages)).toBe(true);
      });
    });
  });
});
