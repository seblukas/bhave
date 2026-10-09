import express, { type Express } from "express";
import type { HabitRouter } from "./routes/HabitRouter.js";

export class App {
  readonly app: Express = express();

  constructor(habitRouter: HabitRouter) {
    this.app.use(express.json());
    this.app.use(habitRouter.router);
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  }
}
