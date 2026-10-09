import { describe, expect, it } from "vitest";
import { SlugGenerator } from "./SlugGenerator.js";

describe("SlugGenerator", () => {
  const generator = new SlugGenerator();

  it("lowercases and replaces spaces with dashes", () => {
    expect(generator.generate("Drink More Water")).toBe("drink-more-water");
  });

  it("strips punctuation and collapses repeated separators", () => {
    expect(generator.generate("Run!!  5km -- daily?")).toBe("run-5km-daily");
  });

  it("removes diacritics", () => {
    expect(generator.generate("Café Müsli")).toBe("cafe-musli");
  });

  it("trims leading and trailing dashes", () => {
    expect(generator.generate("  --Hello--  ")).toBe("hello");
  });

  it("returns an empty string when nothing usable remains", () => {
    expect(generator.generate("!!!")).toBe("");
  });
});
