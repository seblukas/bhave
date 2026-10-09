import { describe, expect, it, vi } from "vitest";
import type { HabitRepository } from "../data/HabitRepository.js";
import type { Habit } from "../models/habit.js";
import type { SlugGenerator } from "../utils/SlugGenerator.js";
import { HabitService } from "./HabitService.js";

const setup = () => {
  const repository = {
    findAll: vi.fn(),
    save: vi.fn(async (habit: Habit) => habit),
  };
  const slugGenerator = { generate: vi.fn(() => "my-slug") };
  const service = new HabitService(
    repository as unknown as HabitRepository,
    slugGenerator as unknown as SlugGenerator,
  );
  return { repository, slugGenerator, service };
};

const input = {
  title: "My Title",
  description: "desc",
  trackedDates: ["2026-10-10"],
  startDate: "2026-10-09",
};

describe("HabitService", () => {
  it("returns all habits from the repository", async () => {
    const { repository, service } = setup();
    repository.findAll.mockResolvedValue([{ id: "1" }]);

    const habits = await service.getAll();

    expect(habits).toEqual([{ id: "1" }]);
  });

  it("generates the slug from the title", async () => {
    const { slugGenerator, service } = setup();

    await service.create(input);

    expect(slugGenerator.generate).toHaveBeenCalledWith("My Title");
  });

  it("creates a habit with the input fields and generated slug", async () => {
    const { service } = setup();

    const habit = await service.create(input);

    expect(habit).toMatchObject({ ...input, slug: "my-slug" });
  });

  it("creates a habit with a string id", async () => {
    const { service } = setup();

    const habit = await service.create(input);

    expect(habit.id).toEqual(expect.any(String));
  });

  it("creates a habit with a valid updatedAt date", async () => {
    const { service } = setup();

    const habit = await service.create(input);

    expect(Number.isNaN(Date.parse(habit.updatedAt))).toBe(false);
  });

  it("saves the created habit", async () => {
    const { repository, service } = setup();

    const habit = await service.create(input);

    expect(repository.save).toHaveBeenCalledWith(habit);
  });
});
