import type { Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import type { HabitService } from "../services/HabitService.js";
import { HabitController } from "./HabitController.js";

const fakeRes = () => {
  const res = { status: vi.fn(), json: vi.fn() };
  res.status.mockReturnValue(res);
  return res;
};

const validBody = {
  title: "Read",
  description: "Read a book",
  trackedDates: ["2026-10-10"],
  startDate: "2026-10-09",
};

describe("HabitController", () => {
  it("getAll responds 200 with habits", async () => {
    const service = { getAll: vi.fn().mockResolvedValue([{ id: "1" }]) };
    const res = fakeRes();
    await new HabitController(service as unknown as HabitService).getAll(
      {} as Request,
      res as unknown as Response,
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: "1" }]);
  });

  it("create responds 201 with the created habit", async () => {
    const service = { create: vi.fn().mockResolvedValue({ id: "1" }) };
    const res = fakeRes();
    await new HabitController(service as unknown as HabitService).create(
      { body: validBody } as Request,
      res as unknown as Response,
    );
    expect(service.create).toHaveBeenCalledWith(validBody);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: "1" });
  });

  it.each([
    ["no body", undefined],
    ["missing title", { ...validBody, title: undefined }],
    ["blank title", { ...validBody, title: "  " }],
    ["invalid startDate", { ...validBody, startDate: "nope" }],
    ["non-array trackedDates", { ...validBody, trackedDates: "x" }],
    ["non-string trackedDates item", { ...validBody, trackedDates: [1] }],
  ])("create responds 400 for %s", async (_name, body) => {
    const service = { create: vi.fn() };
    const res = fakeRes();
    await new HabitController(service as unknown as HabitService).create(
      { body } as Request,
      res as unknown as Response,
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(service.create).not.toHaveBeenCalled();
  });
});
