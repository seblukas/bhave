import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { Habit } from "../models/habit.js";
import { HabitRepository } from "./HabitRepository.js";

const habit: Habit = {
  id: "1",
  title: "Read",
  description: "Read a book",
  trackedDates: ["2026-10-10"],
  startDate: "2026-10-09",
  updatedAt: "2026-10-09T10:00:00.000Z",
  slug: "read",
};

describe("HabitRepository", () => {
  let dir: string;
  let filePath: string;
  let repository: HabitRepository;

  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), "habits-"));
    filePath = join(dir, "nested", "habits.json");
    repository = new HabitRepository(filePath);
  });

  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  it("returns an empty list when the file does not exist", async () => {
    expect(await repository.findAll()).toEqual([]);
  });

  it("persists a habit to the file and returns it", async () => {
    expect(await repository.save(habit)).toEqual(habit);
    expect(JSON.parse(await readFile(filePath, "utf-8"))).toEqual([habit]);
  });

  it("appends to existing habits", async () => {
    await repository.save(habit);
    await repository.save({ ...habit, id: "2" });
    expect((await repository.findAll()).map((h) => h.id)).toEqual(["1", "2"]);
  });
});
