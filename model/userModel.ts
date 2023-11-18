import { Schema, model } from "mongoose";
import { iUserData } from "../utils/interfaces";

const userModel = new Schema<iUserData>(
  {
    userName: String,
    email: String,
    googleID: String,
    image: String,
    verified: Boolean,
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
