import { describe, expect, it } from "vitest";
import { SlugGenerator } from "./SlugGenerator.js";

describe("SlugGenerator", () => {
  const generator = new SlugGenerator();

  it("lowercases and replaces spaces with dashes", () => {
    const input = "Drink More Water";

    const slug = generator.generate(input);

    expect(slug).toBe("drink-more-water");
  });

  it("strips punctuation and collapses repeated separators", () => {
    const input = "Run!!  5km -- daily?";

    const slug = generator.generate(input);

    expect(slug).toBe("run-5km-daily");
  });

  it("removes diacritics", () => {
    const input = "Café Müsli";

    const slug = generator.generate(input);

    expect(slug).toBe("cafe-musli");
  });

  it("trims leading and trailing dashes", () => {
    const input = "  --Hello--  ";

    const slug = generator.generate(input);

    expect(slug).toBe("hello");
  });

  it("returns an empty string when nothing usable remains", () => {
    const input = "!!!";

    const slug = generator.generate(input);

    expect(slug).toBe("");
  });
});
