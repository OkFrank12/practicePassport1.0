import { connect } from "mongoose";
import { envVar } from "./envVar";

const dbURL: string = envVar.MONGODB;

export const dbConfig = () => {
  connect(dbURL).then(() => {
    console.log(`Server is connected...!`);
  });
};
