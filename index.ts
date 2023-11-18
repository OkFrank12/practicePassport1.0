import express, { Application } from "express";
import { envVar } from "./config/envVar";
import { dbConfig } from "./config/dbConfig";
import { appConfig } from "./appConfig";

const port: number = parseInt(envVar.PORT);
const app: Application = express();
appConfig(app);

const server = app.listen(envVar.PORT || port, () => {
  dbConfig();
});

process.on("uncaughtException", (error: any) => {
  console.log(`uncaughtException: ${error}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log(`unhandledRejection: ${reason}`);
  server.close(() => {
    process.exit(1);
  });
});
