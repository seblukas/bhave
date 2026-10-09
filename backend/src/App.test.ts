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

  it("parses JSON bodies and mounts the router with status 200", async () => {
    const body = { a: 1 };

    const res = await request(app).post("/echo").send(body);

    expect(res.status).toBe(200);
  });

  it("echoes the parsed JSON body", async () => {
    const body = { a: 1 };

    const res = await request(app).post("/echo").send(body);

    expect(res.body).toEqual(body);
  });

  it("returns 404 for unknown routes", async () => {
    const path = "/nope";

    const res = await request(app).get(path);

    expect(res.status).toBe(404);
  });
});
