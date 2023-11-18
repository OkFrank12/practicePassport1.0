import { config } from "dotenv";
config();

export const envVar = {
  PORT: process.env.PORT!,
  SESSION_KEY: process.env.KEY!,
  MONGODB: process.env.MONGODB!,
  ID: process.env.ID!,
  SECRET: process.env.SECRET!,
};
