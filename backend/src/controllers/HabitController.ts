import type { Request, Response } from "express";
import type { CreateHabitInput } from "../models/habit.js";
import type { HabitService } from "../services/HabitService.js";

export class HabitController {
  constructor(private readonly service: HabitService) {}

  getAll = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json(await this.service.getAll());
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const input = this.parse(req.body);
    if (!input) {
      res.status(400).json({
        error:
          "title, description (strings), trackedDates (array of strings) and startDate (string) are required",
      });
      return;
    }
    res.status(201).json(await this.service.create(input));
  };

  private parse(body: unknown): CreateHabitInput | null {
    if (typeof body !== "object" || body === null) return null;
    const { title, description, trackedDates, startDate } = body as Record<
      string,
      unknown
    >;
    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof description !== "string" ||
      typeof startDate !== "string" ||
      Number.isNaN(Date.parse(startDate)) ||
      !Array.isArray(trackedDates) ||
      !trackedDates.every((d) => typeof d === "string")
    ) {
      return null;
    }
    return { title, description, trackedDates, startDate };
  }
}
