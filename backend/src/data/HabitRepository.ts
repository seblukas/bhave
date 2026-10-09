import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { Habit } from "../models/habit.js";

export class HabitRepository {
  constructor(private readonly filePath: string) {}

  async findAll(): Promise<Habit[]> {
    try {
      const content = await readFile(this.filePath, "utf-8");
      return JSON.parse(content) as Habit[];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async save(habit: Habit): Promise<Habit> {
    const habits = await this.findAll();
    habits.push(habit);
    await mkdir(dirname(this.filePath), { recursive: true });
    await writeFile(this.filePath, JSON.stringify(habits, null, 2));
    return habit;
  }
}
