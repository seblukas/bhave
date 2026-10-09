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
  describe("getAll", () => {
    it("responds with status 200", async () => {
      const service = { getAll: vi.fn().mockResolvedValue([{ id: "1" }]) };
      const res = fakeRes();
      const controller = new HabitController(service as unknown as HabitService);

      await controller.getAll({} as Request, res as unknown as Response);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("responds with the habits", async () => {
      const service = { getAll: vi.fn().mockResolvedValue([{ id: "1" }]) };
      const res = fakeRes();
      const controller = new HabitController(service as unknown as HabitService);

      await controller.getAll({} as Request, res as unknown as Response);

      expect(res.json).toHaveBeenCalledWith([{ id: "1" }]);
    });
  });

  describe("create", () => {
    it("passes the body to the service", async () => {
      const service = { create: vi.fn().mockResolvedValue({ id: "1" }) };
      const res = fakeRes();
      const controller = new HabitController(service as unknown as HabitService);

      await controller.create(
        { body: validBody } as Request,
        res as unknown as Response,
      );

      expect(service.create).toHaveBeenCalledWith(validBody);
    });

    it("responds with status 201", async () => {
      const service = { create: vi.fn().mockResolvedValue({ id: "1" }) };
      const res = fakeRes();
      const controller = new HabitController(service as unknown as HabitService);

      await controller.create(
        { body: validBody } as Request,
        res as unknown as Response,
      );

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("responds with the created habit", async () => {
      const service = { create: vi.fn().mockResolvedValue({ id: "1" }) };
      const res = fakeRes();
      const controller = new HabitController(service as unknown as HabitService);

      await controller.create(
        { body: validBody } as Request,
        res as unknown as Response,
      );

      expect(res.json).toHaveBeenCalledWith({ id: "1" });
    });

    const invalidBodies = [
      ["no body", undefined],
      ["missing title", { ...validBody, title: undefined }],
      ["blank title", { ...validBody, title: "  " }],
      ["invalid startDate", { ...validBody, startDate: "nope" }],
      ["non-array trackedDates", { ...validBody, trackedDates: "x" }],
      ["non-string trackedDates item", { ...validBody, trackedDates: [1] }],
    ] as const;

    it.each(invalidBodies)("responds 400 for %s", async (_name, body) => {
      const service = { create: vi.fn() };
      const res = fakeRes();
      const controller = new HabitController(service as unknown as HabitService);

      await controller.create({ body } as Request, res as unknown as Response);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it.each(invalidBodies)(
      "does not call the service for %s",
      async (_name, body) => {
        const service = { create: vi.fn() };
        const res = fakeRes();
        const controller = new HabitController(
          service as unknown as HabitService,
        );

        await controller.create({ body } as Request, res as unknown as Response);

        expect(service.create).not.toHaveBeenCalled();
      },
    );
  });
});
