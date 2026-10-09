import express from "express";
import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import type { HabitController } from "../controllers/HabitController.js";
import { HabitRouter } from "./HabitRouter.js";

describe("HabitRouter", () => {
  const controller = {
    getAll: vi.fn((_req, res) => res.json(["all"])),
    create: vi.fn((_req, res) => res.status(201).json("created")),
  };
  const app = express();
  app.use(new HabitRouter(controller as unknown as HabitController).router);

  it("routes GET /habits with status 200", async () => {
    const path = "/habits";

    const res = await request(app).get(path);

    expect(res.status).toBe(200);
  });

  it("routes GET /habits to the controller's getAll", async () => {
    const path = "/habits";

    const res = await request(app).get(path);

    expect(res.body).toEqual(["all"]);
  });

  it("routes POST /habits with status 201", async () => {
    const path = "/habits";

    const res = await request(app).post(path);

    expect(res.status).toBe(201);
  });

  it("routes POST /habits to the controller's create", async () => {
    const path = "/habits";
    controller.create.mockClear();

    await request(app).post(path);

    expect(controller.create).toHaveBeenCalled();
  });
});
