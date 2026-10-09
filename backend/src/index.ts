import { resolve } from "node:path";
import { App } from "./App.js";
import { HabitController } from "./controllers/HabitController.js";
import { HabitRepository } from "./data/HabitRepository.js";
import { HabitRouter } from "./routes/HabitRouter.js";
import { HabitService } from "./services/HabitService.js";
import { SlugGenerator } from "./utils/SlugGenerator.js";

const filePath = process.env.HABITS_FILE ?? resolve("data", "habits.json");
const port = Number(process.env.PORT ?? 3000);

const repository = new HabitRepository(filePath);
const service = new HabitService(repository, new SlugGenerator());
const controller = new HabitController(service);

new App(new HabitRouter(controller)).listen(port);
