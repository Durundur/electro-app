import { App } from "./App";
import "dotenv/config";

const app = new App(3333, process.env.MONGOURI as string);
