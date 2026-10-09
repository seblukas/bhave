import { Router } from "express";
import type { HabitController } from "../controllers/HabitController.js";

export class HabitRouter {
  readonly router: Router = Router();

  constructor(controller: HabitController) {
    this.router.get("/habits", controller.getAll);
    this.router.post("/habits", controller.create);
  }
}
