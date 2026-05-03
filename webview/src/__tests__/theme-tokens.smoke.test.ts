import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const CSS_PATH = join(__dirname, "../styles/index.css");
const TAILWIND_CONFIG_PATH = join(__dirname, "../../tailwind.config.js");
const COMPONENTS_DIR = join(__dirname, "../components");

const cssContent = readFileSync(CSS_PATH, "utf-8");
const tailwindContent = readFileSync(TAILWIND_CONFIG_PATH, "utf-8");

function getComponentFiles(): string[] {
  return readdirSync(COMPONENTS_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => join(COMPONENTS_DIR, f));
}

describe("Theme token consistency — smoke tests", () => {
  const expectedCssVariables = [
    "--vybe-poly-green",
    "--vybe-mustang-gold",
    "--vybe-stadium-gold",
    "--vybe-poly-canyon",
    "--vybe-farmers-green",
    "--vybe-dexter-green",
    "--vybe-bg",
    "--vybe-panel",
    "--vybe-panel-2",
    "--vybe-card",
    "--vybe-card-raised",
    "--vybe-border",
    "--vybe-border-muted",
    "--vybe-text",
    "--vybe-muted",
    "--vybe-success",
    "--vybe-success-deep",
    "--vybe-warning",
    "--vybe-error",
    "--vybe-error-bg",
  ];

  it("CSS file defines all --vybe-* variables from the Cal Poly palette", () => {
    for (const variable of expectedCssVariables) {
      expect(cssContent).toContain(variable);
    }
  });

  it("Tailwind config exposes matching token names for all CSS variables", () => {
    // Each --vybe-X variable should have a corresponding token in tailwind config
    const expectedTokens = [
      "poly-green",
      "mustang-gold",
      "stadium-gold",
      "poly-canyon",
      "farmers-green",
      "dexter-green",
      "bg",
      "panel",
      "panel-2",
      "card",
      "card-raised",
      "border",
      "border-muted",
      "text",
      "muted",
      "success",
      "success-deep",
      "warning",
      "error",
      "error-bg",
    ];

    for (const token of expectedTokens) {
      // Token should appear as a key in the tailwind config (quoted or unquoted)
      const patterns = [`"${token}"`, `'${token}'`, `${token}:`];
      const found = patterns.some((p) => tailwindContent.includes(p));
      expect(found, `Expected Tailwind token "${token}" to be defined`).toBe(true);
    }
  });

  it("no component files contain hardcoded #d6ad45 (old amber)", () => {
    const componentFiles = getComponentFiles();
    for (const filePath of componentFiles) {
      const content = readFileSync(filePath, "utf-8");
      expect(
        content.includes("#d6ad45"),
        `Found hardcoded #d6ad45 in ${filePath}`
      ).toBe(false);
    }
  });

  it("no component files contain raw red-400 or red-500 Tailwind classes", () => {
    const componentFiles = getComponentFiles();
    for (const filePath of componentFiles) {
      const content = readFileSync(filePath, "utf-8");
      // Check for red-400 or red-500 as Tailwind class usage (e.g., text-red-400, border-red-500)
      expect(
        /\bred-400\b/.test(content),
        `Found raw red-400 class in ${filePath}`
      ).toBe(false);
      expect(
        /\bred-500\b/.test(content),
        `Found raw red-500 class in ${filePath}`
      ).toBe(false);
    }
  });
});
