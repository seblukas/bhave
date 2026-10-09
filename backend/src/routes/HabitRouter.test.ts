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

  it("routes GET /habits to the controller", async () => {
    const res = await request(app).get("/habits");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(["all"]);
  });

  it("routes POST /habits to the controller", async () => {
    const res = await request(app).post("/habits");
    expect(res.status).toBe(201);
    expect(controller.create).toHaveBeenCalled();
  });
});
