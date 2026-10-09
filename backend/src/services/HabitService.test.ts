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

describe("HabitService", () => {
  it("returns all habits from the repository", async () => {
    const { repository, service } = setup();
    repository.findAll.mockResolvedValue([{ id: "1" }]);
    expect(await service.getAll()).toEqual([{ id: "1" }]);
  });

  it("creates a habit with id, slug and updatedAt and saves it", async () => {
    const { repository, slugGenerator, service } = setup();
    const input = {
      title: "My Title",
      description: "desc",
      trackedDates: ["2026-10-10"],
      startDate: "2026-10-09",
    };

    const habit = await service.create(input);

    expect(slugGenerator.generate).toHaveBeenCalledWith("My Title");
    expect(habit).toMatchObject({ ...input, slug: "my-slug" });
    expect(habit.id).toEqual(expect.any(String));
    expect(Number.isNaN(Date.parse(habit.updatedAt))).toBe(false);
    expect(repository.save).toHaveBeenCalledWith(habit);
  });
});
