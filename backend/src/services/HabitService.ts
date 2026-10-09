import { randomUUID } from "node:crypto";
import type { HabitRepository } from "../data/HabitRepository.js";
import type { CreateHabitInput, Habit } from "../models/habit.js";
import type { SlugGenerator } from "../utils/SlugGenerator.js";

export class HabitService {
  constructor(
    private readonly repository: HabitRepository,
    private readonly slugGenerator: SlugGenerator,
  ) {}

  getAll(): Promise<Habit[]> {
    return this.repository.findAll();
  }

  create(input: CreateHabitInput): Promise<Habit> {
    const habit: Habit = {
      ...input,
      id: randomUUID(),
      slug: this.slugGenerator.generate(input.title),
      updatedAt: new Date().toISOString(),
    };
    return this.repository.save(habit);
  }
}
