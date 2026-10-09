import { Router } from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { App } from "./App.js";
import type { HabitRouter } from "./routes/HabitRouter.js";

describe("App", () => {
  const router = Router();
  router.post("/echo", (req, res) => {
    res.json(req.body);
  });
  const { app } = new App({ router } as HabitRouter);

  it("parses JSON bodies and mounts the router", async () => {
    const res = await request(app).post("/echo").send({ a: 1 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ a: 1 });
  });

  it("returns 404 for unknown routes", async () => {
    expect((await request(app).get("/nope")).status).toBe(404);
  });
});
